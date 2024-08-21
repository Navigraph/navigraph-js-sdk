import { LineString, Point, Polygon } from "geojson"
import {
  FeatureType,
  GroundSurfaceType,
  LandingCategory,
  LineColor,
  LineDirection,
  LineStyle,
  PapiVasi,
  Status,
  SurfaceType,
  ThresholdType,
} from "../enums"
import { AmdbFeature } from "./types"

/**
 * Any part of a runway not defined as a special part of the runway (e.g. `Stopway`, `RunwayShoulder`, `BlastPad`)
 *
 * Makes up the main body portions of the runway
 *
 * Runway elements are delimited by the outer edge of the white runway edge painting or surface edge if no marking is present
 *
 * Runway elements shall include any portion of a runway not otherwise identified as an intersection, shoulder, stopway, displaced area, blastpad, or arresting system `AMDB-R042`
 *
 * Runway elements shall overlap corresponding water features.
 */
export type RunwayElement = AmdbFeature<
  {
    /**
     * Object identifier **(not unique)**
     *
     * Encoded as the two threshold identifiers of the runway seperated by a `.`
     *
     * Note that the format is not garunteed to include leading zeros, this value will match the **official** name of the runway which should match the physical threshold markings
     *
     * In very rare cases the runway may have no name
     *
     * Example: `02.20`
     */
    idrwy: string | null

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
     * Minimum width of the runway in **meters**
     *
     * ***NOT*** the minimum width of this specific polygon
     *
     * Example `45.0`
     */
    width: number

    /**
     * Length of the runway in **meters**
     *
     * ***NOT*** the length of this specific polygon
     *
     * Example `3288.0`
     */
    length: number

    /**
     * Predominant surface type
     *
     * Example: `AsphaltGrooved: 3`
     */
    surftype: SurfaceType
  },
  FeatureType.RunwayElement,
  Polygon
>

/**
 * Any area intersected by two or more runways
 *
 * This feature is the common area intersecting runways.
 *
 * Runway intersections are delimited by the outer edge of the white runway edge painting or surface edge if no marking is present, excluding runway shoulders
 */
export type RunwayIntersection = AmdbFeature<
  {
    /**
     * Object Identifier **(not unique)**
     *
     * Encoded as a `_` seperated list of `idrwy` values from intersecting runways
     *
     * Example: `02.20_11.29`
     */
    idrwi: string

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
     * Predominant surface type
     *
     * Example: `AsphaltGrooved: 3`
     */
    surftype: SurfaceType
  },
  FeatureType.RunwayIntersection,
  Polygon
>

/**
 * The location of an operable runway threshold.
 *
 * **Note** that a runway end may not neccesarily have a threshold, usually if that end is not used for takeoffs or landings, but this is a very rare case
 *
 * If the runway has a displaced area where landing operations may **not** occur, a second threshold is placed at the end of this area, and marked as a displaced threshold. This displaced threshold will be at the intersection of the `RunwayElement` part of the runway and the `DisplacedArea` part.
 *
 * The threshold at the end of a runway as a whole will always be a non-displaced threshold (Except where no threshold exists for that end)
 */
