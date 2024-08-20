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
  /** Not provided */
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
  /** Not provided */
  // SurveyControlPoint = 31,
  /** Not provided */
  // Asle = 32,
  BlastPad = 33,
  ServiceRoad = 34,
  Water = 35,
  Hotspot = 37, // Our data has 37 as the feattype for hotspot, although the ER-009 spec says it should be 36
  /** Not provided */
  // RunwayCenterlinePoint = 37,
  /** Not provided */
  // ArrestingSystemLocation = 38,
  /** Not provided yet */
  // AsrnEdge = 39
  /** Not provided yet */
  // AsrnNode = 40
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
  RunwayElement = 7, // Thats just how it is
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
