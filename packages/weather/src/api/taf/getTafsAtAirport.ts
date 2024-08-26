import { Logger } from "@navigraph/app"
import { isAxiosError, navigraphRequest } from "@navigraph/auth"
import { getTafApiRoot } from "../../constants"
import { Taf } from "../types"

export default async function getTafsAtAirport(icao: string) {
  const result = await navigraphRequest
    .get<Taf[]>(`${getTafApiRoot()}/multi/${icao}`)
    .catch((e: unknown) => Logger.err(`Failed to fetch TAFs for ${icao}. Reason:`, isAxiosError(e) ? e.message : e))

  return result?.data || null
}
