import decodeAccessToken from "./decodeAccessToken";

const EXPIRY_THRESHOLD = 3 * 60 * 1000;

/**
 * Check if access token is expired, or will expire within the given threshold.
 * @param accessToken Access token
 * @param threshold Validity threshold (ms), the time *before* expire within which the token is considered invalid even if it is not yet expired
 */
export default function isExpiredToken(accessToken?: string, threshold = EXPIRY_THRESHOLD) {
  if (!accessToken) return true;
  const decodedToken = decodeAccessToken(accessToken);
  if (!decodedToken) return true;
  return decodedToken.exp * 1000 < Date.now() - threshold;
}
