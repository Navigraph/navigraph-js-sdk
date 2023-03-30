import { AuthenticationAbortedError, Logger, Scope } from "@navigraph/app";
import axios, { Cancel } from "axios";
import { getIdentityTokenEndpoint } from "../constants";
import { setUser, tokenStorage } from "../internal";
import { User } from "../public-types";
import { TokenResponse } from "../types";

function isCancelError(error: unknown): error is Cancel {
  return !!error && typeof error === "object" && "message" in error && error.message === "canceled";
}

export async function tokenCall(params: Record<string, string>, signal?: AbortSignal) {
  return axios
    .post<TokenResponse>(getIdentityTokenEndpoint(), new URLSearchParams(params), {
      signal: signal,
      withCredentials: params.scope?.includes(Scope.TILES) ? true : undefined,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
    .then(async ({ data }) => {
      if (data.access_token && data.refresh_token) {
        await tokenStorage.setAccessToken(data.access_token);
        await tokenStorage.setRefreshToken(data.refresh_token);
        setUser(parseUser(data.access_token));
      }
      return data;
    })
    .catch((err) => {
      if (isCancelError(err)) {
        throw new AuthenticationAbortedError();
      }

      throw err;
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
