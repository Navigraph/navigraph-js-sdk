import { getApp, Logger, NotInitializedError, Scope } from "@navigraph/app"
import getAvwxReports from "../api/avwx/getAvwxReports"
import getReportsAlongRoute from "../api/getReportsAlongRoute"
import getMetarAtAirport from "../api/metar/getMetarAtAirport"
import getMetarsAroundPoint from "../api/metar/getMetarsAroundPoint"
import getMetarsAtAirport from "../api/metar/getMetarsAtAirport"
import getTafAtAirport from "../api/taf/getTafAtAirport"
import getTafsAroundPoint from "../api/taf/getTafsAroundPoint"
import getTafsAtAirport from "../api/taf/getTafsAtAirport"

/** Grabs a reference to an object containing available Navigraph Weather API functionality */
export const getWeatherApi = () => {
  const app = getApp()

  if (!app) {
    throw new NotInitializedError("Auth")
  } else if (!app.scopes.includes(Scope.WEATHER)) {
    Logger.warning(
      "Your Navigraph Application does not have the WEATHER scope. Attempts to access the Weather API will fail.",
    )
  }

  return {
    getMetarAtAirport,
    getMetarsAtAirport,
    getMetarsAroundPoint,
    getTafAtAirport,
    getTafsAtAirport,
    getTafsAroundPoint,
    getReportsAlongRoute,
    getAvwxReports,
  }
}
