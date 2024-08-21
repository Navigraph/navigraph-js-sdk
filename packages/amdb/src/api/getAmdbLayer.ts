import { Logger } from "@navigraph/app"
import { isAxiosError, navigraphRequest } from "@navigraph/auth"
import { getAmdbApiRoot } from "../constants"
import { AmdbLayerName, AmdbResult, Projection } from "../types"

/**
 * Fetches a single layer from the AMDB for a specific airport
 *
 * @param options.icao - The ICAO code of the desired airport
 * @param options.layer - The lowercase name of the desired layer
 * @param options.projection - The desired coordinate system for the resulting geoJSON
 * @param options.precision - Coordinates will be snapped to a grid with this spacing between lines
 * @returns An geoJSON feature collection containing features of the desired layer
 */
export default async function getAmdbLayer<L extends AmdbLayerName>({
  icao,
  projection,
  layer,
  precision,
}: {
  icao: string
  layer: L
  projection?: Projection
  precision?: number
}) {
  const result = await navigraphRequest
    .get<AmdbResult<L>[L]>(`${getAmdbApiRoot()}/${icao}/${layer}`, {
      params: {
        projection,
        precision,
      },
    })
    .catch((e: unknown) => Logger.err("Failed to fetch amdb layers. Reason:", isAxiosError(e) ? e.message : e))

  return result?.data || null
}
