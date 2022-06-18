import { NavigraphApp, _apps } from "app";
import { Unsubscribe } from ".";
import { signInWithDeviceFlow } from "./flows/device-flow";
import { parseUser, tokenCall } from "./flows/shared";
import { ACCESS_TOKEN, LISTENERS, REFRESH_TOKEN, setAccessToken, setRefreshToken, USER } from "./internal";
import type { Listener } from "./public-types"; // prettier-ignore

export const getOpenIDContext = () => {
  const app = _apps.get("DEFAULT");

  if (!app) {
    throw new Error("No default app has been initialized.");
  }

  loadPersistedCredentials(app);

  return {
    onAuthStateChanged: (cb: Listener): Unsubscribe => {
      LISTENERS.push(cb);
      return () => LISTENERS.splice(LISTENERS.indexOf(cb), 1)[0];
    },
    signOut: () => setAccessToken(),
    getUser: () => USER,
    signInWithDeviceFlow,
  };
};

const loadPersistedCredentials = async (app: NavigraphApp) => {
  if (typeof window === "undefined")
    return console.warn("Running in Node.js, cannot initialize authentication");

  const storage = localStorage || window.localStorage;

  setAccessToken(storage.getItem("accessToken") ?? undefined);
  setRefreshToken(storage.getItem("refreshToken") ?? undefined);

  if (ACCESS_TOKEN) console.log("Found ACCESS token");
  if (REFRESH_TOKEN) {
    console.log("Found REFRESH token");

    const tokens = await tokenCall({
      client_id: app.clientId,
      client_secret: app.clientSecret,
      grant_type: "refresh_token",
      refresh_token: REFRESH_TOKEN,
    });

    if (tokens.refresh_token) {
      setAccessToken(tokens.access_token);
      setRefreshToken(tokens.refresh_token);
      parseUser(tokens.access_token);
    }
  }
};
