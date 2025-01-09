import { Feature, LineString, Point, Polygon } from "geojson"
import { FeatureType } from "../enums"

export type AmdbFeature<P, F extends FeatureType, G extends Point | LineString | Polygon> = Feature<
  G,
  {
    /** Unique identifier for this feature instance. Only unique per feature type */
    id: number

    feattype: F

    /**
     * ICAO aerodrome location indicator
     *
     * Example: `NZCH`
     */
    idarpt: string
  } & P &
    (G extends Polygon
      ? { centroid: Point }
      : G extends LineString
      ? { midpoint: F extends FeatureType.AsrnEdge ? undefined : Point } // This AsrnEdge check isn't very nice, but its neccessary since it is the only table without a populated midpoint value
      : Record<string, never>)
>