export type RunwayThreshold = AmdbFeature<
  {
    /**
     * Object Identifier **(not unique)**
     *
     * Note that the format is not garunteed to include leading zeros, this value will match the **official** name of the threshold which should match the physical markings
     *
     * Example: `02`
     */
    idthr: string

    /**
     * Permanent state of feature (exceeding the AIRAC-cycle of 56 days)
     *
     * Non-permanent closures or outages of less than 56 days are not adressed in the airport maping database but will be addressed via NOTAMS
     *
     * Example: `Open: 1`
     */
    status: Status

    /**
     * Touchdown zone `ICAO Annex 14, Chapter 1.1` orthometric elevation in **meters**
     *
     * Example: `37.49`
     */
    tdze: number

    /**
     * Touchdown zone longitudinal slope (slope of 1/3 of the runway length from threshold or first 1000 meters for runways longer than 3000 meters, correspnding to the threshold location).
     *
     * Encoded as a percent value
     *
     * Example: `0.60`
     */
    tdzslope: number

    /**
     * True bearing corresponding to the landing direction `ICAO Annex 14, Chapter 3.1.12` measured in **degrees**
     *
     * Example: `40.00`
     */
    brngtrue: number

    /**
     * Magnetic bearing corresponding to the threshold location valid at the day of data generation measured in **degrees**
     *
     * Example: `16.00`
     */
    brngmag: number

    /**
     * Runway slope corresponding to landing direction
     *
     * Encoded as a percent value
     *
     * Example: `-0.28`
     */
    rwyslope: number

    /**
     * Take-off run available `ICAO Annex 14, Chapter 1.1` measured in **meters**
     *
     * Example: `3288.00`
     */
    tora: number

    /**
     * Take-off distance available `ICAO Annex 14, Chapter 1.1` measured in **meters**
     *
     * Example: `3548.00`
     */
    toda: number

    /**
     * Accelerate-stop distance available `ICAO Annex 14, Chapter 1.1` measured in **meters**
     *
     * Example: `3288.00`
     */
    asda: number

    /**
     * Landing distance available `ICAO Annex 14, Chapter 1.1` measured in **meters**
     */
    lda: number

    /**
     * Vertical guidance lighting system available
     *
     * Example: `Papi: 1`
     */
    vasis: PapiVasi

    /**
     * Precision approach guidance system available
     *
     * Example: `Cat1: 1`
     */
    cat: LandingCategory

    /**
     * Height above/below the `WGS-84` ellipsoid measured in **meters**
     */
    ellipse: number

    /**
     * Geoidal undulation of threshold in reference to `EGM 96` measured in **meters**
     */
    geound: number

    /**
     * Whether this threshold is displaced or not
     *
     * Example: `DisplacedThreshold: 1`
     */
    thrtype: ThresholdType
  },
  FeatureType.RunwayThreshold,
  Point
>

/**
 * A symbol or group of symbols displayed on the surface of a runway in order to convey aeronautical information
 *
 * These markings may include runway designation marking, runway centerline marking, threshold marking, traverse stripes, touchdown zone marking, and runway side stripe marking.
 *
 * See definition `ICAO Annex 14, Chapter 1.1`
 */
export type RunwayMarking = AmdbFeature<
  {
    /**
     * Object identifier of the corresponding runway
     *
     * Example: `02.20`
     */
    idrwy: string | null
  },
  FeatureType.RunwayMarking,
  Polygon
>

/**
 * Continuous line captured along the center of a runway, excluding the extension through `RunwayDisplacedAreas`
 *
 * This will connect either the two (inner most) thresholds in case of a bidirectional runway, or the threshold and the opposite end of the runway in the case of a unidirectional runway (this can be used to find the location of a threshold even if there is no operable threshold)
 *
 * **Note** that one of these can and should exist (there are only 18 which don't as of AIRAC 2408) for a runway even if the runway has no phyically painted centerline
 */
export type PaintedCenterline = AmdbFeature<
  {
    /**
     * Object identifier of the corresponding runway
     *
     * While there are currently no painted centerlines for runways with a null idrwy, there is no reason why they may not exist in the future
     *
     * Example: `02.20`
     */
    idrwy: string | null
  },
  FeatureType.PaintedCenterline,
  LineString
>

/**
 * Location of marking used for LAHSO
 *
 * These runway operations include landing and holding short of an intersecting runway, an intersecting taxiway, or on some other designated point on a runway other than an intesecting runway or taxiway
 */
export type LandAndHoldShortOperationLocation = AmdbFeature<
  {
    /**
     * Object identifier of the corresponding runway threshold
     *
     * Example: `9`
     */
    idthr: string
    /**
     * Object identifier of the runway or taxiway being protected
     *
     * Example: `07L.25R` or `EJ`
     */
    idp: string | null
  },
  FeatureType.LandAndHoldShortOperationLocation,
  LineString
>

/**
 * Location of arresting gear cables across a runway
 */
