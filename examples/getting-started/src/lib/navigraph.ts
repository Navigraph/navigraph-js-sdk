import { initializeApp, Scope, NavigraphApp } from "navigraph/app";
import { getAuth } from "navigraph/auth";
import { getChartsAPI } from "navigraph/charts";

const config: NavigraphApp = {
  clientId: "<YOUR_NAVIGRAPH_CLIENT_ID>",
  clientSecret: "<YOUR_NAVIGRAPH_CLIENT_SECRET>",
  scopes: [Scope.CHARTS, Scope.FMSDATA],
};

initializeApp(config);

export const auth = getAuth({
  storage:
    typeof localStorage !== "undefined"
      ? {
          getItem: (key) => localStorage.getItem("NG" + key),
          setItem: (key, value) => localStorage.setItem("NG" + key, value),
        }
      : undefined,
  keys: {
    accessToken: "cool_access_token",
  },
});
export const charts = getChartsAPI();
