import axios from "axios";
import { getIdentityTokenEndpoint } from "../constants";
import { NavigraphCancelToken } from "../lib/navigraphRequest";
import { TokenResponse } from "./types";
import { AuthenticationAbortedError, Logger, NotInitializedError, Scope, getApp } from "@navigraph/app";
import { tokenStorage } from "../internals/storage";
import { setUser } from "../internals/user";
import { decodeUser } from "../util";

const requests = new Map<string, Promise<TokenResponse> | null>();

/** Requests a token using provided options and updates the credential stores with the result. Also sets the user variable. */
export async function requestToken(params: Record<string, string>, cancelToken?: NavigraphCancelToken) {
  const app = getApp();
  if (!app) throw new NotInitializedError("Auth");

  const key = JSON.stringify(params);
  const ongoingRequest = requests.get(key);

  if (ongoingRequest) {
    Logger.debug("Found ongoing request with key " + key);
    return ongoingRequest;
  }

  Logger.debug("No ongoing request found with key " + key);

  const requestPromise = axios
    .post<TokenResponse>(getIdentityTokenEndpoint(), new URLSearchParams(params), {
      cancelToken,
      withCredentials: app.scopes.includes(Scope.TILES) ? true : undefined,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
    .then(async ({ data }) => {
      if (data.access_token && data.refresh_token) {
        await tokenStorage.setAccessToken(data.access_token);
        await tokenStorage.setRefreshToken(data.refresh_token);
        setUser(decodeUser(data.access_token));
      }
      return data;
    })
    .catch((err) => {
      if (axios.isCancel(err)) throw new AuthenticationAbortedError();

      throw err;
    })
    .finally(() => requests.delete(key));

  requests.set(key, requestPromise);
  return requestPromise;
}
