import { Logger } from "@navigraph/app"
import { isAxiosError, navigraphRequest } from "@navigraph/auth"
import { getTafApiRoot } from "../../constants"
import { Taf } from "../types"

/**
 * Queries the most recently issued TAF for a given airport
 * @param icao - The ICAO code of the airport from which to load the TAF
 * @returns - A TAF object parsed from the raw report using {@link https://www.npmjs.com/package/metar-taf-parser metar-taf-parser}
 */
export default async function getTafAtAirport(icao: string) {
  const result = await navigraphRequest
    .get<Taf>(`${getTafApiRoot()}/${icao}`)
    .catch((e: unknown) => Logger.err(`Failed to fetch TAF for ${icao}. Reason:`, isAxiosError(e) ? e.message : e))

  return result?.data || null
}
