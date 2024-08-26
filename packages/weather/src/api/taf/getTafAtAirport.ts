import { Logger } from "@navigraph/app"
import { isAxiosError, navigraphRequest } from "@navigraph/auth"
import { getTafApiRoot } from "../../constants"
import { Taf } from "../types"

export default async function getTafAtAirport(icao: string) {
  const result = await navigraphRequest
    .get<Taf>(`${getTafApiRoot()}/${icao}`)
    .catch((e: unknown) => Logger.err(`Failed to fetch TAF for ${icao}. Reason:`, isAxiosError(e) ? e.message : e))

  return result?.data || null
}
