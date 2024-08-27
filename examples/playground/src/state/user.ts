import { atom } from "recoil";
import { User } from "@navigraph/auth";

export const userState = atom<User | null>({
    key: 'user-state',
    default: null
}); 