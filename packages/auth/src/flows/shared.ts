import { Logger, Scope } from "@navigraph/app";
import axios from "axios";
import { getIdentityTokenEndpoint } from "../constants";
import { setUser, tokenStorage } from "../internal";
import { User } from "../public-types";
import { TokenResponse } from "../types";

export async function tokenCall(params: Record<string, string>) {
  return axios
    .post<TokenResponse>(getIdentityTokenEndpoint(), new URLSearchParams(params), {
      withCredentials: params.scopes?.includes(Scope.TILES) ? true : undefined,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
    .then(async ({ data }) => {
      if (data.access_token && data.refresh_token) {
        await tokenStorage.setAccessToken(data.access_token);
        await tokenStorage.setRefreshToken(data.refresh_token);
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
  const user = parseJwt(accessToken);

  if (user) {
    filter.forEach((filteredKey) => {
      filteredKey in user && delete user[filteredKey as keyof User];
    });
  }

  return user;
};

export const parseJwt = (token: string): User | null => {
  try {
    return JSON.parse(atob(token.split(".")[1])) as User;
  } catch (e) {
    return null;
  }
};
