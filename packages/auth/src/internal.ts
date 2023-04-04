import { getApp, Logger, NotInitializedError } from "@navigraph/app";
import { getIdentityRevocationEndpoint } from "./constants";
import { navigraphRequest } from "./network";
import { CustomStorage, Listener, StorageKeys, User } from "./public-types";
import { parseUser, tokenCall } from "./flows/shared";
import isExpiredToken from "./lib/isExpiredToken";
import { runWithLock } from "./lib/storageLock";

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

export const tokenStorage = {
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

/** Grabs information about the currently authenticated user from memory
 * @param verify Whether to verify the validity of the associated access token. If true, the function will return a promise instead.
 * @returns {User|null} The currently authenticated user
 * @throws {NotInitializedError} If the SDK has not been initialized
 */
export function getUser(): User | null;
export function getUser(verify?: false): User | null;
export function getUser(verify?: true): Promise<User | null>;
export function getUser(verify?: boolean): User | null | Promise<User | null> {
  return verify ? verifyUser() : USER;
}

/** Verifies the validity of the currently stored access token. If the token is invalid or expired, a refresh attempt will be made.
 * @returns {Promise<User|null>} The currently authenticated user
 * @throws {NotInitializedError} If the SDK has not been initialized
 */
export const verifyUser = async () => {
  const app = getApp();
  if (!app) throw new NotInitializedError("Auth");

  const ACCESS_TOKEN = await tokenStorage.getAccessToken();

  if (ACCESS_TOKEN && !isExpiredToken(ACCESS_TOKEN)) {
    const user = parseUser(ACCESS_TOKEN);
    setUser(user);
    return user;
  }

  return new Promise<User | null>((resolve, reject) => {
    runWithLock("NAVIGRAPH_SDK_INIT", async () => {
      const REFRESH_TOKEN = await tokenStorage.getRefreshToken();

      if (REFRESH_TOKEN) {
        await tokenCall({
          client_id: app.clientId,
          client_secret: app.clientSecret,
          grant_type: "refresh_token",
          refresh_token: REFRESH_TOKEN,
        }).catch(reject);
      }

      resolve(USER);
    }).catch(reject);
  });
};

export const setInitialized = (initialized: boolean) => (INITIALIZED = initialized);

export const signOut = async () => {
  const app = getApp();
  const refreshToken = await tokenStorage.getRefreshToken();

  if (app && refreshToken) {
    navigraphRequest
      .post(
        getIdentityRevocationEndpoint(),
        new URLSearchParams({
          client_id: app.clientId,
          client_secret: app.clientSecret,
          token__type_hint: "refresh_token",
          token: refreshToken,
        })
      )
      .catch(() => Logger.warning("Failed to revoke token on signout"));
  }

  await tokenStorage.setAccessToken();
  await tokenStorage.setRefreshToken();
  setUser(null);
};
