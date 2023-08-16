import { initializeApp, Scope, NavigraphApp } from "@navigraph/app";
import { getAuth } from "@navigraph/auth";
import { getChartsAPI } from "@navigraph/charts";

const config: NavigraphApp = {
  clientId: "navigraph-avionics",
  clientSecret: "u4a4BzinUAtlCLXKKPGTda5dO1M3HWOx",
  scopes: [Scope.CHARTS, Scope.EMAIL, Scope.FMSDATA],
};

initializeApp(config);

export const auth = getAuth();
export const charts = getChartsAPI();
