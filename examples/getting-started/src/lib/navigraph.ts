import { initializeApp, NavigraphApp, Scope } from "@navigraph/app"
import { getAuth } from "@navigraph/auth"
import { getChartsAPI } from "@navigraph/charts"
import { getPackagesAPI } from "@navigraph/packages"

const config: NavigraphApp = {
  clientId: "<YOUR_NAVIGRAPH_CLIENT_ID>",
  clientSecret: "<YOUR_NAVIGRAPH_CLIENT_SECRET>",
  scopes: [Scope.CHARTS, Scope.FMSDATA],
}

if (config.clientId.includes("<")) {
  alert("Please add your client credentials in lib/navigraph.ts.")
}

initializeApp(config)

export const auth = getAuth()
export const charts = getChartsAPI()
export const packages = getPackagesAPI()
