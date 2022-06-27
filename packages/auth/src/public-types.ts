export type DeviceFlowParams = {
  /** The url used to sign in manually  */
  verification_uri: string;
  /** The url used to sign in automatically  */
  verification_uri_complete: string;
  /** The code that can be used to sign in manually  */
  user_code: string;
  /** The QR code to scan in order to open the
   * verification_uri_complete URL */
  qr: QrObject;
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

export interface QrObject {
  /** The raw buffer */
  buffer: Buffer;
  /** A string that be directly used within an <img> tag.
   *  Includes the buffer in base64 form. */
  imgSrc: string;
}

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
