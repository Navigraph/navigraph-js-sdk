import { Logger } from "@navigraph/app"
import { isAxiosError, navigraphRequest } from "@navigraph/auth"
import { getAmdbApiRoot } from "../constants"
import { AmdbLayerName, AmdbResult, Projection } from "../types"

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
