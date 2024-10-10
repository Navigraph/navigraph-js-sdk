import { Logger } from "@navigraph/app"
import { isAxiosError, navigraphRequest } from "@navigraph/auth"
import { FeatureCollection, Geometry } from "geojson"
import { getWeatherApiRoot } from "../../constants"
import { AVWXSource, AVWXSourceProperties } from "../types"

/**
 * Queries GeoJSON data for all aviation weather reports currently available from the selected sources
 * @param sources - List of sources to from which to load the reports from
 * @returns A GEOJson feature collection containing the reports
 */
export default async function getAviationWeatherReports<S extends AVWXSource>(sources: S[]) {
  const result = await navigraphRequest
    .get<FeatureCollection<Geometry, AVWXSourceProperties[S]>>(`${getWeatherApiRoot()}/avwx/combined`, {
      params: { sources: sources.join(",") },
    })
    .catch((e: unknown) => Logger.err("Failed to AVWX reports. Reason:", isAxiosError(e) ? e.message : e))

  return result?.data || null
}
