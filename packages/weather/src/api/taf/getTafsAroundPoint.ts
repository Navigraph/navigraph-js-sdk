import { Logger } from "@navigraph/app"
import { isAxiosError, navigraphRequest } from "@navigraph/auth"
import { getTafApiRoot } from "../../constants"
import { Taf } from "../types"

export default async function getTafsAroundPoint(latitude: number, longitude: number, radius?: number, limit?: number) {
  const result = await navigraphRequest
    .get<Taf[]>(`${getTafApiRoot()}/around/${latitude}/${longitude}`, {
      params: {
        radius,
        limit,
      },
    })
    .catch((e: unknown) =>
      Logger.err(`Failed to fetch TAFs around (${latitude}, ${longitude}). Reason:`, isAxiosError(e) ? e.message : e),
    )

  return result?.data || null
}
