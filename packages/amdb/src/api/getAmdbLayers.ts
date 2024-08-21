import { Logger } from "@navigraph/app"
import { isAxiosError, navigraphRequest } from "@navigraph/auth"
import { getAmdbApiRoot } from "../constants"
import { AmdbLayerName, AmdbResult, Projection } from "../types"

/**
 * Fetches all layers, specific layers, or all layers minus some set of layers from the AMDB for a specific airport
 *
 * @param options.icao - The ICAO code of the desired airport
 * @param options.include - List of layers to include in the response. If this is not specified, all layers will be returned (minus those specified in `options.exclude`)
 * @param options.exclude - List of layers to exclude from the response. This will only apply if `options.include` is not specified
 * @param options.projection - The desired coordinate system for the resulting geoJSON
 * @param options.precision - Coordinates will be snapped to a grid with this spacing between lines
 * @returns An record mapping lowercase layer names to feature collections containing the features from that layer
 */
export default async function getAmdbLayers<
  I extends AmdbLayerName[] | undefined = undefined,
  E extends AmdbLayerName[] | undefined = undefined,
>({
  icao,
  include,
  exclude,
  projection,
  precision,
}: {
  icao: string
  include?: I
  exclude?: E
  projection?: Projection
  precision?: number
}) {
  type Result = AmdbResult<
    I extends AmdbLayerName[]
      ? I[number]
      : E extends AmdbLayerName[]
      ? Exclude<AmdbLayerName, E[number]>
      : AmdbLayerName
  >

  const result = await navigraphRequest
    .get<Result>(`${getAmdbApiRoot()}/${icao}`, {
      params: {
        include: include?.join(","),
        exclude: exclude?.join(","),
        projection,
        precision,
      },
    })
    .catch((e: unknown) => Logger.err("Failed to fetch amdb layers. Reason:", isAxiosError(e) ? e.message : e))

  return result?.data || null
}
