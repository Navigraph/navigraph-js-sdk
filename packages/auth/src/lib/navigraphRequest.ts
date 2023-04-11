import { Logger, getApp } from "@navigraph/app";
import axios, { AxiosError } from "axios";
import { tokenStorage } from "../internals/storage";
import { requestToken } from "../api/requestToken";
import signOut from "../internals/signOut";

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

// Axios re-exports
export const isAxiosError = (payload: unknown): payload is AxiosError => axios.isAxiosError(payload);
export const CancelToken = axios.CancelToken as NavigraphCancelTokenStatic;

export const navigraphRequest = axios.create();

navigraphRequest.interceptors.request.use(async (config) => {
  const token = await tokenStorage.getAccessToken();

  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  return config;
});

navigraphRequest.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const app = getApp();
    const REFRESH_TOKEN = await tokenStorage.getRefreshToken();

    if (app && error?.response?.status === 401 && REFRESH_TOKEN) {
      const tokenResponse = await requestToken({
        client_id: app.clientId,
        client_secret: app.clientSecret,
        grant_type: "refresh_token",
        refresh_token: REFRESH_TOKEN,
      });

      if (tokenResponse.refresh_token) {
        await tokenStorage.setAccessToken(tokenResponse.access_token);
        await tokenStorage.setRefreshToken(tokenResponse.refresh_token);

        return axios.request({
          ...error.config,
          headers: {
            Authorization: "Bearer " + tokenResponse.access_token,
          },
        });
      }

      // If refresh attempt fails, logout
      signOut().catch((e) => Logger.warning("Failed to sign out after a token refresh failure", e));
    }

    throw error;
  }
);
