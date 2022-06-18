import { Listener, User } from "./public-types";

export let ACCESS_TOKEN: string | undefined = undefined;
export let REFRESH_TOKEN: string | undefined = undefined;
export let USER: User | null = null;

export const LISTENERS: Listener[] = [];

export const setAccessToken = (accessToken?: string) => {
  ACCESS_TOKEN = accessToken;

  if (localStorage && accessToken) {
    localStorage.setItem("accessToken", accessToken);
  }
};
export const setRefreshToken = (refreshToken?: string) => {
  REFRESH_TOKEN = refreshToken;

  if (localStorage && refreshToken) {
    localStorage.setItem("refreshToken", refreshToken);
  }
};
export const setUser = (user: User | null) => {
  USER = user;
  LISTENERS.forEach((listener) => listener(user));
};
