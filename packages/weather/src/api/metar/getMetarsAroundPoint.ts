import { Logger } from "@navigraph/app"
import { isAxiosError, navigraphRequest } from "@navigraph/auth"
import { getMetarApiRoot } from "../../constants"
import { Metar } from "../types"

/**
 * Queries all METARs within a distance of a point issued within approximately the last 10 hours, ordered by distance from the center point
 * @param latitude - Latitude of the center point
 * @param longitude - longitude of the center point
 * @param radius - Radius in **nautical miles** around the center point to search for METARs within
 * @param limit - Maximum number of METARs to return
 * @returns - An array of METAR objects parsed from the raw reports using {@link https://www.npmjs.com/package/metar-taf-parser metar-taf-parser}
 */
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
