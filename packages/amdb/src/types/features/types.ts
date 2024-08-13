import { Feature, LineString, Point, Polygon } from "geojson"
import { FeatureType } from "../enums"

type Properties<F extends FeatureType, P> = {
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

export type AmdbFeature<P, F extends FeatureType, G extends Point | LineString | Polygon> = Feature<G, Properties<F, P>>
