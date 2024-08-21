import { getApp, Logger, NotInitializedError, Scope } from "@navigraph/app"
import getAmdbLayer from "../api/getAmdbLayer"
import getAmdbLayers from "../api/getAmdbLayers"
import searchAmdb from "../api/searchAmdb"

/** Grabs a reference to an object containing available Navigraph AMDB API functionality */
export const getAmdbAPI = () => {
  const app = getApp()

  if (!app) {
    throw new NotInitializedError("Auth")
  } else if (!app.scopes.includes(Scope.AMDB)) {
    Logger.warning(
      "Your Navigraph Application does not have the AMDB scope. Attempts to access the AMDB API will fail.",
    )
  }

  return {
    getAmdbLayer,
    getAmdbLayers,
    searchAmdb,
  }
}
