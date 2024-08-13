import { Logger } from "@navigraph/app"
import { isAxiosError, navigraphRequest } from "@navigraph/auth"
import { getAmdbApiRoot } from "../constants"
import { AmdbLayerName, AmdbResult, Projection } from "../types"

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
