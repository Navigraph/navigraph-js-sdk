import { AVWXSource } from "@navigraph/weather"
import { LatLng } from "leaflet"
import { atom } from "recoil"

export const avwxState = atom<AVWXSource[]>({
  key: "avwx-state",
  default: [],
})

export const weatherRouteState = atom<LatLng[]>({
  key: "weather-route",
  default: [],
})

export const weatherRouteEditState = atom<boolean>({
  key: "weather-route-edit",
  default: false,
})

export const weatherRouteRangeState = atom<number>({
  key: "weather-route-range",
  default: 5,
})

export const weatherRouteTypeState = atom<"metar" | "taf">({
  key: "weather-route-type",
  default: "metar",
})
