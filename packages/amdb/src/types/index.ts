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
import { AsrnEdge, AsrnNode } from "./features/asrn"
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

type FeatureCollection<T extends AmdbFeature<object, FeatureType, Point | LineString | Polygon>> = {
  type: "FeatureCollection"
  features: Array<T>
}

export interface AmdbResponseStructure {
  aerodromereferencepoint: FeatureCollection<AerodromeReferencePoint>
  apronelement: FeatureCollection<ApronElement>
  arrestinggearlocation: FeatureCollection<ArrestingGearLocation>
  asrnedge: FeatureCollection<AsrnEdge>
  asrnnode: FeatureCollection<AsrnNode>
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

export type AmdbLayerName = keyof AmdbResponseStructure

// Type checks that FeatureType names match AmdbResponseStructure so we can have an array of valid layers
export const allLayers: AmdbLayerName[] = Object.keys(FeatureType)
  .filter(item => !parseInt(item) && item != "0")
  .map(item => item.toLowerCase()) as Lowercase<keyof typeof FeatureType>[]

export type AmdbResponse<P extends AmdbLayerName> = Pick<AmdbResponseStructure, P>

export enum Projection {
  /**
   * A version of {@link https://mathworld.wolfram.com/AzimuthalEquidistantProjection.html Azimuth Equidistant} where there aerodrome reference point is centered at (0, 0), and coordinates are specified in terms of (x, y) displacement in meters
   */
  AzimuthalEquidistant = "NAVIGRAPH:ARP_AZEQ",
  /**
   * Standard coordinate system where locations are specified in decimal degrees of latitude and longitude
   */
  Epsg4326 = "EPSG:4326",
}

export interface AmdbSearchResponse {
  idarpt: string
  iata: string | null
  elev: number
  name: string
  coordinates: { lat: number; lon: number }
}

export interface AmdbCycleResponse {
  cycle_start_date: string
  cycle_end_date: string
  import_time: string
  airac_cycle: number
}
