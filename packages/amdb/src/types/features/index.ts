/**
 * Docstrings are based upon descriptions from `ER-009 - Guidance material for generation of Aerodrome mapping data` or `ED-99D - User requirements for Aerodrome Mapping Information`
 */

import { Point, Polygon } from "geojson"
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

/**
 * Designated part of an aerodrome surface where a specific frequency is required by air traffic control or ground control
 *
 * The geometry represents the region in which the frequency is to be used
 *
 * FrequencyAreas can overlap
 */
export type FrequencyArea = AmdbFeature<
  {
    /**
     * Represents the primary frequency used in the FrequencyArea, measured in **MegaHertz**
     *
     * Values will be within the domain `[117.975, 136.000]` except for default values as described in the README in `packages/amdb`
     *
     * Example: `123.000`
     */
    frq: number

    /**
     * The name of the service or station assigned to the primary frequency
     *
     * Example: `Auckland Apron`
     */
    station: string | null
  },
  FeatureType.FrequencyArea,
  Polygon
>

export * from "./helipads"
export * from "./runway"
