import { Logger } from "@navigraph/app";
import axios from "axios";
import { IDENTITY_ROOT } from "../constants";
import { setUser, tokenStorage } from "../internal";
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
        tokenStorage.setAccessToken(data.access_token);
        tokenStorage.setRefreshToken(data.refresh_token);
        setUser(parseUser(data.access_token));
      }
      return data;
    });
}

export const parseUser = (accessToken?: TokenResponse["access_token"]): User | null => {
  if (!accessToken) {
    Logger.warning("Tried to parse user without access token.");
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
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return undefined;
  }
};
