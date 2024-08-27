import { atom } from "recoil";
import { DeviceFlowParams } from "@navigraph/auth";

export const authState = atom<DeviceFlowParams | null>({
    key: 'auth-state',
    default: null
}); 