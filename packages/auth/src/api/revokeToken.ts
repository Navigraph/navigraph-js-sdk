import { Logger, NotInitializedError, getApp } from "@navigraph/app";
import { getIdentityRevocationEndpoint } from "../constants";
import { navigraphRequest } from "../lib/navigraphRequest";

/** Revokes a valid refresh token to prevent re-use. */
export default async function revokeToken(refreshToken: string) {
  const app = getApp();

  if (!app) throw new NotInitializedError("Token Revocation");

  return navigraphRequest
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
