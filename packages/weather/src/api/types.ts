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
