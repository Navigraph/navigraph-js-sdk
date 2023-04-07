import { Logger, getApp } from "@navigraph/app";
import axios from "axios";
import { tokenCall } from "./flows/shared";
import { tokenStorage } from "./internal";
import { signOut } from "./internal";

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
      const tokenResponse = await tokenCall({
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
