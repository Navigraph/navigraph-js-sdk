import { Logger, NotInitializedError, getApp } from "@navigraph/app";
import { tokenStorage } from "./storage";
import { isExpiredToken, decodeUser, runWithLock } from "../util";
import { setUser, USER, User } from "./user";
import { requestToken } from "../api/requestToken";

let verifyUserPromise: Promise<User | null> | null = null;

/**
 * Verifies the validity of the currently stored access token. If the token is invalid or expired, a refresh attempt will be made.
 * @returns {Promise<User|null>} The currently authenticated user
 * @throws {NotInitializedError} If the SDK has not been initialized
 */
export default async function verifyUser() {
  const app = getApp();
  if (!app) throw new NotInitializedError("Auth");

  const ACCESS_TOKEN = await tokenStorage.getAccessToken();

  if (ACCESS_TOKEN && !isExpiredToken(ACCESS_TOKEN)) {
    const user = decodeUser(ACCESS_TOKEN);
    setUser(user);
    return user;
  }

  if (verifyUserPromise) {
    Logger.debug("Found ongoing verification request, returning promise early");
    return verifyUserPromise;
  }

  verifyUserPromise = new Promise<User | null>((resolve, reject) => {
    runWithLock("NAVIGRAPH_SDK_INIT", async () => {
      const REFRESH_TOKEN = await tokenStorage.getRefreshToken();

      if (REFRESH_TOKEN) {
        await requestToken({
          client_id: app.clientId,
          client_secret: app.clientSecret,
          grant_type: "refresh_token",
          refresh_token: REFRESH_TOKEN,
        }).catch(reject);
      }

      resolve(USER);
    })
      .catch(reject)
      .finally(() => (verifyUserPromise = null));
  });

  return verifyUserPromise;
}
