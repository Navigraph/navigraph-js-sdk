import { Logger } from "@navigraph/app"
import { isAxiosError, navigraphRequest } from "@navigraph/auth"
import { getMetarApiRoot } from "../../constants"
import { Metar } from "../types"

export default async function getMetarsAtAirport(icao: string) {
  const result = await navigraphRequest
    .get<Metar[]>(`${getMetarApiRoot()}/multi/${icao}`)
    .catch((e: unknown) => Logger.err(`Failed to fetch METARs for ${icao}. Reason:`, isAxiosError(e) ? e.message : e))

  return result?.data || null
}
