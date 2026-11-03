import { describe, expect, test } from "vitest"
import { createChart, mockApiFailure, mockApiResponse } from "../testing"
import getChartImage from "./getChartImage"

describe("getChartImage", () => {
  const chart = createChart({
    image_day_url: "https://api.navigraph.com/v2/charts/ESSA/day.png",
    image_night_url: "https://api.navigraph.com/v2/charts/ESSA/night.png",
  })

  test("resolves with the image blob", async () => {
    const image = new Blob(["chart"], { type: "image/png" })
    mockApiResponse(image)

    const result = await getChartImage({ chart })

    expect(result).toBe(image)
  })

  test.for([
    { theme: "light", url: "https://api.navigraph.com/v2/charts/ESSA/day.png" },
    { theme: "dark", url: "https://api.navigraph.com/v2/charts/ESSA/night.png" },
  ] as const)("requests $url for the $theme theme", async ({ theme, url }) => {
    const request = mockApiResponse(new Blob())

    await getChartImage({ chart, theme })

    expect(request).toHaveBeenCalledWith(url, { responseType: "blob" })
  })

  test("uses the light theme by default", async () => {
    const request = mockApiResponse(new Blob())

    await getChartImage({ chart })

    expect(request).toHaveBeenCalledWith(chart.image_day_url, { responseType: "blob" })
  })

  test("resolves with null when the request fails", async () => {
    mockApiFailure(401)

    const result = await getChartImage({ chart })

    expect(result).toBeNull()
  })
})
