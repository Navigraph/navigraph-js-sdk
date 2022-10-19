import { getApp, Logger } from "@navigraph/app";
import { IDENTITY_REVOCATION_ENDPOINT } from "./constants";
import { authenticatedAxios } from "./network";
import { CustomStorage, Listener, StorageKeys, User } from "./public-types";

export let USER: User | null = null;
export let INITIALIZED = false;

export const LISTENERS: Listener[] = [];

export let storage: CustomStorage = {
  getItem: () => null,
  setItem: () => undefined,
};

export let keys: StorageKeys = {
  accessToken: "access_token",
  refreshToken: "refresh_token",
};

export let tokenStorage = {
  getAccessToken: () => storage.getItem(keys.accessToken),
  getRefreshToken: () => storage.getItem(keys.refreshToken),
  setAccessToken: (accessToken?: string) => storage.setItem(keys.accessToken, accessToken ?? ""),
  setRefreshToken: (refreshToken?: string) => storage.setItem(keys.refreshToken, refreshToken ?? ""),
  setStorage: (newStorage: CustomStorage) => (storage = newStorage),
  setKeys: (newKeys: Partial<StorageKeys>) =>
    (keys = {
      ...keys,
      ...newKeys,
    }),
};

export const setUser = (user: User | null) => {
  USER = user;
  LISTENERS.forEach((listener) => listener(user));
};

export const setInitialized = (initialized: boolean) => (INITIALIZED = initialized);

export const signOut = () => {
  const app = getApp();
  const refreshToken = tokenStorage.getRefreshToken();

  if (app && refreshToken) {
    authenticatedAxios
      .post(
        IDENTITY_REVOCATION_ENDPOINT,
        new URLSearchParams({
          client_id: app.clientId,
          client_secret: app.clientSecret,
          token__type_hint: "refresh_token",
          token: refreshToken,
        })
      )
      .catch(() => Logger.warning("Failed to revoke token on signout"));
  }

  tokenStorage.setAccessToken();
  tokenStorage.setRefreshToken();
  setUser(null);
};
