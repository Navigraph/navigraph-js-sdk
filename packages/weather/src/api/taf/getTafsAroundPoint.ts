import { Logger } from "@navigraph/app"
import { isAxiosError, navigraphRequest } from "@navigraph/auth"
import { getWeatherApiRoot } from "../../constants"
import { Taf } from "../types"

/**
 * Queries all TAFs within a distance of a point issued within approximately the last 10 hours, ordered from most recent to most outdated, then by distance from the center point
 * @param latitude - Latitude of the center point
 * @param longitude - longitude of the center point
 * @param radius - Radius in **nautical miles** around the center point to search for TAFs within
 * @param limit - Maximum number of TAFs to return
 * @returns - An array of TAF objects parsed from the raw reports using {@link https://www.npmjs.com/package/metar-taf-parser metar-taf-parser}
 */
export default async function getTafsAroundPoint(latitude: number, longitude: number, radius?: number, limit?: number) {
  const result = await navigraphRequest
    .get<Taf[]>(`${getWeatherApiRoot()}/taf/around/${latitude}/${longitude}`, {
      params: {
        radius,
        limit,
      },
    })
    .catch((e: unknown) =>
      Logger.err(`Failed to fetch TAFs around (${latitude}, ${longitude}). Reason:`, isAxiosError(e) ? e.message : e),
    )

  return result?.data || null
}
