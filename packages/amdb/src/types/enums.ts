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
  FinalApproachAndTakeoffArea = 11,
  TouchDownLiftOfArea = 12,
  HelipadThreshold = 13,
  RunwayExitLine = 19,
  BlastPad = 33,
  AerodromeReferencePoint = 26,
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
}

export enum LandingCategory {
  Npa,
  Cat1,
  Cat2,
  Cat3A,
  Cat3B,
  Cat3C,
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
}

export enum LineColor {
  Yellow,
  Orange,
  Blue,
  White,
}

export enum LineStyle {
  Solid,
  Dashed,
  Dotted,
}

export enum LineDirection {
  Bidirectional,
  StartToEndpoint,
  EndToStartpoint,
}
