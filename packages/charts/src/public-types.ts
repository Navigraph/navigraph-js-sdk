export interface Pixels {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export interface Latlng {
  lng1: number;
  lat1: number;
  lng2: number;
  lat2: number;
}

export interface Planview {
  pixels: Pixels;
  latlng: Latlng;
}

export interface Inset {
  pixels: Pixels;
}

export interface BoundingBoxes {
  planview: Planview;
  insets: Inset[];
}

export type Chart = {
  image_day: string;
  image_night: string;
  thumb_day: string;
  thumb_night: string;
  icao_airport_identifier: string;
  id: string;
  category: string;
  precision_approach: boolean | null;
  index_number: string;
  name: string;
  revision_date: string;
  width: number;
  height: number;
  procedures: string[];
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
