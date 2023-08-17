import { Logger } from "@navigraph/app"
import { TokenResponse } from "../api/types"
import { User } from "../internals/user"
import decodeAccessToken from "./decodeAccessToken"

/** Takes an access token and returns the part of the payload that makes up the user. */
export default function decodeUser(token?: TokenResponse["access_token"]): User | null {
  if (!token) {
    Logger.warning("Tried to parse user without access token.")
    return null
  }

  const userFields: (keyof User)[] = ["preferred_username", "scope", "sub", "subscriptions"]
  const decodedToken = decodeAccessToken(token)

  if (!decodedToken) return null

  return userFields.reduce((acc, field) => ({ ...acc, [field]: decodedToken[field] }), {} as User)
}
