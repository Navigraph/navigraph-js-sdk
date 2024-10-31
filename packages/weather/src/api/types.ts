import { Feature, FeatureCollection, GeoJsonProperties, Geometry } from "geojson"
import { Forecast as IForecast, IForecastContainer, IMetarDated } from "metar-taf-parser"

type Coordinates = {
  latitude: number | null
  longitude: number | null
}

type ReportType = "metar" | "forecast"

export enum FlightCategory {
  VFR = "VFR",
  MVFR = "MVFR",
  IFR = "IFR",
  LIFR = "LIFR",
}

export type Summary<T extends ReportType> = {
  wind?: string
  windShear?: string
  clouds?: string
  visibility?: string
  ceiling?: string
  conditions?: string
  remarks?: string
} & (T extends "forecast"
  ? {
      title?: string
      period?: string
      turbulence?: string
      icing?: string
    }
  : object)

type WxExtensions<T extends ReportType> = {
  flightCategory: FlightCategory | null
  summary: Summary<T>
}

export type Metar = IMetarDated & WxExtensions<"metar"> & Coordinates

export type Forecast = IForecast & WxExtensions<"forecast">

export type Taf = Omit<IForecastContainer, "forecast"> & {
  forecast: Forecast[]
} & Coordinates

export type Severity = "NONE" | "LGT" | "MOD" | "SVR"

export interface ISIGMETProperties {
  source: "ISIGMET"
  raw: string
  icaoId: string
  firId: string
  firName: string
  seriesId: string
  hazard: "TS" | "TSGR" | "TURB" | "LLWS" | "MTW" | "ICING" | "TC" | "SS" | "DS" | "VA" | "RDOACT CLD"
  validTimeFrom: string
  validTimeTo: string
  qualifier: string // TODO: Find more narrow type
  geom: string
  coords: string
  /** Lowest level SIGMET is valid in feet */
  base?: number
  /** Highest level SIGMET is valid in feet */
  top?: number
  /** Direction of movement of hazard in degrees */
  dir?: string
  /** Speed of movement of hazard in knots */
  spd?: string
  chng?: "NC" | "WKN" | "INTSF"
}

export interface SIGMETProperties {
  source: "SIGMET"
  raw: string
  icaoId: string
  airSigmetType: "OUTLOOK" | "SIGMET"
  alphaChar: string
  hazard: "CONVECTIVE" | "TURB" | "ICING" | "IFR" | "MTN OBSCN" | "ASH"
  validTimeFrom: string
  validTimeTo: string
  severity: Severity
  /** Lowest level SIGMET is valid in feet */
  altitudeLow1?: number
  /** Secondary lowest level SIGMET is valid in feet */
  altitudeLow2?: number
  /** Highest level SIGMET is valid in feet */
  altitudeHi1?: number
  /** Secondary highest level SIGMET is valid in feet */
  altitudeHi2?: number
}

export interface CWAProperties {
  source: "CWA"
  raw: string
  cwsu: string
  name: string
  seriesId: string
  validTimeFrom: string
  validTimeTo: string
  hazard: "TS" | "TURB" | "ICE" | "IFR" | "PCPN"
  qualifier: string // TODO: Find more narrow type
  /** Lowest level the CWA is valid in feet */
  base?: number
  /** Highest level the CWA is valid in feet */
  top?: number
}

export interface AIRMETProperties {
  source: "AIRMET"
  raw: string
  hazard: "TURB" | "ICING" | "IFR" | "MTN OBSCN"
  validTimeFrom: string
  validTimeTo: string
  severity: Severity
  icaoId?: string
  /** Lowest level SIGMET is valid in feet */
  altitudeLow1?: number
  /** Secondary lowest level SIGMET is valid in feet */
  altitudeLow2?: number
  /** Highest level SIGMET is valid in feet */
  altitudeHi1?: number
  /** Secondary highest level SIGMET is valid in feet */
  altitudeHi2?: number
  region?: string
  reg_name?: string
}

