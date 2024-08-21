import { LineString, Polygon } from "geojson"
import {
  BridgeType,
  FeatureType,
  GroundSurfaceType,
  LineColor,
  LineDirection,
  LineStyle,
  Status,
  StopbarCategory,
} from "../enums"
import { AmdbFeature } from "./types"

/**
 * Surface of a Taxiway
 *
 * Taxiway elements do not include taxiway shoulders and aircraft parking/stand areas
 *
 * A TaxiwayElement should be limited by the outer side of the taxiway edge marking
 *
 * Taxiway elements are not divided by surface type
 */
export type TaxiwayElement = AmdbFeature<
  {
    /**
     * Object identifier **(not unique)**
     *
     * Represents the name of the taxiway segment. If two or more taxiways intersect, their intersection should be a seperate TaxiwayElement whose `idlin` will come from the predominant taxiway. If the intersection has a specific name, the `idlin` should be that
     *
     * Example: `A5`
     */
    idlin: string | null

    /**
     * The name of the apron on which this taxiway is located, if any
     *
     * Example: `Terminal Ramp`
     */
    idapron: string | null

    /**
     * Generic surface type of the taxiway
     *
     * Example: `Asphalt: 2`
     */
    gsurftype: GroundSurfaceType

    /**
     * Indicates whether the taxiway is a bridge, and if so, what kind of bridge it is
     *
     * Example: `Overpass: 2`
     */
    bridge: BridgeType

    /**
     * Weight bearing capability of the surface
     *
     * Encoded as `Airport classification number - pavement classification number`, as specified in ICAO Annex 14, Chapter 2.6
     *
     * Example: `PCN72/F/B/X/T`
     */
    pcn: string | null

    /**
     * Usage restriction (prohibited) for specific aircraft type according to `ICAO-ACN (ICAO-DOC. 8643)`
     *
     * Encoded as aircraft type according to ICAO-ACN. If there is more than one aircraft-type restriction, the different types should be divided by a `.`
     *
     * Example: `B744.A380`
     */
    restacn: string | null

    /**
     * Permanent state of feature (exceeding the AIRAC-cycle of 56 days)
     *
     * Non-permanent closures or outages of less than 56 days are not adressed in the airport maping database but will be addressed via NOTAMS
     *
     * Example: `Open: 1`
     */
    status: Status
  },
  FeatureType.TaxiwayElement,
  Polygon
>

/**
 * An area adjacent to the edge of a taxiway so prepared as to provide a transition between the pavement and the adjacent surface
 *
 * The taxiway shoulder polygon should exclude the taxiway edge marking
 */
export type TaxiwayShoulder = AmdbFeature<
  {
    /**
     * Permanent state of feature (exceeding the AIRAC-cycle of 56 days)
     *
     * Non-permanent closures or outages of less than 56 days are not adressed in the airport maping database but will be addressed via NOTAMS
     *
     * Example: `Open: 1`
     */
    status: Status

    /**
     * Generic surface type of the taxiway
     *
     * Example: `Asphalt: 2`
     */
    gsurftype: GroundSurfaceType
  },
  FeatureType.TaxiwayShoulder,
  Polygon
>

/**
 * Represents a guidance line painted on a taxiway
 *
 * Taxiway guidance lines (taxilines) are refered to in `ICAO Doc. 9157` as taxiway centrelines
 *
 * See definition `ICAO Annex 14, CHapter 5.2.8`
 *
 * Taxiway guidance lines shall exclude exit lines and aircraft stand guidance taxilines
 */
export type TaxiwayGuidanceLine = AmdbFeature<
  {
    /**
     * Object identifier **(not unique)**
     *
     * Represents the name of the guidance line
     *
     * Note that this value will **ALWAYS** match the `idlin` of the `TaxiwayElement` that this guidance line is contained within, which is not always representative, especially at intersections. This means the `idlin` is not garunteed to match the exact name of the line in the real world
     *
     * The above is not neccessarily true for RunwayExitLines
     *
     * Example: `A5`
     */
    idlin: string | null

    /**
     * Permanent state of feature (exceeding the AIRAC-cycle of 56 days)
     *
     * Non-permanent closures or outages of less than 56 days are not adressed in the airport maping database but will be addressed via NOTAMS
     *
     * Example: `Open: 1`
     */
    status: Status

    /**
     * Maximum wingspan allowed on the taxiway, measured in **meters**
     *
     * Example: `35.66`
     */
    wingspan: number

    /**
     * Maximum speed allowed on the taxiway, measured in **knots**
     *
     * Example: `17.00`
     */
    maxspeed: number

    /**
     * The color of the painted taxiline
     *
     * Example: `Orange: 1`
     */
    color: LineColor

    /**
     * Style of the painted taxiline
     *
     * Example: `Dashed: 1`
     */
    style: LineStyle

    /**
     * Directionality of the corresponding taxiway
     *
     * Example: `StartToEndpoint: 1`
     */
    direc: LineDirection
  },
  FeatureType.TaxiwayGuidanceLine,
  LineString
>

/**
 * A marking painted at a position at which taxiing aircraft and vehicles are expected to stop and hold until further cleared to proceed, when instructed so by the aerodrome control tower
 *
 * TaxiwayIntersectionMarkings will only protect a non-runway location
 *
 * The line shall be located at the center of the painted ground marking for single line markings or at the outer edge of the painted ground marking away from the protected surface
 *
 * See definition: `ICAO Annex 14, chapter 5.2.11`
 */
export type TaxiwayIntersectionMarking = AmdbFeature<
  {
    /**
     * Object Identifier **(not unique)**
     *
     * Will match the `idlin` of the `TaxiwayElement` that this intersection marking is located on, unless it has an otherwise identifiable name
     *
     * Example: `A5`
     */
    idlin: string | null
  },
  FeatureType.TaxiwayIntersectionMarking,
  LineString
>

/**
 * A marking painted at a position intended to protect a runway, an obstacle limitation surface, or an ILS/MLS critical/sensitive area at which taxiing aircraft and vehicles are expected to stop and hold unless otherwise authorized by the aerodrome control tower.
 *
 * See definition: `ICAO Annex 14, chapter 5.2.10`
 *
 * Shall be located at the outer edge of the painted ground marking away from the corresponding runway
 */
export type TaxiwayHoldingPosition = AmdbFeature<
  {
    /**
     * Object Identifier **(not unique)**
     *
     * Will match the `idlin` of the `TaxiwayElement` that this holding position is located on, unless it has an otherwise identifiable name
     *
     * Example: `A5`
     */
    idlin: string | null

    /**
     * Code describing the low visiblity operation category of the holding position
     *
     * Example: `Cat1: 1`
     */
    catstop: StopbarCategory

    /**
     * Permanent state of feature (exceeding the AIRAC-cycle of 56 days)
     *
     * Non-permanent closures or outages of less than 56 days are not adressed in the airport maping database but will be addressed via NOTAMS
     *
     * Example: `Open: 1`
     */
    status: Status

    /**
     * Object identifier of the runway or taxiway being protected
     *
     * For runway holding positions this will the `idrwy` field, for taxiways it will be the `idlin` field
     *
     * Example: `07L.25R`
     */
    idp: string | null
  },
  FeatureType.TaxiwayHoldingPosition,
  LineString
>
