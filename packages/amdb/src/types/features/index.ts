/**
 * Docstrings are based upon descriptions from `ER-009 - Guidance material for generation of Aerodrome mapping data`
 */

import { Point } from "geojson"
import { FeatureType } from "../enums"
import { AmdbFeature } from "./types"

export type AerodromeReferencePoint = AmdbFeature<
  {
    /**
     * Name of aerodrome.
     *
     * Example: `Christchurch Intl`
     */
    name: string
    /**
     * IATA aerodrome location indicator
     *
     * Example: `CHC`
     */
    iata: string | null
    /**
     * Orhometric elevation of the airport in **meters**
     *
     * Example: `37.49`
     */
    elev: number
  },
  FeatureType.AerodromeReferencePoint,
  Point
>

export * from "./helipads"
export * from "./runway"
