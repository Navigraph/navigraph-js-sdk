import { User } from "@navigraph/auth"
import { atom } from "recoil"

export const userState = atom<User | null>({
  key: "user-state",
  default: null,
})
