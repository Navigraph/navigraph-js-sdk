import { Logger } from "@navigraph/app"
import { isAxiosError, navigraphRequest } from "@navigraph/auth"
import { Position } from "geojson"
import { getWeatherApiRoot } from "../constants"
import { Metar, Taf } from "./types"

/**
 * Queries all TAFs or METARs within a certain range of a geographic route issued within approximately the last 10 hours
 * @param path - List of coordinates making up the query route
 * @param type - The type of report to query, either `'metar'` or `'taf'`
 * @returns - An array of TAF or METAR objects parsed from the raw reports using {@link https://www.npmjs.com/package/metar-taf-parser metar-taf-parser}
 */
export default async function getReportsAlongRoute<T extends "metar" | "taf">(
  path: Position[],
  type: T,
  range?: number,
) {
  type ReportType = T extends "metar" ? Metar : T extends "taf" ? Taf : never

  const result = await navigraphRequest
    .get<ReportType[]>(`${getWeatherApiRoot()}/route`, {
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
