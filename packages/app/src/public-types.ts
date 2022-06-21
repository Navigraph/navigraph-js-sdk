export enum Scope {
  "CHARTS" = "charts",
  "FMSDATA" = "fmsdata",
  "USERINFO" = "userinfo",
  "OFFLINE" = "offline_access",
  "OPENID" = "openid",
}

export interface NavigraphApp {
  /** The client_id is the id for your client which you will obtain from Navigraph. */
  clientId: string;
  /** The client_secret is the secret password for your client which you will obtain from Navigraph. */
  clientSecret: string;
  /** Scopes enable your application to access specific API endpoints on behalf of a user. The set of scopes you pass in your call determines the access permissions that the user is required to grant. For FMS Data add "fmsdata" and for charts add "charts". */
  scopes: Scope[];
}
