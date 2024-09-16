import { DeviceFlowParams } from "@navigraph/auth"
import { atom } from "recoil"

export const authState = atom<DeviceFlowParams | null>({
  key: "auth-state",
  default: null,
})
