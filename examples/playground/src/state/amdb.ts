import { AmdbLayerName } from "@navigraph/amdb"
import { atom } from "recoil"

export const amdbLayersState = atom<[string, Exclude<AmdbLayerName, "aerodromereferencepoint">[]][]>({
  key: "amdb-layers",
  default: [],
})
