import { Logger } from "@navigraph/app"
import { isAxiosError, navigraphRequest } from "@navigraph/auth"
import { FeatureCollection, Geometry } from "geojson"
import { getAvwxApiRoot } from "../../constants"
import { AVWXSource, AVWXSourceProperties } from "../types"

export default async function getAvwxReports<S extends AVWXSource>(sources: S[]) {
  const result = await navigraphRequest
    .get<FeatureCollection<Geometry, AVWXSourceProperties[S]>>(`${getAvwxApiRoot()}/combined`, {
      params: { sources: sources.join(",") },
    })
    .catch((e: unknown) => Logger.err("Failed to AVWX reports. Reason:", isAxiosError(e) ? e.message : e))

  return result?.data || null
}
