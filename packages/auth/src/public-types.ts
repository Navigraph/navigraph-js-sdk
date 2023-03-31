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
  getItem(key: string): string | null | Promise<string | null>;
  setItem(key: string, value: string): void | Promise<void>;
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
  /** @inheritdoc */
  signInWithDeviceFlow: typeof signInWithDeviceFlow;
  /** Indicates whether the auth module has made an attempt to resume a previous session. */
  isInitialized: () => boolean;
}

export interface CancelStatic {
  new (message?: string): Cancel;
}

export interface Cancel {
  message: string;
}

export interface Canceler {
  (message?: string): void;
}

export interface NavigraphCancelTokenStatic {
  new (executor: (cancel: Canceler) => void): NavigraphCancelToken;
  source(): CancelTokenSource;
}

/** A `CancelToken`, as defined by Axios. Can be used to abort ongoing sign-in attempts after polling has already started. */
export interface NavigraphCancelToken {
  promise: Promise<Cancel>;
  reason?: Cancel;
  throwIfRequested(): void;
}

export interface CancelTokenSource {
  /** Cancellation token to be provided to the SDK */
  token: NavigraphCancelToken;
  /** Cancels any requests that are referencing the associated {@link NavigraphCancelToken} */
  cancel: Canceler;
}
