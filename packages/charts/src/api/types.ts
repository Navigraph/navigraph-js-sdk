import { ChartTypeCode } from "./chartTypeCodes"

/**
 * A bounding box representation in pixels from the origin (top left) of the chart.
 *
 * **Note:** The first coordinate is the *bottom left* corner, the second
 * coordinate is the *top right* corner.
 */
export interface Pixels {
  x1: number
  y1: number
  x2: number
  y2: number
}

/** The same as {@link Pixels}, but with geographical coordinates instead. */
export interface Latlng {
  lng1: number
  lat1: number
  lng2: number
  lat2: number
}

/**
 * World references for the "Map" part of the chart, containing the top-down route.
 * Can be used to accurately show the ownship location.
 */
export interface Planview {
  pixels: Pixels
  latlng: Latlng
}

export interface Inset {
  pixels: Pixels
}

/**
 * A list of bounding boxes available for the chart. Can be used to make the chart
 * more interactive by exclusively showing certain features.
 *
 * **Note:** To the extent that it is possible, always keep the disclaimer
 * text visible - regardless of which bounding box is active.
 */
export interface BoundingBoxes {
  planview: Planview
  insets: Inset[]
  profile?: Inset
  minimums?: Inset
  header?: Inset
}

export type ChartCategory = "APT" | "REF" | "ARR" | "DEP" | "APP"

export type Chart = {
  /** @deprecated Use {@link Chart.image_day_url|image_day_url} instead */
  image_day: string
  /** @deprecated Use {@link Chart.image_night_url|image_night_url} instead */
  image_night: string
  /** @deprecated Use {@link Chart.thumb_day_url|thumb_day_url} instead */
  thumb_day: string
  /** @deprecated Use {@link Chart.thumb_night_url|thumb_night_url} instead */
  thumb_night: string
  icao_airport_identifier: string
  id: string
  category: ChartCategory
  /** The type of chart, with higher granularity than {@link Chart.category category}. Can be used to facilitate more fine-grained filtering. */
  type_code: ChartTypeCode
  precision_approach: boolean | null
  index_number: string
  name: string
  revision_date: string
  width: number
  height: number
  /** The procedures, if any, that is associated with this chart. */
  procedures: string[]
  /** The runways, if any, that is associated with this chart. */
  runways: string[]
  image_day_url: string
  image_night_url: string
  thumb_day_url: string
  thumb_night_url: string
} & ({ is_georeferenced: true; bounding_boxes: BoundingBoxes } | { is_georeferenced: false; bounding_boxes: null })

export interface ChartsIndexResponse {
  charts: Chart[]
}

export type Fuel =
  | "73 Octane"
  | "80-87 Octane"
  | "100 low lead (LL) octane"
  | "100-130 octane"
  | "115-145 octane"
  | "Mogas"
  | "JET"
  | "JET A"
  | "JET A-1"
  | "Jet A+"
  | "JET B"
  | "JET 4"
  | "JET 5"

export type OxygenService = "High Pressure" | "Low Pressure" | "High Pressure Bottle" | "Low Pressure Bottle"

export type Repairs = "Minor Engine" | "Major Airframe" | "Major Engine"

export interface AirportInfo {
  icao_airport_identifier: string
  iata_airport_designator: string
  longest_runway: number
  latitude: number
  longitude: number
  magnetic_variation: number
  elevation: number
  name: string
  city: string
  state_province_code: string
  state_province_name: string
  country_code: string
  country_name: string
  /** The type of fuel available at the airport or heliport. Empty means unknown. */
  fuel_types: Fuel[]
  /** The type of oxygen servicing available at the airport or heliport. Empty means unknown.  */
  oxygen: OxygenService[]
  /** The type of fuel available at the airport or heliport. Empty means unknown. */
  repairs: Repairs[]
  /**
   * Indicates if landing fees are charged for private or non-revenue producing aircraft.
   *
   * **Note:** These fees will vary from no charge for aircraft below certain weight – no charge if fuel purchased – to charges for all landing aircraft.
   * This field provides only a true/false indication, no specific details on what aircraft types must pay under what conditions are provided.
   */
  landing_fee: boolean
  /** Indicates if the airport/heliport is equipped with JASU and if that equipment is available to a public user of the airport/heliport */
  jet_starting_unit: boolean
  /** Indicates if the airport supports precision approaches */
  precision_airport: boolean
  /** Indicates if the airport has Beacon Lights. Beacon Lights are normally provided at any airport/heliport intended for use at night. */
  beacon: boolean
  /** Indicates the availability of a government customs facility at the airport */
  customs: boolean
  airport_type: string
  time_zone: string
  icao_code: string
  daylight_savings: boolean
  /** The Local Horizontal Reference Datum with which the Airport Reference Point (ARP) is associated */
  datum_code: string
  revision_date: string
  parsed_cycle: string
  std_charts: boolean
  cao_charts: boolean
  vfr_charts: boolean
}
