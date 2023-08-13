import { getApp, Logger, NotInitializedError } from "@navigraph/app";
import { signInWithDeviceFlow } from "../flows/device-flow";
import { CustomStorage, StorageKeys, tokenStorage } from "../internals/storage";
import loadPersistedCredentials, { INITIALIZED } from "../internals/loadPersistedCredentials";
import { getUser, Unsubscribe, USER, USER_LISTENERS, UserCallback } from "../internals/user";
import signOut from "../internals/signOut";

export interface AuthParameters {
  /**
   * Storage keys to be used when persisting credentials.
   * @example
   * { accessToken: "NAVIGRAPH_ACCESS_TOKEN" }
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
   * {
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
export default function getAuth({ keys, storage }: AuthParameters = {}) {
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

  if (keys) tokenStorage.setStorageKeys(keys);

  const app = getApp();
  if (!app) throw new NotInitializedError("Auth");

  const initPromise = loadPersistedCredentials();

  return {
    /** Adds a callback that is called whenever the signe-in user changes. */
    onAuthStateChanged: (callback: UserCallback, initialNotify = true): Unsubscribe => {
      const promise = INITIALIZED ? Promise.resolve() : initPromise;

      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      promise.then(() => {
        initialNotify && callback(USER);
        USER_LISTENERS.add(callback);
      });

      return () => USER_LISTENERS.remove(callback);
    },
    signOut,
    getUser,
    signInWithDeviceFlow,
    isInitialized: () => INITIALIZED,
  };
}

export type NavigraphAuth = ReturnType<typeof getAuth>;
