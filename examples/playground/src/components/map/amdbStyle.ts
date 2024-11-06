import {
  AmdbLayerName,
  AmdbResponseStructure,
  FeatureType,
  LineColor,
  LineStyle,
  PolygonalStructureType,
  StopbarCategory,
} from "@navigraph/amdb"
import { CircleOptions, PathOptions, StyleFunction } from "leaflet"

// Top to bottom like rendering, not render order
export const layerOrder: Record<AmdbLayerName, number> = {
  aerodromereferencepoint: 0,
  verticalpointstructure: 0,
  runwaythreshold: 0,
  parkingstandlocation: 0,
  hotspot: 0,
  frequencyarea: 1,
  taxiwayholdingposition: 1,
  taxiwayintersectionmarking: 1,
  taxiwayguidanceline: 2,
  standguidanceline: 2,
  runwayexitline: 2,
  serviceroad: 3,
  deicingarea: 4,
  parkingstandarea: 5,
  taxiwayelement: 5,
  apronelement: 6,
  runwaymarking: 7,
  runwayelement: 8,
  runwayintersection: 8,
  runwaydisplacedarea: 8,
  stopway: 8,
  blastpad: 8,
  arrestinggearlocation: 9,
  constructionarea: 10,
  finalapproachandtakeoffarea: 11,
  helipadthreshold: 12,
  landandholdshortoperationlocation: 14,
  paintedcenterline: 15,
  runwayshoulder: 17,
  taxiwayshoulder: 17,
  touchdownliftoffarea: 19,
  verticallinestructure: 20,
  verticalpolygonalstructure: 21,
  water: 22,
}

/**
 * Leaflet style function for AMDB rendering based losely on the Navigraph Charts AMDB style
 */
const amdbStyle: StyleFunction = (_feature): PathOptions | CircleOptions => {
  if (!_feature) return {}

  if (!("feattype" in _feature.properties)) {
    throw new Error("AMDB Style function was used on layer with feature without feattype")
  }

  const feature = _feature as AmdbResponseStructure[AmdbLayerName]["features"][number]

  switch (feature.properties.feattype) {
    case FeatureType.ApronElement:
      return {
        fillOpacity: 1,
        fillColor: "hsl(0, 0%, 52%)",
        stroke: false,
      }
    case FeatureType.Stopway:
    case FeatureType.BlastPad:
      return {
        fillOpacity: 1,
        fillColor: "hsl(0, 0%, 40%)",
        stroke: false,
      }
    case FeatureType.DeicingArea:
      return {
        fillOpacity: 1,
        stroke: false,
        fillColor: "hsl(200, 60%, 75%)",
      }
    case FeatureType.ParkingStandArea:
      return {
        fillOpacity: 1,
        fillColor: "hsl(0, 0%, 47%)",
        stroke: false,
      }
    case FeatureType.RunwayDisplacedArea:
    case FeatureType.RunwayIntersection:
    case FeatureType.RunwayElement:
      return {
        fillOpacity: 1,
        fillColor: "hsl(0, 0%, 33%)",
        stroke: false,
      }
    case FeatureType.RunwayMarking:
      return {
        fillOpacity: 1,
        fillColor: "#fefefe",
        stroke: false,
      }
    case FeatureType.ServiceRoad:
      return {
        fillOpacity: 1,
        fillColor: "hsl(240, 5%, 55%)",
        stroke: false,
      }
    case FeatureType.TaxiwayElement:
      return {
        fillOpacity: 1,
        fillColor: "hsl(0, 0%, 50%)",
        stroke: false,
      }
    case FeatureType.TaxiwayShoulder:
    case FeatureType.RunwayShoulder:
      return {
        fillOpacity: 0.5,
        fillColor: "hsl(0, 0%, 65%)",
        stroke: false,
      }
    case FeatureType.StandGuidanceLine:
    case FeatureType.TaxiwayGuidanceLine:
    case FeatureType.RunwayExitLine:
      return {
        stroke: true,
        fill: false,
        weight: 1.8,
        dashArray: {
          [LineStyle.Solid]: undefined,
          [LineStyle.Unknown]: undefined,
          [LineStyle.Dashed]: [3, 3],
          [LineStyle.Dotted]: [3, 1],
        }[feature.properties.style],
        color: {
          [LineColor.Yellow]: "yellow",
          [LineColor.Unknown]: "yellow",
          [LineColor.Orange]: "orange",
          [LineColor.Blue]: "white",
          [LineColor.White]: "white",
        }[feature.properties.color],
      }
    case FeatureType.ArrestingGearLocation:
      return {
        stroke: true,
        fill: false,
        color: "#ff00ff",
      }
    case FeatureType.LandAndHoldShortOperationLocation:
      return {
        stroke: true,
        fill: false,
        color: "#00ff00",
      }
    case FeatureType.VerticalPolygonalStructure:
      return {
        stroke: false,
        fill: true,
        fillOpacity: 1,
        fillColor:
          feature.properties.plysttyp === PolygonalStructureType.TerminalBuilding
            ? "hsl(240, 25%, 30%)"
            : "hsl(0, 0%, 30%)",
      }
    case FeatureType.TaxiwayHoldingPosition:
      return {
        color: {
          [StopbarCategory.None]: "yellow",
          [StopbarCategory.NotApplicable]: "yellow",
          [StopbarCategory.Unknown]: "yellow",
          [StopbarCategory.Cat1]: "hsl(25, 100%, 50%)",
          [StopbarCategory.Cat2Or3]: "hsl(0, 100%, 50%)",
        }[feature.properties.catstop as StopbarCategory],
      }
    case FeatureType.TaxiwayIntersectionMarking:
      return {
        color: "#fefefe",
        dashArray: [2, 2],
      }
    case FeatureType.Hotspot:
      return {
        fill: true,
        stroke: true,
        color: "#ff00ff",
        fillColor: "#89259D",
        fillOpacity: 0.3,
      }
    case FeatureType.ConstructionArea:
      return {
        stroke: false,
        fillColor: "#ff0000",
        fillOpacity: 0.1,
      }
    case FeatureType.FrequencyArea:
      return {
        fill: false,
        color: "green",
      }
    case FeatureType.Water:
      return {
        color: "#004a61",
        fillColor: "#003264",
        fillOpacity: 1,
      }
    case FeatureType.AerodromeReferencePoint:
      return {
        radius: 15,
        color: "white",
      }
    case FeatureType.AsrnEdge:
      return {
        fill: false,
        color: "green",
      }
    case FeatureType.AsrnNode:
      return {
        radius: 5,
        color: "red",
      }
    case FeatureType.RunwayThreshold:
    case FeatureType.FinalApproachAndTakeoffArea:
    case FeatureType.HelipadThreshold:
    case FeatureType.PaintedCenterline:
    case FeatureType.ParkingStandLocation:
    case FeatureType.TouchDownLiftOffArea:
    case FeatureType.VerticalLineStructure:
    case FeatureType.VerticalPointStructure:
      return {
        radius: 10,
      }
  }
}

export default amdbStyle
