import { describe, expect, test } from "vitest"
import { mockApiFailure, mockApiResponse } from "../testing"
import getAirportInfo from "./getAirportInfo"
import { AirportInfo } from "./types"

describe("getAirportInfo", () => {
  test("resolves with the information for the airport", async () => {
    const arlanda = { icao_airport_identifier: "ESSA", name: "ARLANDA" } as AirportInfo
    mockApiResponse(arlanda)

    const result = await getAirportInfo({ icao: "ESSA" })

    expect(result).toEqual(arlanda)
  })

  test("requests the airport by its ICAO code", async () => {
    const request = mockApiResponse({})

    await getAirportInfo({ icao: "ESSA" })

    expect(request).toHaveBeenCalledWith("https://api.navigraph.com/v2/airport/ESSA")
  })

  test("resolves with null when the request fails", async () => {
    mockApiFailure(401)

    const result = await getAirportInfo({ icao: "ESSA" })

    expect(result).toBeNull()
  })
})
