type MaybePromise<T> = T | Promise<T> | PromiseLike<T>

/** Custom storage implementation to be used when persisting credentials. */
export interface CustomStorage {
  getItem(key: string): MaybePromise<string | null>
  setItem(key: string, value: string): MaybePromise<void>
}

/**  Storage keys to be used when persisting credentials. */
export interface StorageKeys {
  accessToken: string
  refreshToken: string
}

/** The internal storage keys reference. This reference *can* be updated when the module
 * is initialized, if a custom set of keys is provided. */
export let keys: StorageKeys = {
  accessToken: "access_token",
  refreshToken: "refresh_token",
}

/** The internal storage interface. This reference is updated with an actual {@link CustomStorage}
 *  implementation (externally provided or localStorage) when the module is initialized. */
export let STORAGE: CustomStorage = {
  getItem: () => null,
  setItem: () => undefined,
}

/** A wrapper around the internal {@link STORAGE} interface, with utilities to handle authentication tokens. */
export const tokenStorage = {
  getAccessToken: () => STORAGE.getItem(keys.accessToken),
  getRefreshToken: () => STORAGE.getItem(keys.refreshToken),
  setAccessToken: (accessToken?: string) => STORAGE.setItem(keys.accessToken, accessToken ?? ""),
  setRefreshToken: (refreshToken?: string) => STORAGE.setItem(keys.refreshToken, refreshToken ?? ""),
  setStorage: (newStorage: CustomStorage) => (STORAGE = newStorage),
  setStorageKeys: (newKeys: Partial<StorageKeys>) =>
    (keys = {
      ...keys,
      ...newKeys,
    }),
}
