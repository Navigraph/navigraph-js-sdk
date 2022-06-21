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

export interface Chart {
  image_day: string;
  image_night: string;
  thumb_day: string;
  thumb_night: string;
  icao_airport_identifier: string;
  id: string;
  category: string;
  precision_approach?: boolean;
  index_number: string;
  name: string;
  revision_date: string;
  is_georeferenced: boolean;
  width: number;
  height: number;
  bounding_boxes: BoundingBoxes;
  procedures: string[];
  runways: string[];
  image_day_url: string;
  image_night_url: string;
  thumb_day_url: string;
  thumb_night_url: string;
}

export interface ChartsIndexResponse {
  charts: Chart[];
}
