import { getApp, Logger, NotInitializedError } from "@navigraph/app";
import {
  tokenStorage,
  setInitialized,
  LISTENERS,
  USER,
  INITIALIZED,
  signOut,
  verifyUser,
  getUser,
} from "./internal";
import type { CustomStorage, Listener, NavigraphAuth, StorageKeys, Unsubscribe } from "./public-types";
import { signInWithDeviceFlow } from "./flows/device-flow";

interface AuthParameters {
  /**
   * Storage keys to be used when persisting credentials.
   * @example
   * authParams.keys = {
   *   accessToken: "ACCESS_TOKEN"
   * }
   *
   * @default
   * { accessToken: "access_token", refreshToken: "refresh_token" }
   */
  keys?: Partial<StorageKeys>;
  /**
   * Custom storage implementation to be used when persisting credentials.
   *
   * **Note:** The provided storage will be used to provide locking functionality for the authentication process.
   * This means that whatever storage implementation you provide must be *shared* between all instances of the SDK.
   * In MSFS, this this means using the `DataStore` API instead of `localStorage`.
   *
   * @example
   * authParams.storage = {
   *   getItem: (key: string) => getSomeItem(key),
   *   setItem: (key: string, val: string) => setSomeItem(key, val),
   * }
   */
  storage?: CustomStorage;
}

/**
 * Returns authentication utilities associated with the currently set up {@link NavigraphApp}.
 * @see {@link NavigraphApp}
 */
export const getAuth = ({ keys, storage }: AuthParameters = {}): NavigraphAuth => {
  if (typeof localStorage === "undefined" && !storage) {
    Logger.warning(
      "No storage API available in your environment. Please provide a custom tokenStorage implementation."
    );
  }

  if (storage) {
    tokenStorage.setStorage(storage);
  } else if (typeof localStorage !== "undefined") {
    tokenStorage.setStorage(localStorage);
  }

  if (keys) tokenStorage.setKeys(keys);

  const app = getApp();
  if (!app) throw new NotInitializedError("Auth");

  const initPromise = loadPersistedCredentials();

  return {
    onAuthStateChanged: (callback: Listener): Unsubscribe => {
      const promise = INITIALIZED ? Promise.resolve() : initPromise;

      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      promise.then(() => {
        callback(USER);
        LISTENERS.push(callback);
      });

      return () => LISTENERS.splice(LISTENERS.indexOf(callback), 1)[0];
    },
    signOut,
    getUser,
    signInWithDeviceFlow,
    isInitialized: () => INITIALIZED,
  };
};

const loadPersistedCredentials = async () => {
  if (INITIALIZED) return Promise.resolve();
  await verifyUser().catch((e) => {
    Logger.warning("Failed to load persisted credentials", e);
    signOut().catch((e) => Logger.warning("Failed to sign out after failed initialization attempt", e));
  });
  setInitialized(true);
};
