import { getApp, Logger, NotInitializedError, Scope } from "@navigraph/app"
import { getDefaultPackage } from "../api/getDefaultPackage"
import { getPackages } from "../api/getPackages"
import { listPackages } from "../api/listPackages"

/** Grabs a reference to an object containing available Navigraph Packages functionality */
export const getPackagesAPI = () => {
  const app = getApp()

  if (!app) {
    throw new NotInitializedError("Auth")
  } else if (!app.scopes.includes(Scope.FMSDATA)) {
    Logger.warning(
      "Your Navigraph Application does not have the FMSDATA scope. Attempts to access the Packages API will fail.",
    )
  }

  return { listPackages, getDefaultPackage, getPackages }
}
