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
  } & P
>
