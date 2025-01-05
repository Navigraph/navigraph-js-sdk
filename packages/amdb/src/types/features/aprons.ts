import { LineString, Point, Polygon } from "geojson"
import {
  Availability,
  BaseFeature,
  FeatureType,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  FuelType,
  GroundSurfaceType,
  LineColor,
  LineDirection,
  LineStyle,
  Status,
} from "../enums"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TaxiwayElement } from "./taxiways"
import { AmdbFeature } from "./types"

/**
 * The remaining parts of a defined apron area that are not covered by `ParkingStandArea` features or `TaxiwayElement` features
 *
 * This includes turn-around areas near the end of runways and fillets designed to accomodate wide turns
 */
export type ApronElement = AmdbFeature<
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
     * Generic surface type of the apron
     *
     * Example: `Asphalt: 2`
     */
    gsurftyp: GroundSurfaceType

    /**
     * The name of the apron
     *
     * Example: `International Apron`
     */
    idapron: string | null
  },
  FeatureType.ApronElement,
  Polygon
>

/**
 * Guidance line on a designated area on an apron intended to be used for parking an aircraft
 *
 * All painted taxilines covering a `ParkingStandArea` are regarded as stand guidance lines. This means if a taxiway passes ontop of a `ParkingStandArea` the `TaxiwayGuidanceLine` will switch to a `StandGuidanceLine` for that area, hence why `StandGuidanceLine`s have a `direc` field
 *
 * There may be several stand guidance taxilines leading to an aircraft stand to accommodate different aircraft types
 */
export type StandGuidanceLine = AmdbFeature<
  {
    /**
     * Object identifier **(not unique)**
     *
     * Official parking stand identification. `StandGuidanceLines` should be assigned with the adjacent parking stand area feature object identifier
     *
     * If a `ParkingStandArea` has two stands, it's name may be `A21_A22`, and the `idstd` of one of the guidance lines may be `A21`, however a `StandGuidanceLine` can also serve multiple stands, in which case the `idstd` will be delimited with an `_` in the same way as a `ParkingStandArea`.
     *
     * Note that there may be multiple separate stands with the same `idstd` at one airport, the `termref` field should be used in tandem with `idstd` to associate `StandGuidanceLines` to `ParkingStandAreas` and `ParkingStandLocations` (make sure to consider that a stand line may serve multiple stands, and a stand line may only serve a subset of the stands served by it's associated stand area)
     *
     * Example: `17R`
     */
    idstd: string | null

    /**
     * The color of the painted stand line
     *
     * Example: `Orange: 1`
     */
    color: LineColor

    /**
     * Style of the painted stand line
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

    /**
     * Maximum wingspan allowed at this stand, measured in **meters**
     *
     * Example: `35.66`
     */
    wingspan: number

    /**
     * Permanent state of feature (exceeding the AIRAC-cycle of 56 days)
     *
     * Non-permanent closures or outages of less than 56 days are not adressed in the airport maping database but will be addressed via NOTAMS
     *
     * Example: `Open: 1`
     */
    status: Status

    /**
     * Ident of the `VerticalPolygonalStructure` that this stand is associated with
     *
     * Example: `International Terminal`
     */
    termref: string | null
  },
  FeatureType.StandGuidanceLine,
  LineString
>

/**
 * Location of a aircraft parking location.
 *
 * Represents the point where the nose wheel of the specific aircraft type is to stop
 *
 * One `ParkingStandArea` may contain multiple `ParkingStandLocation`s, even if there is only one stand in that area
 *
 * This means a single stand may be represented by multiple `ParkingStandLocation`s
 */
export type ParkingStandLocation = AmdbFeature<
  {
    /**
     * Object identifier **(not unique)**
     *
     * Official parking stand identification. `ParkingStandLocation`s should be assigned with the adjacent parking stand area feature object identifier
     *
     * If a `ParkingStandArea` has two stands, it's name may be `A21_A22`, and the `idstd` of one of the parking locations may be `A21`.
     *
     * Note that there may be multiple separate stands with the same `idstd` at one airport, the `termref` field should be used in tandem with `idstd` to associate `ParkingStandLocations` to `StandGuidanceLines` and `ParkingStandAreas` (make sure to consider that stand lines and stand areas may serve multiple stands)
     *
     * Example: `17R`
     */
    idstd: string | null

    /**
     * Parking stand location's feasibility for specific aircraft type according to `ICAO-ACN (Aircraft classification number)`
     *
     * If a parking location is feasible for multiple aircraft types, `acn` will be delimited with a `.`
     *
     * Example: `B747.B777`
     */
    acn: string | null

    /**
     * Ident of the `VerticalPolygonalStructure` that this stand is associated with
     *
     * Example: `International Terminal`
     */
    termref: string | null
  },
  FeatureType.ParkingStandLocation,
  Point
