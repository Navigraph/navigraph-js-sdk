import pkce from "@navigraph/pkce";
import { getDefaultApp, _apps } from "app";
import axios from "axios";
import qr from "qr-image";
import { IDENTITY_DEVICE_AUTH } from "../constants";
import type { DeviceFlowCallback, QrObject, User } from "../public-types";
import type { AuthorizationResponse, TokenResponse } from "../types";
import { parseUser, tokenCall } from "./shared";

const MAX_ATTEMPTS = 3;

function createQR(url: string): QrObject {
  const buffer = qr.imageSync(url);
  return {
    buffer,
    imgSrc: `data:image/png;base64,${buffer.toString("base64")}`,
  };
}

/**
 * Initializes a device flow login sequence.
 *
 * See
 * {@link
 *   https://developers.navigraph.com/docs/authentication/device-authorization
 *   | Device Authorization Flow With PKCE} and
 * {@link
 *   https://developers.navigraph.com/docs/authentication/pkce
 *   | Proof Key for Code Exchange (PKCE)} for detailed documentation.
 *
 * @example
 * ```javascript
 * // Initialize device flow sequence
 * auth.signInWithDeviceFlow((p) => {
 *   // Display the code to user & wait for user complete flow
 * }).then((u) => setUser(u));
 * ```
 *
 * @param callback - A callback that will be called with the initial parameters, such as the QR code or the verification uri and code.
 * @async
 * @returns {Promise<User>} A promise that resolves with the user object.
 */
export async function signInWithDeviceFlow(cb: DeviceFlowCallback): Promise<User> {
  const app = getDefaultApp();

  const { code_verifier, code_challenge } = pkce();

  // Initiate device flow
  // prettier-ignore
  const response = await axios.post<AuthorizationResponse>(IDENTITY_DEVICE_AUTH,
      new URLSearchParams({
        client_id: app.clientId,
        client_secret: app.clientSecret,
        code_challenge,
        code_challenge_method: "S256",
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    ).catch(() => new Error("Unable to sign in with device flow."))

  if (response instanceof Error) {
    throw response;
  }

  const { verification_uri, verification_uri_complete, user_code, interval } = response.data; // prettier-ignore

  if (cb) {
    cb({
      verification_uri,
      verification_uri_complete,
      user_code,
      qr: createQR(verification_uri_complete),
    });
  }

  const tokens = await poll({ ...response.data, interval: interval * 1000, code_verifier });

  return parseUser(tokens.access_token) as User;
}

async function poll(
  params: AuthorizationResponse & { code_verifier: string },
  attempts = 0
): Promise<TokenResponse> {
  const app = getDefaultApp();

  if (attempts >= MAX_ATTEMPTS) {
    throw new Error("Unable to sign in with device flow. Max attempts reached.");
  }

  await new Promise((resolve) => setTimeout(resolve, params.interval));

  try {
    const response = await tokenCall({
      client_id: app.clientId,
      client_secret: app.clientSecret,
      code_verifier: params.code_verifier,
      device_code: params.device_code,
      grant_type: "urn:ietf:params:oauth:grant-type:device_code",
      scope: app.scopes.join(" "),
    });

    return response;
  } catch (error: any) {
    switch (error.response.data.error) {
      case "slow_down":
        attempts++;
        params.interval += 5000;
        return poll(params, attempts);
      case "authorization_pending":
        attempts++;
        return poll(params, attempts);
      case "access_denied":
        throw new Error("Authentication failed. User denied access.");
      case "expired_token":
        throw new Error("Authentication failed. Token expired.");
      default:
        throw error;
    }
  }
}
