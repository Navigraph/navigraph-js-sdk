import { getApp, NotInitializedError } from "@navigraph/app"
import getAviationWeatherReports from "../api/avwx/getAviationWeatherReports"
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
  }
  // Weather API does not require any scopes as of now

  return {
    getMetarAtAirport,
    getMetarsAtAirport,
    getMetarsAroundPoint,
    getTafAtAirport,
    getTafsAtAirport,
    getTafsAroundPoint,
    getReportsAlongRoute,
    getAviationWeatherReports,
  }
}
