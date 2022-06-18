import { initialize, Scope } from "navigraph/app";
import { getOpenIDContext } from "navigraph/auth";
import { getWeatherClient } from "navigraph/weather";

const config = {
  client_id: "60919894637267689917694914270940",
  client_name: "charts-rn-device-flow",
  client_description: "device flow test",
  client_secrets: [
    {
      client_id: "60919894637267689917694914270940",
      secret_id: "6MNRR1VX59PLH16XK2GE44WF",
      secret_value: "Ava3GpmMrREHmoQiXn5Ab52xQ6mBiWV6",
    },
  ],
  client_type: "aircraft_addon",
  status: "sandboxed",
  logout_redirect_uris: ["http://127.0.0.1/"],
  redirect_uris: ["http://127.0.0.1/", "oob://my_redirect_uri/"],
  services: ["charts", "fmsdata", "offline_access", "openid", "userinfo"],
};

initialize({
  clientId: config.client_id,
  clientSecret: config.client_secrets[0].secret_value,
  scopes: [Scope.USERINFO, Scope.OPENID, Scope.CHARTS, Scope.OFFLINE, Scope.FMSDATA],
});

export const auth = getOpenIDContext();
export const weather = getWeatherClient();
