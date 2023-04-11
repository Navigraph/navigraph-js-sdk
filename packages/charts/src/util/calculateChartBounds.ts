import { NonGeoreferencedChartError } from "@navigraph/app";
import { Chart } from "../api/types";

type LngLat = {
  lng: number;
  lat: number;
};

interface Bounds {
  /** The coordinates of the south-west corner of the chart */
  sw: LngLat;
  /** The coordinates of the north-east corner of the chart */
  ne: LngLat;
}

/**
 *  Calculates the bounds to fit the chart image to in order for the
 *  georeferenced part to correctly align with the real world.
 */
export default function calculateChartBounds(chart: Chart): Bounds {
  if (!chart.is_georeferenced) {
    throw new NonGeoreferencedChartError(chart.index_number);
  }

  const planview = chart.bounding_boxes.planview;
  const { height, width } = chart;

  const longDegreesPerPixel =
    Math.abs(planview.latlng.lng2 - planview.latlng.lng1) / (planview.pixels.x2 - planview.pixels.x1);
  const latDegreesPerPixel =
    Math.abs(planview.latlng.lat2 - planview.latlng.lat1) / (planview.pixels.y1 - planview.pixels.y2);

  const dYLowerDegrees = (height - planview.pixels.y1) * latDegreesPerPixel;
  const dYUpperDegrees = planview.pixels.y2 * latDegreesPerPixel;

  const dXLeftHandDegrees = planview.pixels.x1 * longDegreesPerPixel;
  const dXRightHandDegrees = Math.abs(width - planview.pixels.x2) * longDegreesPerPixel;

  const sw = {
    lng: planview.latlng.lng1 - dXLeftHandDegrees,
    lat: planview.latlng.lat1 - dYLowerDegrees,
  };

  const ne = {
    lng: planview.latlng.lng2 + dXRightHandDegrees,
    lat: planview.latlng.lat2 + dYUpperDegrees,
  };

  return {
    sw,
    ne,
  };
}
