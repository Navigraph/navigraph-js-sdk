/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ApronBoundaryNode,
  AsrnNode,
  HoldingPositionNode,
  ParkingBoundaryNode,
  ParkingStandArea,
  RunwayBoundaryNode,
  RunwayExitLineNode,
  RunwayIntersectionNode,
  StandNode,
  TaxiwayLinkNode,
  TaxiwayNode,
} from "./features"

export enum FeatureType {
  RunwayElement = 0,
  RunwayIntersection = 1,
  RunwayThreshold = 2,
  RunwayMarking = 3,
  PaintedCenterline = 4,
  LandAndHoldShortOperationLocation = 5,
  ArrestingGearLocation = 6,
  RunwayShoulder = 7,
  Stopway = 8,
  RunwayDisplacedArea = 9,
  // Not provided
  // Clearway = 10,
  FinalApproachAndTakeoffArea = 11,
  TouchDownLiftOffArea = 12,
  HelipadThreshold = 13,
  TaxiwayElement = 14,
  TaxiwayShoulder = 15,
  TaxiwayGuidanceLine = 16,
  TaxiwayIntersectionMarking = 17,
  TaxiwayHoldingPosition = 18,
  RunwayExitLine = 19,
  FrequencyArea = 20,
  ApronElement = 21,
  StandGuidanceLine = 22,
  ParkingStandLocation = 23,
  ParkingStandArea = 24,
  DeicingArea = 25,
  AerodromeReferencePoint = 26,
  VerticalPolygonalStructure = 27,
  VerticalPointStructure = 28,
  VerticalLineStructure = 29,
  ConstructionArea = 30,
  // Not provided
  // SurveyControlPoint = 31,
  // Not provided
  // Asle = 32,
  BlastPad = 33,
  ServiceRoad = 34,
  Water = 35,
  Hotspot = 37, // Our data has 37 as the feattype for hotspot, although the ER-009 spec says it should be 36
  // Not provided
  // RunwayCenterlinePoint = 37,
  // Not provided
  // ArrestingSystemLocation = 38,
  AsrnEdge = 39,
  AsrnNode = 40,
}

export enum SurfaceType {
  ConcreteGrooved = 1,
  ConcreteNoneGrooved,
  AsphaltGrooved,
  AsphaltNonGrooved,
  DesertOrSandOrDirt,
  BareEarth,
  SnowOrIce,
  Water,
  GrassOrTurf,
  AggregateFrictionSealCoat,
  GravelOrCinders,
  PorousFrictionCourses,
  PiercedSteelPlanks,
  RubberizedFrictionSealCoat,
  Bitumen,
  Brick,
  Macadam,
  Stone,
  Coral,
  Clay,
  Laterite,
  LandingMats,
  Membrane,
  Wood,
}

export enum Status {
  Closed,
  Open,
}

export enum PapiVasi {
  None,
  Papi,
  Apapi,
  Vasis,
  Avasis,
  NotApplicable = -32765,
}

export enum LandingCategory {
  Npa,
  Cat1,
  Cat2,
  Cat3A,
  Cat3B,
  Cat3C,
  Unknown = -32767,
  NotApplicable = -32765,
}

export enum StopbarCategory {
  None,
  Cat1,
  Cat2Or3,
  Unknown = -32767,
  NotApplicable = -32765,
}

export enum ThresholdType {
  Threshold,
  DisplacedThreshold,
}

export enum GroundSurfaceType {
  Concrete = 1,
  Asphalt,
  DesertOrSandOrDirt,
  BareEarth,
  SnowOrIce,
  Water,
  GrassOrTurf,
  GravelOrCinders,
  PiercedSteelPlanks,
  Bitumen,
  Brick,
  Macadam,
  Stone,
  Coral,
  Clay,
  Laterite,
  LandingMats,
  Membrane,
  Wood,
  Unknown = -32767,
}

export enum LineColor {
  Yellow,
  Orange,
  Blue,
  White,
  Unknown = -32767,
}

export enum LineStyle {
  Solid,
  Dashed,
  Dotted,
  Unknown = -32767,
}

export enum LineDirection {
  Bidirectional,
  StartToEndpoint,
  EndToStartpoint,
  Unknown = -32767,
}

