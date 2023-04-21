import { ChartTypeCode } from "./chartTypeCodes";

/**
 * A bounding box representation in pixels from the origin (top left) of the chart.
 *
 * **Note:** The first coordinate is the *bottom left* corner, the second
 * coordinate is the *top right* corner.
 */
export interface Pixels {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

/** The same as {@link Pixels}, but with geographical coordinates instead. */
export interface Latlng {
  lng1: number;
  lat1: number;
  lng2: number;
  lat2: number;
}

/**
 * World references for the "Map" part of the chart, containing the top-down route.
 * Can be used to accurately show the ownship location.
 */
export interface Planview {
  pixels: Pixels;
  latlng: Latlng;
}

export interface Inset {
  pixels: Pixels;
}

/**
 * A list of bounding boxes available for the chart. Can be used to make the chart
 * more interactive by exclusively showing certain features.
 *
 * **Note:** To the extent that it is possible, always keep the disclaimer
 * text visible - regardless of which bounding box is active.
 */
export interface BoundingBoxes {
  planview: Planview;
  insets: Inset[];
  profile?: Inset;
  minimums?: Inset;
  header?: Inset;
}

export type ChartCategory = "APT" | "REF" | "ARR" | "DEP" | "APP";

export type Chart = {
  /** @deprecated Use {@link Chart.image_day_url|image_day_url} instead */
  image_day: string;
  /** @deprecated Use {@link Chart.image_night_url|image_night_url} instead */
  image_night: string;
  /** @deprecated Use {@link Chart.thumb_day_url|thumb_day_url} instead */
  thumb_day: string;
  /** @deprecated Use {@link Chart.thumb_night_url|thumb_night_url} instead */
  thumb_night: string;
  icao_airport_identifier: string;
  id: string;
  category: ChartCategory;
  /** The type of chart, with higher granularity than {@link Chart.category category}. Can be used to facilitate more fine-grained filtering. */
  type_code: ChartTypeCode;
  precision_approach: boolean | null;
  index_number: string;
  name: string;
  revision_date: string;
  width: number;
  height: number;
  /** The procedures, if any, that is associated with this chart. */
  procedures: string[];
  /** The runways, if any, that is associated with this chart. */
  runways: string[];
  image_day_url: string;
  image_night_url: string;
  thumb_day_url: string;
  thumb_night_url: string;
} & (
  | { is_georeferenced: true; bounding_boxes: BoundingBoxes }
  | { is_georeferenced: false; bounding_boxes: null }
);

export interface ChartsIndexResponse {
  charts: Chart[];
}
