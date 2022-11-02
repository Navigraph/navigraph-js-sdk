import { signInWithDeviceFlow } from "./flows/device-flow";

export type DeviceFlowParams = {
  /** The url used to sign in manually (url excl. code)  */
  verification_uri: string;
  /** The url used to sign in automatically (url incl.code) */
  verification_uri_complete: string;
  /** The code that can be used to sign in manually  */
  user_code: string;
};

/** A callback that will be called with the initial parameters,
 *  such as the QR code or the verification uri and code. */
export type DeviceFlowCallback = (params: DeviceFlowParams) => void;

export interface User {
  iss: string;
  aud: string;
  exp: number;
  nbf: number;
  client_id: string;
  scope: string[];
  sub: string;
  auth_time: number;
  idp: string;
  preferred_username: string;
  amr: string[];
  subscriptions: string[];
}

export type Listener = (user: User | null) => void;

/** Unsubscribe function stop receiving updates. */
export type Unsubscribe = () => void;

/** TODO: Add description */
export type CustomStorage = {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
};

export type StorageKeys = {
  accessToken: string;
  refreshToken: string;
};

export interface NavigraphAuth {
  /** Subscribes to changes to the authenticated user.
   * @example const unsubscribe = auth.onAuthStateChanged((u) => setUser(u));
   */
  onAuthStateChanged: (callback: Listener) => Unsubscribe;
  /** Signs out the currently authenticated user. */
  signOut: () => void;
  /** Grabs information about the currently authenticated user.
   * @returns {User|null} The currently authenticated user
   */
  getUser: () => User | null;
  /**
   * Initializes a device flow login sequence.
   * @param callback - A callback that will be called with the initial parameters, such as the QR code or the verification uri and code.
   *
   * See
   * {@link https://developers.navigraph.com/docs/authentication/device-authorization Device Authorization Flow With PKCE} and
   * {@link https://developers.navigraph.com/docs/authentication/pkce Proof Key for Code Exchange (PKCE)} for detailed documentation.
   *
   * @example
   * ```javascript
   * // Initialize device flow sequence
   * auth.signInWithDeviceFlow((p) => {
   *   // Display the code to user & wait for user complete flow
   * }).then((u) => setUser(u));
   * ```
   *
   * @throws {@link NotInitializedError} - If the SDK is not initialized.
   * @throws {@link InvalidClientError} - If the client id or secret is invalid.
   * @throws {@link InvalidScopeError} - If the client contains one or several invalid scopes.
   * @throws {@link UserDeniedAccessError} - If the user denied access.
   * @throws {@link DeviceFlowTokenExpiredError} - If the user failed to authenticate within 5 mins.
   *
   * @async
   * @returns {Promise<User>} A promise that resolves with the user object.
   */
  signInWithDeviceFlow: typeof signInWithDeviceFlow;
  /** Indicates whether the auth module has made an attempt to resume a previous session. */
  isInitialized: () => boolean;
}