export type ArrestingGearLocation = AmdbFeature<
  {
    /**
     * Object identifier of the operationally corresponding runway threshold
     *
     * Example: `9`
     */
    idthr: string
    /**
     * Permanent state of feature (exceeding the AIRAC-cycle of 56 days)
     *
     * Non-permanent closures or outages of less than 56 days are not adressed in the airport maping database but will be addressed via NOTAMS
     *
     * Example: `Open: 1`
     */
    status: Status
  },
  FeatureType.ArrestingGearLocation,
  LineString
>

/**
 * An area adjacent to the edge of a runway pavement so prepared as to provide a transition between the pavement and the adjacent surface
 *
 * See definition `ICAO Annex 14, Chapter 1.1`
 */
export type RunwayShoulder = AmdbFeature<
  {
    /**
     * Object identifier of the corresponding runway
     *
     * Example: `02.20`
     */
    idrwy: string | null
    /**
     * Permanent state of feature (exceeding the AIRAC-cycle of 56 days)
     *
     * Non-permanent closures or outages of less than 56 days are not adressed in the airport maping database but will be addressed via NOTAMS
     *
     * Example: `Open: 1`
     */
    status: Status

    /**
     * Generic surface type of the shoulder
     *
     * Example: `Asphalt: 2`
     */
    gsurftype: GroundSurfaceType
  },
  FeatureType.RunwayShoulder,
  Polygon
>

/**
 * A defined rectangular area on the ground at the end of a take-off run available prepared as the suitable in which an aircraft can be stopped in the case of an abandoned take-off
 *
 * See definition `ICAO Annex 14, Chapter 3.7`
 */
export type Stopway = AmdbFeature<
  {
    /**
     * Object identifier of the corresponding runway threshold
     *
     * Example: `9`
     */
    idthr: string

    /**
     * Permanent state of feature (exceeding the AIRAC-cycle of 56 days)
     *
     * Non-permanent closures or outages of less than 56 days are not adressed in the airport maping database but will be addressed via NOTAMS
     *
     * Example: `Open: 1`
     */
    status: Status

    /**
     * Predominant surface type
     *
     * Example: `AsphaltGrooved: 3`
     */
    surftype: SurfaceType
  },
  FeatureType.Stopway,
  Polygon
>

/**
 * Portion of a runway between the beginning of the runway and the displaced threshold
 *
 * If there is no displaced threshold there will be no displaced area (as far as we know)
 */
export type RunwayDisplacedArea = AmdbFeature<
  {
    /**
     * Object identifier of the corresponding runway threshold
     *
     * Example: `9`
     */
    idthr: string

    /**
     * Permanent state of feature (exceeding the AIRAC-cycle of 56 days)
     *
     * Non-permanent closures or outages of less than 56 days are not adressed in the airport maping database but will be addressed via NOTAMS
     *
     * Example: `Open: 1`
     */
    status: Status

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
     * Predominant surface type
     *
     * Example: `AsphaltGrooved: 3`
     */
    surftype: SurfaceType
  },
  FeatureType.RunwayDisplacedArea,
  Polygon
>

/**
 * Specially prepared surface placed adjacent to the end of a runway to eliminate the erosive effect of the high wind forces produced by airplanes at the beginning of their take-off roll
 *
 * Areas in the extension of runways or stopways. These areas are usually covered by chevrons
 *
 * Blastpads may not be used for taxiing, landing, or takeoff
 */
export type BlastPad = AmdbFeature<
  {
    /**
     * Object identifier of the operationally corresponding runway threshold
     *
     * Example: `9`
     */
    idthr: string | null

    /**
     * Permanent state of feature (exceeding the AIRAC-cycle of 56 days)
     *
     * Non-permanent closures or outages of less than 56 days are not adressed in the airport maping database but will be addressed via NOTAMS
     *
     * Example: `Open: 1`
     */
    status: Status
  },
  FeatureType.BlastPad,
  Polygon
>

/**
 * Guidance line painted on the runway exit
 *
 * Painted line leading from the runway to a taxiway to exit the runway
 */
export type RunwayExitLines = AmdbFeature<
  {
    /**
     * Taxiway segment name. This name will usually be identical to the corresponding taxiway name, but not neccesarily
     *
     * Example: `A3`
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
  FeatureType.RunwayExitLine,
  LineString
>
