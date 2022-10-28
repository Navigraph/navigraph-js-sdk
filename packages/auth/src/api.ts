import { getApp, Logger, NavigraphApp, NotInitializedError } from "@navigraph/app";
import { tokenStorage, setInitialized, LISTENERS, USER, INITIALIZED, signOut } from "./internal";
import type { CustomStorage, Listener, StorageKeys, Unsubscribe } from "./public-types";
import { signInWithDeviceFlow } from "./flows/device-flow";
import { tokenCall } from "./flows/shared";

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
export const getAuth = ({ keys, storage }: AuthParameters = {}) => {
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

  if (keys) {
    tokenStorage.setKeys(keys);
  }

  const app = getApp();

  if (!app) {
    throw new NotInitializedError("Auth");
  }

  loadPersistedCredentials(app);

  return {
    /** Subscribes to changes to the authenticated user.
     * @example const unsubscribe = auth.onAuthStateChanged((u) => setUser(u));
     */
    onAuthStateChanged: (callback: Listener): Unsubscribe => {
      LISTENERS.push(callback);
      INITIALIZED && callback(USER);
      return () => LISTENERS.splice(LISTENERS.indexOf(callback), 1)[0];
    },
    /** Signs out the currently authenticated user. */
    signOut,
    /** Grabs information about the currently authenticated user.
     * @returns {User|null} The currently authenticated user
     */
    getUser: () => USER,
    signInWithDeviceFlow,
  };
};

const loadPersistedCredentials = (app: NavigraphApp) => {
  const REFRESH_TOKEN = tokenStorage.getRefreshToken();

  if (REFRESH_TOKEN) {
    tokenCall({
      client_id: app.clientId,
      client_secret: app.clientSecret,
      grant_type: "refresh_token",
      refresh_token: REFRESH_TOKEN,
    }).catch(() => Logger.warning("Failed to load persisted credentials"));
  }

  setInitialized(true);
};