export enum BridgeType {
  None,
  Underpass,
  Overpass,
  Unknown = -32767,
}

export enum Availability {
  Unavailable,
  Available,
  Unknown = -32767,
}

export enum FuelType {
  JetA1 = "1",
  Avgas100LL = "2",
  Mogas = "3",
  JetB = "4",
  "73Oct" = "5",
  "80-87" = "6",
  "100-130" = "7",
  "115-145" = "8",
  Jet = "9",
  JetA = "10",
  JetAPlus = "11",
  JP4 = "12",
}

export enum BaseFeature {
  NoOverlap,
  ServiceRoad,
  ApronElement,
  TaxiwayElement,
  ParkingStandArea,
  Stopway = 5,
  RunwayElement = 7,

  RunwayIntersection,
  RunwayShoulder,
  FinalApproachAndTakeoffArea,
  TouchDownLiftOffArea,
  TaxiwayShoulder,
  DeicingArea,
  ConstructionArea,
  Blastpad,
  RunwayDisplacedArea,
}

export enum PolygonalStructureType {
  TerminalBuilding = 1,
  Hangar,
  ControlTower,
  NonTerminalBuilding,
  Tank,
  Tree,
  Bush,
  Forest,
  EarthenWorks,
  Navaid,
  Sign,
  Unknown = -32767,
}

export enum StructureMaterial {
  Concrete = 1,
  Metal,
  StoneOrBrick,
  Composition,
  Rock,
  EarthenWorks,
  Wood,
  Unknown = -32767,
}

export enum PointStructureType {
  Smokestack = 1,
  PowerlinePylon,
  Antenna,
  Windsock,
  Tree,
  Lightpole,
  LightStanchion,
  AirportBeacon,
  Navaid,
  Sign,
  NotApplicable = -32765,
  Unknown = -32767,
}

export enum Conformance {
  NonConformant,
  Conformant,
  NotApplicable = -32765,
  Unknown = -32767,
}

export enum LineStructureType {
  PowerLine = 1,
  CableRailway,
  BushesOrTrees,
  Wall,
  Navaid,
  Sign,
  NotApplicable = -32765,
  Unknown = -32767,
}

/**
 * Descriptions of each NodeType can be found in the associated interface
 *
 * See {@link AsrnNode}
 */
export enum NodeType {
  Taxiway,
  HoldingPosition,
  RunwayBoundary,
  RunwayExitLine,
  RunwayIntersection,
  ParkingBoundary,
  ApronBoundary,
  TaxiwayLink,
  Deicing,
  Stand,
}

export enum EdgeType {
  /**
   * An edge running along a taxiway, or connecting two taxiways while crossing a runway
   *
   * Can connect to {@link TaxiwayNode}s, {@link HoldingPositionNode}s, {@link RunwayBoundaryNode}s, {@link ApronBoundaryNode}s, or {@link TaxiwayLinkNode}s (in any order or combination)
   */
  Taxiway,
  /**
   * An edge running along the center of a runway
   *
   * Can connect {@link RunwayExitLineNode}s and {@link RunwayIntersectionNode}s (in any order or combination)
   */
  Runway,
  /**
   * An edge running from the centerline of a runway to a taxiway
   *
   * Will connect a {@link RunwayExitLineNode} to a {@link RunwayBoundaryNode}
   */
  RunwayExit,
  /**
   * Forms the portion of a stand entry occuring outside of the {@link ParkingStandArea}
   *
   * Will connect a {@link TaxiwayNode} to a {@link ParkingBoundaryNode}
   */
  TaxiwayLink,
  /**
   * Not yet implemented
   */
  Deicing = 5,
  /**
   * An edge running along an apron taxiline
   *
   * Can connect {@link ApronBoundaryNode}s and {@link TaxiwayNode}s
   */
  Apron,
  /**
   * An edge running along a {@link ParkingStandArea} to form the main body of a stand line
   *
   * Will connect a {@link StandNode} to a {@link ParkingBoundaryNode}
   */
  Stand,
}

export enum EdgeDerivation {
  FullyAbstract,
  PartiallyAbstract,
  FullyDerived,
}
