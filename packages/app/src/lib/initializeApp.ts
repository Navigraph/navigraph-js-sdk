import { setApp } from "../internals/apps"
import { Scope } from "../types"

/** The configuration needed to define your Navigraph application */
export interface NavigraphApp {
  /** The id for your client which you will obtain from Navigraph. */
  clientId: string
  /** The secret password for your client which you will obtain from Navigraph. */
  clientSecret: string
  domain?: string
  /** Scopes enable your application to access specific API endpoints on behalf of a user.
   * The set of scopes you pass in your call determines the access permissions that the user is required to grant.
   * @see {@link Scope} */
  scopes: Scope[]
}

/**
 * Initialize a Navigraph application. This configures the Navigraph SDK
 * with the necessary details to authenticate and communicate with Navigraph APIs.
 * @param {NavigraphApp} app - The configuration needed to define your Navigraph application
 * */

export default function initializeApp(app: NavigraphApp) {
  const DEFAULT_SCOPES = ["userinfo", "openid", "offline_access"] as unknown as Scope[]

  app.scopes = Array.from(new Set([...DEFAULT_SCOPES, ...app.scopes]))

  setApp(app)
}
