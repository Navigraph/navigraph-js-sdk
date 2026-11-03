import { navigraphRequest } from "@navigraph/auth"
import { vi } from "vitest"
import { ChartTypeCode } from "./api/chartTypeCodes"
import { Chart } from "./api/types"

/** Builds a non-georeferenced ESSA chart. Override the fields that matter to the test. */
export function createChart(overrides: Partial<Chart> = {}): Chart {
  return {
    image_day: "essa01p1_d.png",
    image_night: "essa01p1_n.png",
    thumb_day: "essa01p1_thumb_d.png",
    thumb_night: "essa01p1_thumb_n.png",
    icao_airport_identifier: "ESSA",
    id: "ESSA01P1",
    category: "APT",
    type_code: "P" as ChartTypeCode,
    precision_approach: null,
    index_number: "10-1P1",
    name: "AIRPORT BRIEFING (GEN CONTD)",
    revision_date: "20220204",
    width: 1519,
    height: 2500,
    procedures: [],
    runways: [],
    image_day_url: "https://api.navigraph.com/v2/charts/ESSA/essa01p1_d.png",
    image_night_url: "https://api.navigraph.com/v2/charts/ESSA/essa01p1_n.png",
    thumb_day_url: "https://api.navigraph.com/v2/charts/ESSA/essa01p1_thumb_d.png",
    thumb_night_url: "https://api.navigraph.com/v2/charts/ESSA/essa01p1_thumb_n.png",
    is_georeferenced: false,
    bounding_boxes: null,
    ...overrides,
  } as Chart
}

type Response = Awaited<ReturnType<typeof navigraphRequest.get>>

/** Makes every Navigraph API request succeed with `data`. Returns the spy so tests can inspect the requests. */
export function mockApiResponse(data: unknown) {
  return vi.spyOn(navigraphRequest, "get").mockResolvedValue({ status: 200, data } as Response)
}

/** Makes every Navigraph API request fail like an Axios request would, and silences the resulting error log. */
export function mockApiFailure(status: number) {
  vi.spyOn(console, "error").mockImplementation(() => undefined)

  return vi.spyOn(navigraphRequest, "get").mockRejectedValue({
    isAxiosError: true,
    message: `Request failed with status code ${status}`,
    response: { status },
  })
}
