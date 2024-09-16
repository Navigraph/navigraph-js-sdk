import { NavigraphRasterSource, NavigraphTheme } from "@navigraph/leaflet"
import { LatLng } from "leaflet"
import { atom } from "recoil"

export const mapSourceState = atom<NavigraphRasterSource>({
  key: "map-source",
  default: "IFR HIGH",
})

export const mapThemeState = atom<NavigraphTheme>({
  key: "map-theme",
  default: "DAY",
})

export const mapFaaState = atom<boolean>({
  key: "map-faa",
  default: false,
})

export const mapTacState = atom<boolean>({
  key: "map-tac",
  default: false,
})

export const mapVisibleState = atom<boolean>({
  key: "map-visible",
  default: true,
})

export const mapCenterState = atom<{
  latLng: LatLng
  options?: {
    zoom?: number
    minZoom?: number
  }
} | null>({
  key: "map-center",
  default: null,
})
