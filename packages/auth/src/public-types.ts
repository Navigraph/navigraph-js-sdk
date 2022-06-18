export type DeviceFlowParams = {
  /** The url used to sign in manually  */
  verification_uri: string;
  /** The url used to sign in automatically  */
  verification_uri_complete: string;
  /** The code that can be used to sign in manually  */
  user_code: string;
  /** The QR code to scan in order to open the verification_uri_complete URL */
  qr: QrObject;
};

/** Hello */
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
  /** A string that be directly used within an <img> tag. Includes the buffer in base64 form. */
  imgSrc: string;
}

export type Unsubscribe = () => void;
