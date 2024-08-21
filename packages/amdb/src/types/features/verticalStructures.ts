import { LineString, Point, Polygon } from "geojson"
import {
  Conformance,
  FeatureType,
  LineStructureType,
  PointStructureType,
  PolygonalStructureType,
  StructureMaterial,
} from "../enums"
import { AmdbFeature } from "./types"

/**
 * Polygonal structure of a defined vertical extent that is located within 90m of a runway centerline or 50m from other parts of aerodrome movement areas
 */
export type VerticalPolygonalStructure = AmdbFeature<
  {
    /**
     * Type of the structure
     *
     * Example: `NonTerminalBuilding: 4`
     */
    plysttyp: PolygonalStructureType

    /**
     * Maximum height of the structure measured in **meters**
     *
     * Example: `34.32`
     */
    height: number

    /**
     * Maximum elevation of the top of the structure measured in **meters**
     *
     * Example: `103.02`
     */
    elev: number

    /**
     * Predominant surface material of the structure
     *
     * Example: `Metal: 2`
     */
    material: StructureMaterial

    /**
     * Name/identifier of the structure
     *
     * Example: `Terminal 5B`
     */
    ident: string | null
  },
  FeatureType.VerticalPolygonalStructure,
  Polygon
>

/**
 * Point structure of a defined vertical extent that is located within 90m of a runway centerline or 50m from other parts of aerodrome movement areas
 *
 * The geographical point should be the center of the corresponding real-world object
 */
export type VerticalPointStructure = AmdbFeature<
  {
    /**
     * Type of the structure
     *
     * Example: `LightPole: 6`
     */
    pntsttyp: PointStructureType

    /**
     * Whether the marking of this structure is on conformance with `ICAO Annex 14, Chapter 6.2`
     *
     * Example: `Conformant: 1`
     */
    marking: Conformance

    /**
     * Whether the lighting of this structure is on conformance with `ICAO Annex 14, Chapter 6.2`
     *
     * Example: `Conformant: 1`
     */
    lighting: Conformance

    /**
     * Radius of circle around center of obstacle including body of obstacle and associated structures including guidwires
     *
     * As of 2408 there is only one point structure with a defined radius value, and it's at Boeing Field... what are the odds
     *
     * Example: `3.00`
     */
    radius: number

    /**
     * Maximum height of the structure measured in **meters**
     *
     * Example: `34.32`
     */
    height: number

    /**
     * Maximum elevation of the top of the structure measured in **meters**
     *
     * Example: `103.02`
     */
    elev: number

    /**
     * Predominant surface material of the structure
     *
     * Example: `Metal: 2`
     */
    material: StructureMaterial
  },
  FeatureType.VerticalPointStructure,
  Point
>

/**
 * Line structure of a defined vertical extent that is located within 90m of a runway centerline or 50m from other parts of aerodrome movement areas
 *
 * The geographical line should be along the center of the corresponding real-world object
 */
export type VerticalLineStructure = AmdbFeature<
  {
    /**
     * Type of the structure
     *
     * Example: `CableRailway: 2`
     */
    linsttyp: LineStructureType

    /**
     * Whether the marking of this structure is on conformance with `ICAO Annex 14, Chapter 6.2`
     *
     * Example: `Conformant: 1`
     */
    marking: Conformance

    /**
     * Whether the lighting of this structure is on conformance with `ICAO Annex 14, Chapter 6.2`
     *
     * Example: `Conformant: 1`
     */
    lighting: Conformance

    /**
     * Radius of circle around center of obstacle including body of obstacle and associated structures including guidwires
     *
     * As of 2408 there is only one point structure with a defined radius value, and it's at Boeing Field... what are the odds
     *
     * Example: `3.00`
     */
    radius: number

    /**
     * Maximum height of the structure measured in **meters**
     *
     * Example: `34.32`
     */
    height: number

    /**
     * Maximum elevation of the top of the structure measured in **meters**
     *
     * Example: `103.02`
     */
    elev: number

    /**
     * Predominant surface material of the structure
     *
     * Example: `Metal: 2`
     */
    material: StructureMaterial
  },
  FeatureType.VerticalLineStructure,
  LineString
>
