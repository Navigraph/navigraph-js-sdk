import { Point, Polygon } from "geojson"
import { FeatureType, Status, SurfaceType } from "../enums"
import { AmdbFeature } from "./types"

/**
 * Begining of the portion of the helipad that is available for landing
 *
 * See definition `ICAO Doc 9674 WGS84-Manual, Chapter 5 Attachment C`
 */
export type FinalApproachAndTakeoffArea = AmdbFeature<
  {
    /**
     * Object identifier of the corresponding runway
     *
     * This can **EXTREMELY** rarely be null (see airport `LFMI`)
     *
     * Example: `02.20`
     */
    idrwy: string | null

    /**
     * Predominant surface type
     *
     * Example: `AsphaltGrooved: 3`
     */
    surftype: SurfaceType
  },
  FeatureType.FinalApproachAndTakeoffArea,
  Polygon
>

/**
 * A load bearing area on which a helicopter may touchdown or liftoff
 *
 * The outer edges of the white TLOF-markings should be used to represent the TLOF
 *
 * See definition `ICAO Doc 9674 WGS84-Manual, Chapter 5 Attachment C`
 */
export type TouchDownLiftOfArea = AmdbFeature<
  {
    /**
     * Object identifier of the corresponding runway
     *
     * Example: `02.20`
     */
    idrwy: string | null

    /**
     * Predominant surface type
     *
     * Example: `AsphaltGrooved: 3`
     */
    surftype: SurfaceType
  },
  FeatureType.TouchDownLiftOfArea,
  Polygon
>

/**
 * Threshold of a helipad
 *
 * See definition `ICAO Doc 9674 WGS84-Manual, Chapter 5 Attachment C`
 */
export type HelipadThreshold = AmdbFeature<
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
     * Height above/below the `WGS-84` ellipsoid measured in **meters**
     */
    ellipse: number

    /**
     * Geoidal undulation of threshold in reference to `EGM 96` measured in **meters**
     */
    geound: number
  },
  FeatureType.HelipadThreshold,
  Point
>
