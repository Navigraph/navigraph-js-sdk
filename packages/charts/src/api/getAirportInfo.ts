import { Logger } from "@navigraph/app";
import { isAxiosError, navigraphRequest } from "@navigraph/auth";
import { getAirportApiRoot } from "../constants";
import { AirportInfo } from "./types";

/** Fetches general, useful information about an airport such as fuel types, repairs, and more
 * @param options.icao - The ICAO code of an airport
 * @returns {AirportInfo} An object containing information about the airport
 */
export default async function getAirportInfo({ icao }: { icao: string }): Promise<AirportInfo | null> {
  const result = await navigraphRequest
    .get<AirportInfo>(`${getAirportApiRoot()}/${icao}`)
    .catch((e: unknown) =>
      Logger.err("Failed to fetch airport information. Reason:", isAxiosError(e) ? e.message : e)
    );
  return result?.data || null;
}
