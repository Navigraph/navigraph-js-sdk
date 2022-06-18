import { _apps } from "app";
import axios from "axios";
import { tokenCall } from "./flows/shared";
import { ACCESS_TOKEN, LISTENERS, REFRESH_TOKEN, setAccessToken, setRefreshToken } from "./internal";

export const authenticatedAxios = axios.create();

authenticatedAxios.interceptors.request.use((config) => ({
  ...config,
  headers: {
    Authorization: "Bearer " + ACCESS_TOKEN,
  },
}));

authenticatedAxios.interceptors.response.use(
  (res) => res,
  async (error) => {
    const app = _apps.get("DEFAULT");

    if (app && error.response.status === 401 && REFRESH_TOKEN) {
      const tokenResponse = await tokenCall({
        client_id: app.clientId,
        client_secret: app.clientSecret,
        grant_type: "refresh_token",
        refresh_token: REFRESH_TOKEN,
      });

      if (tokenResponse.refresh_token) {
        setAccessToken(tokenResponse.access_token);
        setRefreshToken(tokenResponse.refresh_token);

        return axios.request({
          ...error.config,
          headers: {
            Authorization: "Bearer " + ACCESS_TOKEN,
          },
        });
      }

      // If refresh attempt fails, logout
      LISTENERS.forEach((listener) => listener(null));
    }

    return error.config;
  }
);
