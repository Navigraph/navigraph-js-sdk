import { NonGeoreferencedChartError } from "@navigraph/app";
import calculateChartBounds from "./calculateChartBounds";
import { Chart } from "../api/types";

// prettier-ignore
const georeferencedChart = {
  is_georeferenced: true,
  width: 2500,
  height: 1517,
  bounding_boxes: {
    planview: {
      pixels: { x1: 58, y1: 1447, x2: 2431, y2: 58 },
      latlng: { lng1: 16.655056, lat1: 59.516333, lng2: 18.708056, lat2: 60.122111 },
    },
  },
} as Chart;

const nonGeoreferencedChart = {
  ...georeferencedChart,
  is_georeferenced: false,
} as Chart;

describe("Chart Bounds Calculation", () => {
  it("given a georeferenced chart, calculates chart bounds correctly", () => {
    expect(calculateChartBounds(georeferencedChart)).toEqual({
      ne: { lat: 60.147406265658745, lng: 18.76775132237674 },
      sw: { lat: 59.48580423110152, lng: 16.60487732321955 },
    });
  });

  it("given a non-georeferenced chart, throws a NonGeoreferencedChartError", () => {
    expect(() => calculateChartBounds(nonGeoreferencedChart)).toThrowError(NonGeoreferencedChartError);
  });
});
