import { Logger } from "@navigraph/app"
import { isAxiosError, navigraphRequest } from "@navigraph/auth"
import { getAmdbApiRoot } from "../constants"
import { AmdbSearchResult } from "../types"

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
