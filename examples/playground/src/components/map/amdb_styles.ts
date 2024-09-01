import { AmdbLayerName, LineColor, LineStyle, PolygonalStructureType, StopbarCategory } from "@navigraph/amdb";
import { CircleOptions, PathOptions, StyleFunction } from "leaflet";

// Top to bottom like rendering, not render order
export const layerOrder: Record<AmdbLayerName, number> = {
    'aerodromereferencepoint': 0,
    'verticalpointstructure': 0,
    'runwaythreshold': 0,
    'parkingstandlocation': 0,
    'frequencyarea': 1,
    'taxiwayholdingposition': 1,
    'taxiwayintersectionmarking': 1,
    'taxiwayguidanceline': 2,
    'standguidanceline': 2,
    'runwayexitline': 2,
    'serviceroad': 3,
    'deicingarea': 4,
    'parkingstandarea': 5,
    'taxiwayelement': 5,
    'apronelement': 6,
    'runwaymarking': 7,
    'runwayelement': 8,
    'runwayintersection': 8,
    'runwaydisplacedarea': 8,
    'stopway': 8,
    'blastpad': 8,
    'arrestinggearlocation': 9,
    'constructionarea': 10,
    'finalapproachandtakeoffarea': 11,
    'helipadthreshold': 12,
    'hotspot': 13,
    'landandholdshortoperationlocation': 14,
    'paintedcenterline': 15,
    'runwayshoulder': 17,
    'taxiwayshoulder': 17,
    'touchdownliftoffarea': 19,
    'verticallinestructure': 20,
    'verticalpolygonalstructure': 21,
    'water': 22
}

export default function amdbStyle(layerName: AmdbLayerName): StyleFunction {
    return (feature): PathOptions | CircleOptions => {
        switch (layerName) {
            case "apronelement":
                return {
                    fillOpacity: 1,
                    fillColor: 'hsl(0, 0%, 52%)',
                    stroke: false
                }
            case "stopway":
            case "blastpad":
                return {
                    fillOpacity: 1,
                    fillColor: 'hsl(0, 0%, 40%)',
                    stroke: false
                }
            case "deicingarea":
                return {
                    fillOpacity: 1,
                    stroke: false,
                    fillColor: 'hsl(200, 60%, 75%)'
                }
            case "parkingstandarea":
                return {
                    fillOpacity: 1,
                    fillColor: 'hsl(0, 0%, 47%)',
                    stroke: false,
                }
            case "runwaydisplacedarea":
            case "runwayintersection":
            case "runwayelement":
                return {
                    fillOpacity: 1,
                    fillColor: 'hsl(0, 0%, 33%)',
                    stroke: false
                }
            case "runwaymarking":
                return {
                    fillOpacity: 1,
                    fillColor: '#fefefe',
                    stroke: false,
                }
            case "serviceroad":
                return {
                    fillOpacity: 1,
                    fillColor: 'hsl(240, 5%, 55%)',
                    stroke: false,
                }
            case "taxiwayelement":
                return {
                    fillOpacity: 1,
                    fillColor: 'hsl(0, 0%, 50%)',
                    stroke: false,
                }
            case 'taxiwayshoulder':
            case "runwayshoulder":
                return {
                    fillOpacity: 0.5,
                    fillColor: 'hsl(0, 0%, 65%)',
                    stroke: false,
                }
            case "standguidanceline":
            case "taxiwayguidanceline":
            case "runwayexitline":
                return {
                    stroke: true,
                    fill: false,
                    weight: 1.8,
                    dashArray: {
                        [LineStyle.Solid]: undefined,
                        [LineStyle.Unknown]: undefined,
                        [LineStyle.Dashed]: [3, 3],
                        [LineStyle.Dotted]: [3, 1],
                    }[feature?.properties.style as LineStyle],
                    color: {
                        [LineColor.Yellow]: 'yellow',
                        [LineColor.Unknown]: 'yellow',
                        [LineColor.Orange]: 'orange',
                        [LineColor.Blue]: 'white',
                        [LineColor.White]: 'white',
                    }[feature?.properties.color as LineColor]
                }
            case "arrestinggearlocation":
                return {
                    stroke: true,
                    fill: false,
                    color: '#ff00ff'
                }
            case "landandholdshortoperationlocation":
                return {
                    stroke: true,
                    fill: false,
                    color: '#00ff00'
                }
            case "verticalpolygonalstructure":
                return {
                    stroke: false,
                    fill: true,
                    fillOpacity: 1,
                    fillColor: feature?.properties.plysttyp === PolygonalStructureType.TerminalBuilding ? 'hsl(240, 25%, 30%)' : 'hsl(0, 0%, 30%)'
                }
            case "taxiwayholdingposition":
                return {
                    color: {
                        [StopbarCategory.None]: 'yellow',
                        [StopbarCategory.NotApplicable]: 'yellow',
                        [StopbarCategory.Unknown]: 'yellow',
                        [StopbarCategory.Cat1]: 'hsl(25, 100%, 50%)',
                        [StopbarCategory.Cat2Or3]: 'hsl(0, 100%, 50%)',
                    }[feature?.properties.catstop as StopbarCategory]
                }
            case "taxiwayintersectionmarking":
                return {
                    color: '#fefefe',
                    dashArray: [2, 2]
                }
            case "hotspot":
                return {
                    fill: true,
                    stroke: true,
                    color: '#ff00ff',
                    fillColor: '#89259D',
                    fillOpacity: 0.3
                }
            case "constructionarea":
                return {
                    stroke: false,
                    fillColor: '#ff0000',
                    fillOpacity: 0.1
                }
            case "frequencyarea":
                return {
                    fill: false,
                    color: 'green'
                }
            case "water":
                return {
                    color: '#004a61',
                    fillColor: '#003264',
                    fillOpacity: 1,
                }
            case "aerodromereferencepoint": return {
                radius: 15,
                color: 'white',
            }
            case "runwaythreshold":
            case "finalapproachandtakeoffarea":
            case "helipadthreshold":
            case "paintedcenterline":
            case "parkingstandlocation":
            case "touchdownliftoffarea":
            case "verticallinestructure":
            case "verticalpointstructure":
                return {
                    radius: 10
                }
        }

    }
}