import { getApp, Logger, NotInitializedError } from "@navigraph/app"
import { requestToken } from "../api/requestToken"
import { runWithLock } from "../util"
import { tokenStorage } from "./storage"
import { USER, User } from "./user"

let verifyUserPromise: Promise<User | null> | null = null

/**
 * Verifies the validity of the currently signed in user by attempting to refresh the access token.
 * @returns {Promise<User|null>} The currently authenticated user
 * @throws {NotInitializedError} If the SDK has not been initialized
 */
export default async function verifyUser() {
  const app = getApp()
  if (!app) throw new NotInitializedError("Auth")

  if (verifyUserPromise) {
    Logger.debug("Found ongoing verification request, returning promise early")
    return verifyUserPromise
  }

  verifyUserPromise = new Promise<User | null>((resolve, reject) => {
    runWithLock("NAVIGRAPH_SDK_INIT", async () => {
      const REFRESH_TOKEN = await tokenStorage.getRefreshToken()

      if (REFRESH_TOKEN) {
        await requestToken({
          client_id: app.clientId,
          client_secret: app.clientSecret,
          grant_type: "refresh_token",
          refresh_token: REFRESH_TOKEN,
        }).catch(reject)
      }

      resolve(USER)
    })
      .catch(reject)
      .finally(() => (verifyUserPromise = null))
  })

  return verifyUserPromise
}
