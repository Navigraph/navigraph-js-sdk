export enum Scope {
  "CHARTS" = "charts",
  "FMSDATA" = "fmsdata",
  "EMAIL" = "email",
  /** @deprecated Included by default, no need to include it explicitly */
  "OFFLINE" = "offline_access",
}

/** The configuration needed to define your Navigraph application */
export interface NavigraphApp {
  /** The id for your client which you will obtain from Navigraph. */
  clientId: string;
  /** The secret password for your client which you will obtain from Navigraph. */
  clientSecret: string;
  domain?: string;
  /** Scopes enable your application to access specific API endpoints on behalf of a user.
   * The set of scopes you pass in your call determines the access permissions that the user is required to grant.
   * @see {@link Scope} */
  scopes: Scope[];
}
