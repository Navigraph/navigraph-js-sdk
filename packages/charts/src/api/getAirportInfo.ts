import { Logger } from "@navigraph/app";
import { navigraphRequest, isAxiosError } from "@navigraph/auth";
import { getChartsApiRoot } from "../constants";
import { AirportInfo } from "./types";

/** Fetches general, useful information about an airport such as fuel types, repairs, and more
 * @param options.icao - The ICAO code of an airport
 * @returns {AirportInfo} An object containing information about the airport
 */
export default async function getAirportInfo({ icao }: { icao: string }): Promise<AirportInfo | null> {
  const result = await navigraphRequest
    .get<AirportInfo>(`${getChartsApiRoot()}/${icao}/airport`)
    .catch((e: unknown) =>
      Logger.err("Failed to fetch airport information. Reason:", isAxiosError(e) ? e.message : e)
    );
  return result?.data || null;
}
