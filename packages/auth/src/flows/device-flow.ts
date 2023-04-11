import pkce from "@navigraph/pkce";
import {
  getApp,
  NotInitializedError,
  NavigraphApp,
  UserDeniedAccessError,
  DeviceFlowTokenExpiredError,
  InvalidClientError,
  InvalidScopeError,
} from "@navigraph/app";
import axios, { AxiosError } from "axios";
import { getIdentityDeviceAuthEndpoint } from "../constants";
import { NavigraphCancelToken } from "../lib/navigraphRequest";
import { AuthorizationResponse, FailedAuthorizationResponse, TokenResponse } from "../api/types";
import { requestToken } from "../api/requestToken";
import { decodeUser } from "../util";
import { User } from "../internals/user";

/** Parameters needed in order enable a user to authenticate using the device flow. */
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
 * const cancelSource = CancelToken.source();
 * // Initialize device flow sequence
 * auth.signInWithDeviceFlow((p) => {
 *   // Display the code to user & wait for user complete flow
 * }, cancelSource.token).then((u) => setUser(u));
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
export async function signInWithDeviceFlow(
  callback: DeviceFlowCallback,
  cancelToken?: NavigraphCancelToken
): Promise<User> {
  const app = getApp();

  if (!app) {
    throw new NotInitializedError("Auth");
  }

  const { code_verifier, code_challenge } = pkce();

  // Initiate device flow
  const response = await axios
    .post<AuthorizationResponse>(
      getIdentityDeviceAuthEndpoint(),
      new URLSearchParams({
        client_id: app.clientId,
        client_secret: app.clientSecret,
        code_challenge,
        code_challenge_method: "S256",
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    )
    .catch((err: AxiosError<FailedAuthorizationResponse>) => {
      const status = err.response?.status;

      return status && status < 500
        ? new InvalidClientError()
        : new Error(`Unable to sign in with device flow. ${err.message}`);
    });

  if (response instanceof Error) {
    throw response;
  }

  const { verification_uri, verification_uri_complete, user_code, interval } = response.data; // prettier-ignore

  if (callback) {
    callback({
      verification_uri,
      verification_uri_complete,
      user_code,
    });
  }

  const tokens = await poll(app, { ...response.data, interval: interval * 1000, code_verifier }, cancelToken);

  return decodeUser(tokens.access_token) as User;
}

async function poll(
  app: NavigraphApp,
  params: AuthorizationResponse & { code_verifier: string },
  cancelToken?: NavigraphCancelToken,
  attempts = 0
): Promise<TokenResponse> {
  await new Promise((resolve) => setTimeout(resolve, params.interval));

  try {
    const response = await requestToken(
      {
        client_id: app.clientId,
        client_secret: app.clientSecret,
        code_verifier: params.code_verifier,
        device_code: params.device_code,
        grant_type: "urn:ietf:params:oauth:grant-type:device_code",
        scope: app.scopes.join(" "),
      },
      cancelToken
    );

    return response;
  } catch (exception: unknown) {
    if (axios.isAxiosError(exception)) {
      const { error } = exception.response?.data as { error: string };

      switch (error) {
        case "slow_down":
          attempts++;
          params.interval += 5000;
          return poll(app, params, cancelToken, attempts);
        case "authorization_pending":
          attempts++;
          return poll(app, params, cancelToken, attempts);
        case "access_denied":
          throw new UserDeniedAccessError();
        case "expired_token":
          throw new DeviceFlowTokenExpiredError();
        case "invalid_scope":
          throw new InvalidScopeError();
        default:
          throw new Error("An unknown error ocurred: " + error);
      }
    } else {
      throw exception;
    }
  }
}
