/* eslint-disable @typescript-eslint/no-unused-vars */
import { LineString, Point } from "geojson"
import { EdgeDerivation, EdgeType, FeatureType, LineDirection, NodeType, StopbarCategory } from "../enums"
import { ApronElement, DeicingArea, ParkingStandArea, ParkingStandLocation, StandGuidanceLine } from "./aprons"
import { PaintedCenterline, RunwayElement, RunwayIntersection, RunwayThreshold } from "./runway"
import { TaxiwayElement, TaxiwayGuidanceLine, TaxiwayHoldingPosition } from "./taxiways"
import { AmdbFeature } from "./types"

/**
 * Represents a direction or bi-directional connection between 2 nodes having an attached geometry which can be used for graphical depication of a taxi route
 */
export type AsrnEdge = AmdbFeature<
  {
    edgetype: EdgeType

    /**
     * Provides the `idnetwrk` of the two associated {@link AsrnNode}s seperated by an underscore
     *
     * If the associated {@link AsrnNode}s have the same `idnetwrk`, just a single instance of it is used
     *
     * Example: `B3_B2` or `A7`
     */
    idnetwrk: string | null
    /**
     * Id of the {@link AsrnNode} corresponding to the start of the edge geometry
     */
    node1ref: number
    /**
     * Id of the {@link AsrnNode} corresponding to the end of the edge geometry
     */
    node2ref: number
    /**
     * The expected direction that this edge should be traversed
     */
    direc: LineDirection
    /**
     * The method(s) used to generate the geometry of this edge
     */
    edgederv: EdgeDerivation
    /**
     * The length of this edge in metres
     */
    edgelen: number
    /**
     * Sum of the absolute course changes between each geometry segment in this edge, measured in degrees
     */
    curvatur: number
    /**
     * `idapron` value of {@link ApronElement}(s) that this edge passes over.
     *
     * Value will be null if the edge crosses multiple {@link ApronElement}s with different `idapron` values (ignoring aprons with NULL `idapron` values)
     */
    idapron: string | null
    /**
     * Provides the `pcn` value of any polygon features that this edge passes over.
     *
     * Value will be null if the edge crosses multiple polygon features with different `pcn` values
     *
     * See {@link RunwayElement}.pcn for more information
     */
    pcn: string | null

    /**
     * Provides the maximum allowed wingspan which can cross this edge, measured in **meters**
     *
     * Minimum value from any {@link TaxiwayGuidanceLine}s, or {@link StandGuidanceLine}s that this edge is derived from
     */
    wingspan: number

    /**
     * Usage restriction (prohibited) for specific aircraft type according to `ICAO-ACN (ICAO-DOC. 8643)`
     *
     * Encoded as aircraft type according to ICAO-ACN. If there is more than one aircraft-type restriction, the different types should be divided by a `.`
     *
     * Derived from the restricted aircraft of any polygon features that this edge passes over
     *
     * Example: `B744.A380`
     */
    restacn: string | null

    /**
     * !IMPORTANT: This field is not implemented yet, it will always be null
     */
    idbase: string | null
  },
  FeatureType.AsrnEdge,
  LineString
>

type NodeBase<P, T extends NodeType> = AmdbFeature<P & { nodetype: T }, FeatureType.AsrnNode, Point>

/**
 * Represents a node situated on or near boundary of two {@link TaxiwayElement}s, or represents the convergence of two or more edges of type Apron on an {@link ApronElement}
 *
 * If it is not exactly on the boundary of the {@link TaxiwayElement}s, it will generally be representing the convergence of two or more edges of type Taxiway from the adjacent {@link TaxiwayElement}
 */
export type TaxiwayNode = NodeBase<
  {
    /**
     * A delimited list of `idlin` values from the associated {@link TaxiwayElement}s
     *
     * Intersection elements will be discluded from this list where possible. If both elements are intersections they will both be included
     *
     * Example: `A1_A2`
     */
    idnetwrk: string | null
  },
  NodeType.Taxiway
>

/**
 * Represents a node placed on a {@link TaxiwayHoldingPosition} where any nearby abstract or real edges of type Taxiway intersect the holding position
 */
export type HoldingPositionNode = NodeBase<
  {
    /**
     * Provides the `idlin` value of the assoicated {@link TaxiwayHoldingPosition}
     *
     * Example: `A5`
     */
    idnetwrk: string | null

    /**
     * Code describing the low visiblity operation category of the associated {@link TaxiwayHoldingPosition}
     *
     * Example: `Cat1: 1`
     */
    catstop: StopbarCategory

    /**
     * Provides the `id` of the associated {@link TaxiwayHoldingPosition}
     *
     * Example: `84363`
     */
    featref: number
  },
  NodeType.HoldingPosition
>

/**
 * Represents a node placed on a the boundary of a {@link TaxiwayElement} and some runway feature **(not strictly a {@link RunwayElement})**
 *
 * This generally represents the transition from an edge of type Taxiway to an edge of type RunwayExit, however it may also be used for runway crossings where the path remains an edge of type Taxiway while crossing the runway
 */
