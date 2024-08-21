import { getAmdbAPI } from "@navigraph/amdb"
import { initializeApp, Logger, NavigraphApp, Scope } from "navigraph/app"
import { getAuth } from "navigraph/auth"

Logger.level = "debug"

const config: NavigraphApp = {
  clientId: import.meta.env.NG_CLIENT_ID,
  clientSecret: import.meta.env.NG_CLIENT_SECRET,
  scopes: [Scope.TILES, Scope.AMDB],
}

if (!config.clientId || config.clientId.includes("<")) {
  alert("Please add your client credentials in lib/navigraph.ts.")
}

initializeApp(config)

export const auth = getAuth()
export const amdb = getAmdbAPI()
