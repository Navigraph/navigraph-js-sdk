import { NavigraphRasterSource, NavigraphTheme } from "@navigraph/leaflet";
import { atom } from "recoil";

export const mapSourceState = atom<NavigraphRasterSource>({
    key: 'map-source',
    default: 'IFR HIGH'
});

export const mapThemeState = atom<NavigraphTheme>({
    key: 'map-theme',
    default: 'DAY'
});

export const mapFaaState = atom<boolean>({
    key: 'map-faa',
    default: false
});

export const mapTacState = atom<boolean>({
    key: 'map-tac',
    default: false
});