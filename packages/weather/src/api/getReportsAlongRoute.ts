import { Logger } from "@navigraph/app"
import { isAxiosError, navigraphRequest } from "@navigraph/auth"
import { Position } from "geojson"
import { getRouteApiRoot } from "../constants"
import { Metar, Taf } from "./types"

export default async function getReportsAlongRoute<T extends "metar" | "taf">(
  path: Position[],
  type: T,
  range?: number,
) {
  type ReportType = T extends "metar" ? Metar : T extends "taf" ? Taf : never

  const result = await navigraphRequest
    .get<ReportType[]>(getRouteApiRoot(), {
      params: {
        path: path.map(position => position.join(",")).join(";"),
        type,
        range,
      },
    })
    .catch((e: unknown) =>
      Logger.err("Failed to fetch weather reports along route. Reason:", isAxiosError(e) ? e.message : e),
    )

  return result?.data || null
}
