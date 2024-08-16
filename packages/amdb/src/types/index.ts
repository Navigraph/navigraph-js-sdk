import { FeatureCollection as GeoFeatureCollection, LineString, Point, Polygon } from "geojson"
import { FeatureType } from "./enums"
import {
  AerodromeReferencePoint,
  ArrestingGearLocation,
  BlastPad,
  ConstructionArea,
  FinalApproachAndTakeoffArea,
  FrequencyArea,
  HelipadThreshold,
  Hotspot,
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
  Water,
} from "./features"
import {
  ApronElement,
  DeicingArea,
  ParkingStandArea,
  ParkingStandLocation,
  ServiceRoad,
  StandGuidanceLine,
} from "./features/aprons"
import {
  TaxiwayElement,
  TaxiwayGuidanceLine,
  TaxiwayHoldingPosition,
  TaxiwayIntersectionMarking,
  TaxiwayShoulder,
} from "./features/taxiways"
import { AmdbFeature } from "./features/types"
import {
  VerticalLineStructure,
  VerticalPointStructure,
  VerticalPolygonalStructure,
} from "./features/verticalStructures"

export * from "./features"
export * from "./enums"

type FeatureCollection<T extends AmdbFeature<object, FeatureType, Point | LineString | Polygon>> = GeoFeatureCollection<
  T["geometry"],
  T["properties"]
>

export interface AmdbResultStructure {
  aerodromereferencepoint: FeatureCollection<AerodromeReferencePoint>
  apronelement: FeatureCollection<ApronElement>
  arrestinggearlocation: FeatureCollection<ArrestingGearLocation>
  blastpad: FeatureCollection<BlastPad>
  constructionarea: FeatureCollection<ConstructionArea>
  deicingarea: FeatureCollection<DeicingArea>
  finalapproachandtakeoffarea: FeatureCollection<FinalApproachAndTakeoffArea>
  frequencyarea: FeatureCollection<FrequencyArea>
  helipadthreshold: FeatureCollection<HelipadThreshold>
  hotspot: FeatureCollection<Hotspot>
  landandholdshortoperationlocation: FeatureCollection<LandAndHoldShortOperationLocation>
  paintedcenterline: FeatureCollection<PaintedCenterline>
  parkingstandarea: FeatureCollection<ParkingStandArea>
  parkingstandlocation: FeatureCollection<ParkingStandLocation>
  runwaydisplacedarea: FeatureCollection<RunwayDisplacedArea>
  runwayelement: FeatureCollection<RunwayElement>
  runwayexitline: FeatureCollection<RunwayExitLines>
  runwayintersection: FeatureCollection<RunwayIntersection>
  runwaymarking: FeatureCollection<RunwayMarking>
  runwayshoulder: FeatureCollection<RunwayShoulder>
  runwaythreshold: FeatureCollection<RunwayThreshold>
  serviceroad: FeatureCollection<ServiceRoad>
  standguidanceline: FeatureCollection<StandGuidanceLine>
  stopway: FeatureCollection<Stopway>
  taxiwayelement: FeatureCollection<TaxiwayElement>
  taxiwayguidanceline: FeatureCollection<TaxiwayGuidanceLine>
  taxiwayholdingposition: FeatureCollection<TaxiwayHoldingPosition>
  taxiwayintersectionmarking: FeatureCollection<TaxiwayIntersectionMarking>
  taxiwayshoulder: FeatureCollection<TaxiwayShoulder>
  touchdownliftoffarea: FeatureCollection<TouchDownLiftOfArea>
  verticallinestructure: FeatureCollection<VerticalLineStructure>
  verticalpointstructure: FeatureCollection<VerticalPointStructure>
  verticalpolygonalstructure: FeatureCollection<VerticalPolygonalStructure>
  water: FeatureCollection<Water>
}

export type AmdbLayerName = keyof AmdbResultStructure

export type AmdbResult<P extends AmdbLayerName> = Pick<AmdbResultStructure, P>

export enum Projection {
  AzimuthalEquidistant = "NAVIGRAPH:ARP_AZEQ",
  Epsg4326 = "EPSG:4326",
}
