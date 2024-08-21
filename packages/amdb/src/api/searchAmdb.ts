import { Logger } from "@navigraph/app"
import { isAxiosError, navigraphRequest } from "@navigraph/auth"
import { getAmdbApiRoot } from "../constants"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AerodromeReferencePoint, AmdbSearchResult } from "../types"

/**
 * Searches for airports with AMDB data based on a query string and returns some metadata about them
 *
 * @param query - All AMDB airports whose `idarpt`, `iata`, or `name` fields (from {@link AerodromeReferencePoint}) which **start** with this query string will be returned
 *
 * @returns A selection of properties from the {@link AerodromeReferencePoint} of the found airports, as well as the coordinates of said reference point
 */
export default async function searchAmdb(query: string) {
  const result = await navigraphRequest
    .get<AmdbSearchResult[]>(`${getAmdbApiRoot()}/search`, {
      params: {
        q: query,
      },
    })
    .catch((e: unknown) => Logger.err("Failed to search amdb. Reason:", isAxiosError(e) ? e.message : e))

  return result?.data || null
}
