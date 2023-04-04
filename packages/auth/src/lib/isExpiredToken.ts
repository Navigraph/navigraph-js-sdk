import { parseJwt } from "../flows/shared";

/**
 * Check if access token is expired, or will expire within the given threshold.
 * @param accessToken Access token
 */
export default function isExpiredToken(accessToken: string) {
  const token = parseJwt(accessToken);
  if (!token) return true;
  return token.exp * 1000 < Date.now();
}
