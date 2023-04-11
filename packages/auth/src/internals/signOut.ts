import revokeToken from "../api/revokeToken";
import { tokenStorage } from "../internals/storage";
import { setUser } from "../internals/user";

/**
 * Signs out the current user by invalidating the token, removing all tokens from storage and setting user to `null`.
 * @throws {NotInitializedError} If the SDK has not been initialized
 */
export default async function signOut() {
  const REFRESH_TOKEN = await tokenStorage.getRefreshToken();

  // Revoke token if it exists
  if (REFRESH_TOKEN) await revokeToken(REFRESH_TOKEN);

  // Clear storage from tokens
  await tokenStorage.setAccessToken();
  await tokenStorage.setRefreshToken();

  // Clear user variable & notify listeners
  setUser(null);
}
