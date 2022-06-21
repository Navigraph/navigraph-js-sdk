import { getApp } from "@navigraph/app";
import axios from "axios";
import { tokenCall } from "./flows/shared";
import { LISTENERS, tokenStorage } from "./internal";

export const authenticatedAxios = axios.create();

authenticatedAxios.interceptors.request.use((config) => ({
  ...config,
  headers: {
    // Will cause header to be "Bearer null" if no token is set
    Authorization: "Bearer " + tokenStorage.getAccessToken(),
  },
}));

authenticatedAxios.interceptors.response.use(
  (res) => res,
  async (error) => {
    const app = getApp();
    const REFRESH_TOKEN = tokenStorage.getRefreshToken();

    if (app && error.response.status === 401 && REFRESH_TOKEN) {
      const tokenResponse = await tokenCall({
        client_id: app.clientId,
        client_secret: app.clientSecret,
        grant_type: "refresh_token",
        refresh_token: REFRESH_TOKEN,
      });

      if (tokenResponse.refresh_token) {
        tokenStorage.setAccessToken(tokenResponse.access_token);
        tokenStorage.setRefreshToken(tokenResponse.refresh_token);

        return axios.request({
          ...error.config,
          headers: {
            Authorization: "Bearer " + tokenResponse.access_token,
          },
        });
      }

      // If refresh attempt fails, logout
      LISTENERS.forEach((listener) => listener(null));
    }

    return error.config;
  }
);
