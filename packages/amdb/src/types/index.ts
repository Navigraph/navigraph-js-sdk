import { FeatureCollection as GeoFeatureCollection, LineString, Point, Polygon } from "geojson"
import { FeatureType } from "./enums"
import {
  AerodromeReferencePoint,
  ArrestingGearLocation,
  BlastPad,
  FinalApproachAndTakeoffArea,
  FrequencyArea,
  HelipadThreshold,
  LandAndHoldShortOperationLocation,
  PaintedCenterline,
  RunwayDisplacedArea,
  RunwayElement,
  RunwayExitLines,
  RunwayIntersection,
  RunwayMarking,
  RunwayShoulder,
  RunwayThreshold,
  Stopway,
  TouchDownLiftOfArea,
} from "./features"
import {
  TaxiwayElement,
  TaxiwayGuidanceLine,
  TaxiwayHoldingPosition,
  TaxiwayIntersectionMarking,
  TaxiwayShoulder,
} from "./features/taxiways"
import { AmdbFeature } from "./features/types"

export * from "./features"
export * from "./enums"

type FeatureCollection<T extends AmdbFeature<object, FeatureType, Point | LineString | Polygon>> = GeoFeatureCollection<
  T["geometry"],
  T["properties"]
>

export interface AmdbResultStructure {
  aerodromereferencepoint: FeatureCollection<AerodromeReferencePoint>
  arrestinggearlocation: FeatureCollection<ArrestingGearLocation>
  blastpad: FeatureCollection<BlastPad>
  finalapproachandtakeoffarea: FeatureCollection<FinalApproachAndTakeoffArea>
  frequencyarea: FeatureCollection<FrequencyArea>
  helipadthreshold: FeatureCollection<HelipadThreshold>
  landandholdshortoperationlocation: FeatureCollection<LandAndHoldShortOperationLocation>
  paintedcenterline: FeatureCollection<PaintedCenterline>
  runwaydisplacedarea: FeatureCollection<RunwayDisplacedArea>
  runwayelement: FeatureCollection<RunwayElement>
  runwayexitline: FeatureCollection<RunwayExitLines>
  runwayintersection: FeatureCollection<RunwayIntersection>
  runwaymarking: FeatureCollection<RunwayMarking>
  runwayshoulder: FeatureCollection<RunwayShoulder>
  runwaythreshold: FeatureCollection<RunwayThreshold>
  stopway: FeatureCollection<Stopway>
  taxiwayelement: FeatureCollection<TaxiwayElement>
  taxiwayguidanceline: FeatureCollection<TaxiwayGuidanceLine>
  taxiwayholdingposition: FeatureCollection<TaxiwayHoldingPosition>
  taxiwayintersectionmarking: FeatureCollection<TaxiwayIntersectionMarking>
  taxiwayshoulder: FeatureCollection<TaxiwayShoulder>
  touchdownliftoffarea: FeatureCollection<TouchDownLiftOfArea>
}

export type AmdbLayerName = keyof AmdbResultStructure

export type AmdbResult<P extends AmdbLayerName> = Pick<AmdbResultStructure, P>

export enum Projection {
  AzimuthalEquidistant = "NAVIGRAPH:ARP_AZEQ",
  Epsg4326 = "EPSG:4326",
}
