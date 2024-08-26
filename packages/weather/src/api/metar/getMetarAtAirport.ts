import { Logger } from "@navigraph/app"
import { isAxiosError, navigraphRequest } from "@navigraph/auth"
import { getMetarApiRoot } from "../../constants"
import { Metar } from "../types"

export default async function getMetarAtAirport(icao: string) {
  const result = await navigraphRequest
    .get<Metar>(`${getMetarApiRoot()}/${icao}`)
    .catch((e: unknown) => Logger.err(`Failed to fetch METAR for ${icao}. Reason:`, isAxiosError(e) ? e.message : e))

  return result?.data || null
}
