import { Logger } from "@navigraph/app"
import { isAxiosError, navigraphRequest } from "@navigraph/auth"
import { FeatureCollection, Geometry } from "geojson"
import { getAvwxApiRoot } from "../../constants"
import { AVWXSource, AVWXSourceProperties } from "../types"

/**
 * Queries GeoJSON data for all AVWX reports currently available from the selected sources
 * @param sources - List of sources to from which to load AVWX reports from
 * @returns A GEOJson feature collection containing the reports
 */
export default async function getAvwxReports<S extends AVWXSource>(sources: S[]) {
  const result = await navigraphRequest
    .get<FeatureCollection<Geometry, AVWXSourceProperties[S]>>(`${getAvwxApiRoot()}/combined`, {
      params: { sources: sources.join(",") },
    })
    .catch((e: unknown) => Logger.err("Failed to AVWX reports. Reason:", isAxiosError(e) ? e.message : e))

  return result?.data || null
}
