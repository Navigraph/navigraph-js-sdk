import { Logger } from "@navigraph/app"
import { isAxiosError, navigraphRequest } from "@navigraph/auth"
import { getAmdbApiRoot } from "../constants"
import { AmdbCycleResponse } from "../types"

/**
 * Fetches information about the currently active cycle
 * @returns A record conntaining the cycle number along with start and end dates.
 */
export default async function getAmdbCycle() {
  const result = await navigraphRequest
    .get<AmdbCycleResponse>(`${getAmdbApiRoot()}/cycle`)
    .catch((e: unknown) => Logger.err("Failed to fetch amdb cycle. Reason:", isAxiosError(e) ? e.message : e))

  return result?.data || null
}
