import axios from "axios";
import { IDENTITY_ROOT } from "../constants";
import { ACCESS_TOKEN, setAccessToken, setRefreshToken, setUser } from "../internal";
import { User } from "../public-types";
import { TokenResponse } from "../types";

export async function tokenCall(params: Record<string, string>) {
  return axios
    .post<TokenResponse>(
      IDENTITY_ROOT + "/connect/token",
      new URLSearchParams(params),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" }} // prettier-ignore
    )
    .then(({ data }) => {
      if (data.access_token && data.refresh_token) {
        setAccessToken(data.access_token);
        setRefreshToken(data.refresh_token);
        setUser(parseUser(data.access_token));
      }
      return data;
    });
}

export const parseUser = (accessToken?: TokenResponse["access_token"]): User | null => {
  accessToken = accessToken || ACCESS_TOKEN;
  if (!accessToken) {
    console.warn("Unable to get user without an access token");
    return null;
  }

  const filter = ["name"];
  const user = Object.fromEntries(
    Object.entries(parseJwt(accessToken) || {}).filter(([key]) => !filter.includes(key))
  ) as User;

  return user;
};

export const parseJwt = (token: string): User | undefined => {
  try {
    return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
  } catch (e) {
    return undefined;
  }
};
