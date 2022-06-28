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
