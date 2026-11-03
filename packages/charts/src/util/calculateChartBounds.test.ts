import { NonGeoreferencedChartError } from "@navigraph/app"
import { describe, expect, test } from "vitest"
import { createChart } from "../testing"
import calculateChartBounds from "./calculateChartBounds"

describe("calculateChartBounds", () => {
  test("extends the planview coordinates out to the edges of the chart image", () => {
    // The planview is 64 px wide and tall and covers 8° in each direction: 0.125° per pixel.
    // Margins around it: 8 px left (1°), 24 px right (3°), 16 px top (2°), 32 px bottom (4°).
    const chart = createChart({
      is_georeferenced: true,
      width: 96,
      height: 112,
      bounding_boxes: {
        planview: {
          pixels: { x1: 8, y1: 80, x2: 72, y2: 16 },
          latlng: { lng1: 10, lat1: 50, lng2: 18, lat2: 58 },
        },
        insets: [],
      },
    })

    const bounds = calculateChartBounds(chart)

    expect(bounds).toEqual({
      sw: { lng: 9, lat: 46 },
      ne: { lng: 21, lat: 60 },
    })
  })

  test("throws NonGeoreferencedChartError for a chart without georeferencing", () => {
    const chart = createChart({ is_georeferenced: false, bounding_boxes: null })

    expect(() => calculateChartBounds(chart)).toThrow(NonGeoreferencedChartError)
  })
})
