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

/**
 * Part of the aircraft surface movement area that is, or will be, under construction
 *
 * ConstructionAreas may overlap with all other elements, and with other ConstructionArea features
 */
export type ConstructionArea = AmdbFeature<
  {
    /**
     * Planned construction start date
     *
     * As of 2408 all pstdate entries are unknown **(0001-00-00)**
     *
     * Example: `2024-05-3`
     */
    pstdate: string
    /**
     * Planned construction end date
     *
     * As of 2408 all pendate entries are unknown **(0001-00-00)**
     *
     * Example: `2024-05-3`
     */
    pendate: string
    /**
     * Planned initial operational date
     *
     * As of 2408 all piocdate entries are unknown **(0001-00-00)**
     *
     * Example: `2024-05-3`
     */
    piocdate: string
  },
  FeatureType.ConstructionArea,
  Polygon
>

/**
 * Represents any enclosed bodies of water which intersect a 200m buffer around aircraft movement areas, and any adjacent major water bodies, only representing the parts of said major bodies which intersect a 5km buffer around the aircraft movement area
 */
export type Water = AmdbFeature<Record<string, never>, FeatureType.Water, Polygon>

/**
 * An area in an aerodrome movement area with a history or potential risk of collision or runway incursion, and where heightened attenion by pilots/drivers is necessary
 */
export type Hotspot = AmdbFeature<
  {
    /**
     * Identifier of the hotspot
     *
     * Example: `HS12`
     */
    idhot: string | null
  },
  FeatureType.Hotspot,
  Polygon
>

export * from "./helipads"
export * from "./runway"
export * from "./aprons"
export * from "./taxiways"
export * from "./types"
export * from "./verticalStructures"
