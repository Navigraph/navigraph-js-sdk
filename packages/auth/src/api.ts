import { getApp, Logger, NavigraphApp, NotInitializedError } from "@navigraph/app";
import { LISTENERS, tokenStorage, USER } from "./internal";
import type { CustomStorage, Listener, StorageKeys, Unsubscribe } from "./public-types";
import { signInWithDeviceFlow } from "./flows/device-flow";
import { parseUser, tokenCall } from "./flows/shared";

interface AuthParameters {
  keys?: Partial<StorageKeys>;
  storage?: CustomStorage;
}

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
    onAuthStateChanged: (callback: Listener): Unsubscribe => {
      LISTENERS.push(callback);
      callback(USER);
      return () => LISTENERS.splice(LISTENERS.indexOf(callback), 1)[0];
    },
    signOut: () => tokenStorage.setAccessToken(),
    getUser: () => USER,
    signInWithDeviceFlow,
  };
};

const loadPersistedCredentials = async (app: NavigraphApp) => {
  const REFRESH_TOKEN = tokenStorage.getRefreshToken();

  if (REFRESH_TOKEN) {
    const tokens = await tokenCall({
      client_id: app.clientId,
      client_secret: app.clientSecret,
      grant_type: "refresh_token",
      refresh_token: REFRESH_TOKEN,
    });

    if (tokens.refresh_token) {
      tokenStorage.setAccessToken(tokens.access_token);
      tokenStorage.setRefreshToken(tokens.refresh_token);
      parseUser(tokens.access_token);
    }
  }
};
