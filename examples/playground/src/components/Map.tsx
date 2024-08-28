import { MapContainer, useMap, TileLayer, ImageOverlay } from "react-leaflet";
import { useEffect, useMemo, useRef } from "react";
import { LatLngBounds, Map } from "leaflet";
import { useRecoilState, useRecoilValue } from "recoil";
import { appState } from "../state/app";
import { NavigraphRasterSource, NavigraphTheme, NavigraphTileLayer, PresetConfig } from "@navigraph/leaflet";
import { userState } from "../state/user";
import { NavigraphAuth } from "@navigraph/auth";
import { Scope } from "@navigraph/app";

import "leaflet/dist/leaflet.css"
import { mapFaaState, mapSourceState, mapTacState, mapThemeState } from "../state/mapStyle";
import { chartOverlayOpacityState, chartOverlayState } from "../state/chartOverlay";
import { calculateChartBounds } from "@navigraph/charts";
import { useQuery } from "@tanstack/react-query";
import { protectedPage } from "./protectedPage";
import { TbCircleX } from "react-icons/tb";
import Button from "./Button";

export function createPreset(source: NavigraphRasterSource, theme: NavigraphTheme, faa: boolean, tac: boolean): PresetConfig {
    if (source === 'WORLD') {
        return { source, theme, type: 'Navigraph' }
    }
    if (source === 'VFR' && faa) {
        return { source, theme, type: 'FAA', withTAC: tac ? true : undefined }
    }

    return { source, theme, type: faa ? 'FAA' : 'Navigraph' }
}

const ChartOverlay = protectedPage(({ charts }) => {
    const theme = useRecoilValue(mapThemeState);

    const opacity = useRecoilValue(chartOverlayOpacityState);

    const chart = useRecoilValue(chartOverlayState);

    const map = useMap();

    const bounds = useMemo(() => {
        if (!chart || !chart.is_georeferenced) return;

        const { sw, ne } = calculateChartBounds(chart);

        return new LatLngBounds(sw, ne);
    }, [chart]);

    useEffect(() => {
        if (bounds) {
            map.flyToBounds(bounds)
        }
    }, [bounds]);

    const { data: urls } = useQuery({
        queryKey: ['chart-overlay-urls', chart],
        queryFn: async () => {
            if (!chart) return null;

            const blobs = await Promise.all([charts.getChartImage({ chart, theme: 'light' }), charts.getChartImage({ chart, theme: 'dark' })]);

            return blobs.map((blob) => blob ? URL.createObjectURL(blob) : null);
        }
    })

    if (!bounds || !urls?.[0] || !urls?.[1]) return null;

    return (
        <ImageOverlay
            url={theme === 'DAY' ? urls[0] : urls[1]}
            bounds={bounds}
            opacity={opacity}
        />
    )
}, [Scope.CHARTS]);

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

function OverlayControls() {
    const [opacity, setOpacity] = useRecoilState(chartOverlayOpacityState);

    const [chart, setChart] = useRecoilState(chartOverlayState);

    if (!chart) return null;

    return (
        <div className='absolute right-5 top-5 bg-blue-gray-500 z-[999] p-2 rounded-md flex flex-col gap-2'>
            <div className="flex justify-between items-center gap-3">
                <span className="text-xs">{chart.index_number}: {chart.name}</span>
                <TbCircleX className="text-white hover:text-blue-25 cursor-pointer" size={25} onClick={() => setChart(null)} />
            </div>
            <div className="flex gap-2">
                <Button selected={opacity === 1} onClick={() => setOpacity(1)}><span className="text-white text-xs">100%</span></Button>
                <Button selected={opacity === 0.9} onClick={() => setOpacity(0.9)}><span className="text-white text-xs">90%</span></Button>
                <Button selected={opacity === 0.7} onClick={() => setOpacity(0.7)}><span className="text-white text-xs">70%</span></Button>
            </div>
        </div>
    )
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
                <OverlayControls />
                {app && user?.scope.includes(Scope.TILES) ? (
                    <NavigraphTiles auth={app.auth} />
                ) : (
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                )}
                <ChartOverlay />
            </MapContainer>
        </div>
    )
}
