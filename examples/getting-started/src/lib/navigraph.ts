import { initializeApp, Scope, NavigraphApp } from "navigraph/app";
import { getAuth } from "navigraph/auth";
import { getChartsAPI } from "navigraph/charts";

const config: NavigraphApp = {
  clientId: "<YOUR_NAVIGRAPH_CLIENT_ID>",
  clientSecret: "<YOUR_NAVIGRAPH_CLIENT_SECRET>",
  scopes: [Scope.CHARTS, Scope.EMAIL, Scope.FMSDATA],
};

initializeApp(config);

export const auth = getAuth();
export const charts = getChartsAPI();

console.log("after init");
