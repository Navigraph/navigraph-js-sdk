import { getApp, Logger, NotInitializedError, Scope } from "@navigraph/app";
import getChartImage from "./lib/getChartImage";
import getChartsIndex from "./lib/getChartsIndex";
import { NavigraphCharts as NavigraphChartsAPI } from "./public-types";

/** Grabs a reference to an object containing available Navigraph Charts API functionality */
export const getChartsAPI = (): NavigraphChartsAPI => {
  const app = getApp();

  if (!app) {
    throw new NotInitializedError("Auth");
  } else if (!app.scopes.includes(Scope.CHARTS)) {
    Logger.warning(
      "Your Navigraph Application does not have the CHARTS scope. Attempts to access the Charts API will fail."
    );
  }

  return {
    getChartsIndex,
    getChartImage,
  };
};
