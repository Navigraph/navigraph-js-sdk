import { Logger } from "@navigraph/app"
import { isAxiosError, navigraphRequest } from "@navigraph/auth"
import { getWeatherApiRoot } from "../../constants"
import { Metar } from "../types"

/**
 * Queries all METARs for an airport issued within approximately the last 10 hours, ordered from most recent to most outdated
 * @param icao - The ICAO code of the airport from which to load the METARs
 * @returns - An array of METAR objects parsed from the raw reports using {@link https://www.npmjs.com/package/metar-taf-parser metar-taf-parser}
 */
export default async function getMetarsAtAirport(icao: string) {
  const result = await navigraphRequest
    .get<Metar[]>(`${getWeatherApiRoot()}/metar/multi/${icao}`)
    .catch((e: unknown) => Logger.err(`Failed to fetch METARs for ${icao}. Reason:`, isAxiosError(e) ? e.message : e))

  return result?.data || null
}
