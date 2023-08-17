import { TokenResponse } from "../api/types"

/** The result of decoding a Navigraph {@link TokenResponse.access_token access token} payload/body. */
export interface DecodedTokenPayload {
  iss: string
  aud: string
  exp: number
  nbf: number
  client_id: string
  scope: string[]
  sub: string
  auth_time: number
  idp: string
  preferred_username: string
  amr: string[]
  subscriptions: string[]
}

function isDecodedToken(payload: unknown): payload is DecodedTokenPayload {
  return typeof payload === "object" && payload !== null && "sub" in payload
}

/** Takes an {@link TokenResponse.access_token access token} and returns the decoded payload part of the token. */
export default function decodeAccessToken(token: TokenResponse["access_token"]): DecodedTokenPayload | null {
  try {
    const decoded = JSON.parse(atob(token.split(".")[1])) as unknown
    return isDecodedToken(decoded) ? decoded : null
  } catch (e) {
    return null
  }
}
