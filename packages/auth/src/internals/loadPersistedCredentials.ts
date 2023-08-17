import { Logger } from "@navigraph/app"
import signOut from "./signOut"
import verifyUser from "./verifyUser"

export let INITIALIZED = false

export default async function loadPersistedCredentials() {
  if (INITIALIZED) return Promise.resolve()

  await verifyUser().catch(e => {
    Logger.warning("Failed to load persisted credentials", e)
    signOut().catch(e => Logger.warning("Failed to sign out after failed initialization attempt", e))
  })

  INITIALIZED = true
}