>

/**
 * A designated area on an apron intended to be used for parking an aircraft
 *
 * `ParkingStandArea`s are operational areas near parking stand locations denoted by painted markings
 *
 * If marked, a `ParkingStandArea` polygon shall be captured that coincides with the painted markings. If not marked, a polygon shall be captured that considers published restrictions such as wingspan limits
 */
export type ParkingStandArea = AmdbFeature<
  {
    /**
     * Object identifier **(not unique)**
     *
     * Official parking stand identification.
     *
     * If a `ParkingStandArea` contains more than one stand, `idstd` will be a `_` delimited list of its stands names
     *
     * Note that there may be multiple separate stands with the same `idstd` at one airport, the `termref` field should be used in tandem with `idstd` to associate `ParkingStandAreas` to `StandGuidanceLines` and `ParkingStandLocations` (make sure to consider that a parking stand area may serve multiple stands, and any associated stand lines may only serve a subset of the stands served by the stand area)
     *
     * Example: `A21_A22`
     */
    idstd: string | null

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
     * Generic surface type of the stand area
     *
     * Example: `Asphalt: 2`
     */
    gsurftyp: GroundSurfaceType

    /**
     * Availability of a jetway for the stands in this area
     *
     * Example: `Available: 1`
     */
    jetway: Availability

    /**
     * Comma `,` delimited list of {@link FuelType} available in this parking area
     *
     * Example: `1,3`
     */
    fuel: string | null

    /**
     * Availability of a towing service in this parking area
     *
     * Example: `Available: 1`
     */
    towing: Availability

    /**
     * Availability of a ground power service in this parking area
     *
     * Example: `Available: 1`
     */
    gndpower: Availability

    /**
     * Name of the apron that this stand area is located on (will match the `idapron` field of the associated `ApronElement`)
     *
     * Example: `International Apron`
     */
    idapron: string | null

    /**
     * Ident of the `VerticalPolygonalStructure` that this stand area is associated with
     *
     * Example: `International Terminal`
     */
    termref: string | null
  },
  FeatureType.ParkingStandArea,
  Polygon
>

/**
 * An area comprising an inner area for the parking of an aircraft to receive de-icing treatment
 *
 * Deicing area polygons may overlap other features, and sometimes there may be a single `DeicingArea` feature which designates a group of deicing areas which will then likely overlap the members of that group
 *
 * Deicing areas may also overlap other features such as `TaxiwayElement`s
 */
export type DeicingArea = AmdbFeature<
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
     * Usage restriction (prohibited) for specific aircraft type according to `ICAO-ACN (ICAO-DOC. 8643)`
     *
     * Encoded as aircraft type according to ICAO-ACN. If there is more than one aircraft-type restriction, the different types should be divided by a `.`
     *
     * Example: `B744.A380`
     */
    restacn: string | null

    /**
     * Generic surface type of the deicing area
     *
     * Example: `Asphalt: 2`
     */
    gsurftyp: GroundSurfaceType

    /**
     * Identifier of the underlying:
     *  - {@link TaxiwayElement} (`idlin`)
     *  - {@link ParkingStandArea} (`idstd`)
     *  - {@link ApronElement} (`idapron`)
     *
     * Example: `Apron R`
     */
    idbase: string | null

    /**
     * Name of the deicing area
     *
     * Example: `W13`
     */
    ident: string | null
  },
  FeatureType.DeicingArea,
  Polygon
>
/**
 * Part of an aerodrome surface used by service vehicles
 *
 * A service road may consist of one or more polygons. Service roads can exist both inside and outside of the aerodrome movement area
 *
 * {@link ServiceRoad}s are required to be captured within 90m of a runway or 50m from any aerodrome movement area. Capture of roads outside of that area is optional
 */
export type ServiceRoad = AmdbFeature<
  {
    /**
     * Generic surface type of the {@link ServiceRoad}
     *
     * Example: `Asphalt: 2`
     */
    gsurftyp: GroundSurfaceType

    /**
     * Type of feature which is overlapped by this road
     *
     * Example: `TaxiwayElement: 3`
     */
    featbase: BaseFeature

    /**
     * Identifier of the element overlapped by this {@link ServiceRoad}
     *
     * Example: `International Apron`
     */
    idbase: string | null
  },
  FeatureType.ServiceRoad,
  Polygon
>