export type RunwayBoundaryNode = NodeBase<
  {
    /**
     * Provides the `idlin` value of the {@link TaxiwayElement} that this node is situated on the boundary of
     *
     * Example: `A5`
     */
    idnetwrk: string | null

    /**
     * Provides the `idthr` value of the {@link RunwayThreshold} closest to this node that is from the same runway as this node
     *
     * Example: `02`
     */
    idthr: string
  },
  NodeType.RunwayBoundary
>

/**
 * Represents a node placed on a {@link PaintedCenterline} which generally connects edges of type Runway to one or more edges of type RunwayExit
 *
 * **NOTE:** This node type also represents the ends of runways, in which case it will only have one connected edge, that being an edge of type Runway
 */
export type RunwayExitLineNode = NodeBase<
  {
    /**
     * Provides the `idrwy` value of the associated {@link PaintedCenterline}
     *
     * Note that the node will not neccessarily be on the physical {@link PaintedCenterline}, but can be on its extension
     *
     * Example: `02.20`
     */
    idnetwrk: string | null

    /**
     * Provides the `idthr` value of the {@link RunwayThreshold} closest to this node that is from the same runway as this node
     *
     * Example: `02`
     */
    idthr: string
  },
  NodeType.RunwayExitLine
>

/**
 * Represents a node placed on the boundary of a {@link RunwayIntersection} element where it is intersected by a {@link PaintedCenterline}
 *
 * This node will generally connect four edges of type Runway to each other, two being on the associated {@link PaintedCenterline}, the other two linking to the {@link PaintedCenterline} which crosses the {@link PaintedCenterline} that this node is placed on
 */
export type RunwayIntersectionNode = NodeBase<
  {
    /**
     * Provides the `idrwy` value of the associated {@link PaintedCenterline}
     *
     * Example: `02.20`
     */
    idnetwrk: string | null
  },
  NodeType.RunwayIntersection
>

/**
 * Represents a node placed on the boundary of a {@link TaxiwayElement} and an ({@link ParkingStandArea} or {@link ApronElement}) where it is intersected by a stand entry line
 *
 * This node will generally connect a TaxiwayLink edge and a Stand edge.
 *
 * **NOTE:** These nodes can be colocated as each one will only connect to one {@link StandNode}
 *
 * There can also be multiple ParkingBoundaryNodes serving one {@link StandNode}
 */
export type ParkingBoundaryNode = NodeBase<
  {
    /**
     * Provides the `idstd` value of the associated {@link ParkingStandLocation}
     *
     * Example: `17R`
     */
    idnetwrk: string | null

    /**
     * Provides the `termref` value of the associated {@link ParkingStandLocation}
     *
     * Example: `International Terminal`
     */
    termref: string | null
  },
  NodeType.ParkingBoundary
>

/**
 * Represents a node placed on the boundary of an {@link ApronElement} and a {@link TaxiwayElement}.
 *
 * This node will connect an edge of type Taxiway with an edge of type Apron
 */
export type ApronBoundaryNode = NodeBase<
  {
    /**
     * Provides the `idapron` value of the associated {@link ApronElement}
     *
     * Example: `International Apron`
     */
    idnetwrk: string | null
  },
  NodeType.ApronBoundary
>

/**
 * Represents a node placed on some abstract or real edge of type Taxiway or Apron, providing a transition from the Taxiline to a stand
 *
 * This node will generally connect edges of type Taxiway or Apron to edges with type TaxiwayLink or Stand or Deicing
 */
export type TaxiwayLinkNode = NodeBase<
  {
    /**
     * Provides the `idlin` value of the associated {@link TaxiwayElement} or {@link TaxiwayGuidanceLine}
     *
     * Example: `A5`
     */
    idnetwrk: string | null
  },
  NodeType.TaxiwayLink
>

/**
 * Represents a node serving a {@link DeicingArea}. Will be placed on an associated guidance line at the point closest to the centroid of the associated {@link DeicingArea}. If not guidance line exists it will bea the the centroid of the {@link DeicingArea}
 */
export type DeicingNode = NodeBase<
  {
    /**
     * Provides the `ident` value of the associated {@link DeicingArea}
     *
     * Example: `W13`
     */
    idnetwrk: string | null
  },
  NodeType.Deicing
>

/**
 * Represents a node showing where an aircaft can park. Each node represents a unique parking position, even if one {@link ParkingStandLocation} or {@link ParkingStandArea} represents multiple positions using a delimited `idstd`.
 *
 * Each node will be placed on the associated {@link StandGuidanceLine} at the point closest to the centroid of the associated {@link ParkingStandArea}
 */
export type StandNode = NodeBase<
  {
    /**
     * Provides one of the `idstd` values from the associated {@link ParkingStandArea}
     *
     * Example: `17R`
     */
    idnetwrk: string | null

    /**
     * Provides the `termref` value from the associated {@link ParkingStandArea}
     *
     * Example: `International Terminal`
     */
    termref: string | null
  },
  NodeType.Stand
>

/**
 * Representation of the intersection of two or more aerodrome features related to taxi operations, or other special locations such as holding positions or entry/exit to a parking area.
 */
export type AsrnNode =
  | TaxiwayNode
  | HoldingPositionNode
  | RunwayBoundaryNode
  | RunwayExitLineNode
  | RunwayIntersectionNode
  | ParkingBoundaryNode
  | ApronBoundaryNode
  | TaxiwayLinkNode
  | DeicingNode
  | StandNode
