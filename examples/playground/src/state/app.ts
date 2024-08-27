import { NavigraphApp } from "@navigraph/app";
import { NavigraphAuth } from "@navigraph/auth";
import { atom } from "recoil";

export const appState = atom<{ config: NavigraphApp, auth: NavigraphAuth } | undefined>({
    key: 'app-state',
    default: undefined
}); 