export type GAIRMETProperties = {
  source: "GAIRMET"
  product: "SIERRA" | "TANGO" | "ZULU"
  hazard: "TURB-HI" | "TURB-LO" | "ICE" | "IFR" | "MT_OBSC" | "SFC_WIND" | "LLWS" | "FZLVL"
  issueTime: string
  validTime: string
  forecast: "0" | "3" | "6" | "9" | "12"
  /** The reason for the forecast, similar to a raw format */
  dueTo?: string
  severity?: Severity
  /** Lowest level G-AIRMET is valid in 100s feet, or "FZL" if freezing level is defined */
  base?: string
  /** Highest level G-AIRMET is valid in 100s feet */
  top?: string
} & (
  | {
      hazard: "FZLVL"
      /** Level at which G-AIRMET is valid in 100s feet */
      level: string
    }
  | {
      base: "FZL"
      top: string
      /** Lowest freezing level in 100s feet */
      fzlbase: string
      /** Highest freezing level in 100s feet */
      fzltop: string
    }
  | object
)

export interface AIREPProperties {
  source: "AIREP"
  raw: string
  airepType: string
  /** Observed weather: -RA, -SN, TS, etc */
  wxString?: string
  icaoId: string
  /** ISO 8601 formatted date and time when AIREP/PIREP issued */
  obsTime: string
  /** Aircraft type or flight number */
  acType: string
  /** Temperature in Celsius  */
  temp?: string
  /** Wind direction in degrees  */
  wdir?: string
  /** Wind speed in knots */
  wspd?: string

  cloudCvg1?: "CLR" | "SCT" | "BKN" | "OVC"
  /** Cloud layer 1 base in 100s feet */
  cloudBas1?: string
  /** Cloud layer 1 top in 100s feet */
  cloudTop1?: string
  cloudCvg2?: "CLR" | "SCT" | "BKN" | "OVC"
  /** Cloud layer 2 base in 100s feet */
  cloudBas2?: string
  /** Cloud layer 2 top in 100s feet */
  cloudTop2?: string

  /** Flight level in 100s of feet */
  fltlvl: string
  fltlvlType: "GRND" | "DURC" | "DURD" | "CRUISE" | "OTHER" | "UNKN"

  tbInt1?: "NEG" | "SMTH-LGT" | "LGT" | "LGT-MOD" | "MOD" | "MOD-SEV" | "SEV" | "SEV-EXTM" | "EXTM"
  tbType1?: "CAT" | "CHOP" | "LLWS" | "MWAVE"
  tbFreq1?: "ISOL" | "OCNL" | "CONT"

  icgInt1?: "NEG" | "NEGclr" | "TRC" | "TRC-LGT" | "LGT" | "LGT-MOD" | "MOD" | "MOD-SEV" | "HVY" | "SEV"
  icgType1?: "RIME" | "CLEAR" | "MIXED"

  brkAction?: "GOOD" | "GOOD-MED" | "MED" | "MED-POOR" | "POOR" | "NIL"
}

export interface METARProperties {
  source: "METAR"
  id: string
  site: string
  prior: number
  obsTime: string
  raw: string
  temp?: number
  dewp?: number
  wspd?: number
  wdir?: number
  cover?: string
  cldCvg1?: string
  visib?: number
  fltcat?: "VFR" | "MVFR" | "IFR" | "LIFR"
  altim?: number
  slp?: number
  ceil?: number
  cldBas1?: string
  wx?: string
  wgst?: number
  cldCvg2?: string
  cldBas2?: string
  cldCvg3?: string
  cldBas3?: string
  cldCvg4?: string
  cldBas4?: string
}

type AnyAVWXProperties =
  | ISIGMETProperties
  | SIGMETProperties
  | CWAProperties
  | AIRMETProperties
  | GAIRMETProperties
  | AIREPProperties
  | METARProperties

export type AVWXSource = AnyAVWXProperties["source"]

export interface AVWXSourceProperties extends Record<AVWXSource, GeoJsonProperties> {
  SIGMET: SIGMETProperties
  ISIGMET: ISIGMETProperties
  CWA: CWAProperties
  AIRMET: AIRMETProperties
  GAIRMET: GAIRMETProperties
  AIREP: AIREPProperties
  METAR: METARProperties
}

export type AVWXFeature<T extends AVWXSource = AVWXSource> = Feature<Geometry, AVWXSourceProperties[T]>
export type SourceFeatureCollection<S extends AVWXSource> = FeatureCollection<Geometry, AVWXSourceProperties[S]>

export const AVWX_SOURCES: AVWXSource[] = ["AIREP", "AIRMET", "CWA", "GAIRMET", "ISIGMET", "METAR", "SIGMET"]
