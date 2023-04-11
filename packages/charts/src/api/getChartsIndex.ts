import { Logger } from "@navigraph/app";
import { navigraphRequest, isAxiosError } from "@navigraph/auth";
import { getChartsApiRoot } from "../constants";
import { Chart, ChartsIndexResponse } from "./types";

/** Fetches an index of available charts for a specified airport
 * @param options.icao - The ICAO code of an airport
 * @returns {Chart[]} A list of chart objects
 */
export default async function getChartsIndex({ icao }: { icao: string }): Promise<Chart[] | null> {
  const result = await navigraphRequest
    .get<ChartsIndexResponse>(`${getChartsApiRoot()}/${icao}`)
    .catch((e: unknown) =>
      Logger.err("Failed to fetch charts index. Reason:", isAxiosError(e) ? e.message : e)
    );
  return result?.data?.charts || null;
}
