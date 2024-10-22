import { Logger } from "@navigraph/app"
import { isAxiosError, navigraphRequest } from "@navigraph/auth"
import { getWeatherApiRoot } from "../../constants"
import { Metar } from "../types"

/**
 * Queries the most recently issued METAR for a given airport
 * @param icao - The ICAO code of the airport from which to load the METAR
 * @returns - A METAR object parsed from the raw report using {@link https://www.npmjs.com/package/metar-taf-parser metar-taf-parser}
 */
export default async function getMetarAtAirport(icao: string) {
  const result = await navigraphRequest
    .get<Metar>(`${getWeatherApiRoot()}/metar/${icao}`)
    .catch((e: unknown) => Logger.err(`Failed to fetch METAR for ${icao}. Reason:`, isAxiosError(e) ? e.message : e))

  return result?.data || null
}
