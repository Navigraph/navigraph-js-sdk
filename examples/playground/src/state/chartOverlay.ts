import { Chart } from "@navigraph/charts"
import { atom } from "recoil"

export const chartOverlayState = atom<Chart | null>({
  key: "chartOverlayState",
  default: null,
})

export const chartOverlayOpacityState = atom<number>({
  key: "chartOverlayOpacityState",
  default: 1,
})
