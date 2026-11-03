import { describe, expect, test } from "vitest"
import { createChart, mockApiFailure, mockApiResponse } from "../testing"
import getChartsIndex from "./getChartsIndex"

describe("getChartsIndex", () => {
  test("resolves with the charts for the airport", async () => {
    const charts = [createChart({ id: "ESSA01P1" }), createChart({ id: "ESSA01P2" })]
    mockApiResponse({ charts })

    const result = await getChartsIndex({ icao: "ESSA" })

    expect(result).toEqual(charts)
  })

  test("requests standard IFR charts by default", async () => {
    const request = mockApiResponse({ charts: [] })

    await getChartsIndex({ icao: "ESSA" })

    expect(request).toHaveBeenCalledWith("https://api.navigraph.com/v2/charts/ESSA", {
      params: { version: "STD", rules: "IFR" },
    })
  })

  test("requests the given chart version and flight rules", async () => {
    const request = mockApiResponse({ charts: [] })

    await getChartsIndex({ icao: "ESSA", version: "CAO", rules: "VFR" })

    expect(request).toHaveBeenCalledWith("https://api.navigraph.com/v2/charts/ESSA", {
      params: { version: "CAO", rules: "VFR" },
    })
  })

  test("resolves with null when the request fails", async () => {
    mockApiFailure(401)

    const result = await getChartsIndex({ icao: "ESSA" })

    expect(result).toBeNull()
  })
})
