import { initializeApp, Scope } from "navigraph/app";
import { getAuth } from "navigraph/auth";
import { getWeatherAPI } from "navigraph/weather";
import { getChartsAPI } from "navigraph/charts";

const config = {
  client_id: "60919894637267689917694914270940",
  client_secrets: [
    {
      client_id: "60919894637267689917694914270940",
      secret_id: "6MNRR1VX59PLH16XK2GE44WF",
      secret_value: "Ava3GpmMrREHmoQiXn5Ab52xQ6mBiWV6",
    },
  ],
};

initializeApp({
  clientId: config.client_id,
  clientSecret: config.client_secrets[0].secret_value,
  scopes: [Scope.USERINFO, Scope.OPENID, Scope.CHARTS, Scope.OFFLINE, Scope.FMSDATA],
});

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
export const weather = getWeatherAPI();
export const charts = getChartsAPI();
