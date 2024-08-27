import { MapContainer, useMap, TileLayer } from "react-leaflet";
import { useEffect, useMemo, useRef } from "react";
import { Map } from "leaflet";
import { useRecoilValue } from "recoil";
import { appState } from "../state/app";
import { NavigraphRasterSource, NavigraphTheme, NavigraphTileLayer, PresetConfig } from "@navigraph/leaflet";
import { userState } from "../state/user";
import { NavigraphAuth } from "@navigraph/auth";
import { Scope } from "@navigraph/app";

import "leaflet/dist/leaflet.css"
import { mapFaaState, mapSourceState, mapTacState, mapThemeState } from "../state/mapStyle";

export function createPreset(source: NavigraphRasterSource, theme: NavigraphTheme, faa: boolean, tac: boolean): PresetConfig {
    if (source === 'WORLD') {
        return { source, theme, type: 'Navigraph' }
    }
    if (source === 'VFR' && faa) {
        return { source, theme, type: 'FAA', withTAC: tac ? true : undefined }
    }

    return { source, theme, type: faa ? 'FAA' : 'Navigraph' }
}

function NavigraphTiles({ auth }: { auth: NavigraphAuth }) {
    const map = useMap();

    const source = useRecoilValue(mapSourceState);
    const theme = useRecoilValue(mapThemeState);
    const faa = useRecoilValue(mapFaaState);
    const tac = useRecoilValue(mapTacState);

    const preset = useMemo<PresetConfig>(() => createPreset(source, theme, faa, tac), [source, theme, faa, tac]);

    console.log(preset)

    const ngLayer = useRef(new NavigraphTileLayer(auth, preset));

    useEffect(() => {
        ngLayer.current.addTo(map);

        return () => {
            ngLayer.current.removeFrom(map);
        }
    }, []);

    useEffect(() => {
        ngLayer.current.setPreset(preset)
    }, [preset]);

    return null;
}

export default function MapPane() {
    const mapRef = useRef<Map>(null);

    const app = useRecoilValue(appState);
    const user = useRecoilValue(userState);

    return (
        <div className='w-full'>
            <MapContainer center={[51.505, -0.09]} zoom={13} className='h-screen' zoomControl={false} ref={mapRef} whenReady={() => {
                setInterval(() => mapRef.current?.invalidateSize(), 1000)
            }}>
                {app && user?.scope.includes(Scope.TILES) ? (
                    <NavigraphTiles auth={app.auth} />
                ) : (
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                )}
            </MapContainer>
        </div>
    )
}
