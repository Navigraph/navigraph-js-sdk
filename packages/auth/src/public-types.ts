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
