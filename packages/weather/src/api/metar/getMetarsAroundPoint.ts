import { Logger } from "@navigraph/app"
import { isAxiosError, navigraphRequest } from "@navigraph/auth"
import { getMetarApiRoot } from "../../constants"
import { Metar } from "../types"

export default async function getMetarsAroundPoint(
  latitude: number,
  longitude: number,
  radius?: number,
  limit?: number,
) {
  const result = await navigraphRequest
    .get<Metar[]>(`${getMetarApiRoot()}/around/${latitude}/${longitude}`, {
      params: {
        radius,
        limit,
      },
    })
    .catch((e: unknown) =>
      Logger.err(`Failed to fetch METARs around (${latitude}, ${longitude}). Reason:`, isAxiosError(e) ? e.message : e),
    )

  return result?.data || null
}
