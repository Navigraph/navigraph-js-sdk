import { Scope } from "@navigraph/app"
import { NavigraphAuth } from "@navigraph/auth"
import { NavigraphRasterSource, NavigraphTheme, NavigraphTileLayer, PresetConfig } from "@navigraph/leaflet"
import { LatLngBounds, Map } from "leaflet"
import { useEffect, useMemo, useRef } from "react"
import { ImageOverlay, MapContainer, TileLayer, useMap } from "react-leaflet"
import { useRecoilState, useRecoilValue } from "recoil"
import "leaflet/dist/leaflet.css"
import { calculateChartBounds } from "@navigraph/charts"
import { TbCircleX } from "react-icons/tb"
import useChartImage from "../../hooks/useChartImage"
import { useNavigraphAuth } from "../../hooks/useNavigraphAuth"
import { chartOverlayOpacityState, chartOverlayState } from "../../state/chartOverlay"
import {
  mapCenterState,
  mapFaaState,
  mapSourceState,
  mapTacState,
  mapThemeState,
  mapVisibleState,
} from "../../state/map"
import Button from "../Button"
import AmdbManager from "./AmdbManager"
import AviationWeather from "./AviationWeather"
import MetarTaf from "./MetarTaf"
import WeatherRouteManager from "./weatherRoute"

/**
 * Creates a Navigraph tiles preset config based on the 4 properties needed
 */
export function createPreset(
  source: NavigraphRasterSource,
  theme: NavigraphTheme,
  faa: boolean,
  tac: boolean,
): PresetConfig {
  if (source === "WORLD") {
    return { source, theme, type: "Navigraph" }
  }
  if (source === "VFR" && faa) {
    return { source, theme, type: "FAA", withTAC: tac ? true : undefined }
  }

  return { source, theme, type: faa ? "FAA" : "Navigraph" }
}

/**
 * Handles the rendering of the currently selected chartOverlay to the leaflet map
 */
const ChartOverlay = () => {
  const theme = useRecoilValue(mapThemeState)

  const opacity = useRecoilValue(chartOverlayOpacityState)

  const chart = useRecoilValue(chartOverlayState)

  const map = useMap()

  const bounds = useMemo(() => {
    if (!chart || !chart.is_georeferenced) return

    const { sw, ne } = calculateChartBounds(chart)

    return new LatLngBounds(sw, ne)
  }, [chart])

  // If the bounds object changes, (meaning the chart has changed), move the map to the bounds of the new chart
  useEffect(() => {
    if (bounds) {
      map.flyToBounds(bounds)
    }
  }, [bounds, map])

  const url = useChartImage(chart, theme)

  if (!url || !bounds) return null

  return <ImageOverlay url={url} bounds={bounds} opacity={opacity} />
}

function NavigraphTiles({ auth }: { auth: NavigraphAuth }) {
  const map = useMap()

  const source = useRecoilValue(mapSourceState)
  const theme = useRecoilValue(mapThemeState)
  const faa = useRecoilValue(mapFaaState)
  const tac = useRecoilValue(mapTacState)

  const preset = useMemo<PresetConfig>(() => createPreset(source, theme, faa, tac), [source, theme, faa, tac])

  const ngLayer = useRef(new NavigraphTileLayer(auth, preset))

  useEffect(() => {
    const layer = ngLayer.current

    layer.addTo(map)

    return () => {
      layer.removeFrom(map)
    }
  }, [map])

  useEffect(() => {
    ngLayer.current.setPreset(preset)
  }, [preset])

  return null
}

function OverlayControls() {
  const [opacity, setOpacity] = useRecoilState(chartOverlayOpacityState)

  const [chart, setChart] = useRecoilState(chartOverlayState)

  if (!chart) return null

  return (
    <div className="absolute right-5 top-16 bg-blue-gray-500 z-[999] p-2 rounded-md flex flex-col gap-2">
      <div className="flex justify-between items-center gap-3">
        <span className="text-xs">
          {chart.index_number}: {chart.name}
        </span>
        <TbCircleX className="text-white hover:text-blue-25 cursor-pointer" size={25} onClick={() => setChart(null)} />
      </div>
      <div className="flex gap-2">
        <Button selected={opacity === 1} onClick={() => setOpacity(1)}>
          <span className="text-white text-xs">100%</span>
        </Button>
        <Button selected={opacity === 0.9} onClick={() => setOpacity(0.9)}>
          <span className="text-white text-xs">90%</span>
        </Button>
        <Button selected={opacity === 0.7} onClick={() => setOpacity(0.7)}>
          <span className="text-white text-xs">70%</span>
        </Button>
      </div>
    </div>
  )
}

export default function MapPane() {
  const mapRef = useRef<Map>(null)

  const mapCenter = useRecoilValue(mapCenterState)

  useEffect(() => {
    if (mapCenter) {
      mapRef.current?.flyTo(mapCenter.latLng, mapCenter.options?.zoom)
    }
  }, [mapCenter])

  const { auth, user } = useNavigraphAuth()

  const [mapVisible, setMapVisible] = useRecoilState(mapVisibleState)

  return (
    <div className="w-full">
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        className="h-screen bg-black cursor-pointer"
        zoomControl={false}
        ref={mapRef}
        whenReady={() => {
          setInterval(() => mapRef.current?.invalidateSize(), 1000)
        }}>
        {mapVisible &&
          (auth && user?.scope.includes(Scope.TILES) ? (
            <NavigraphTiles auth={auth} />
          ) : (
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          ))}
        {user?.scope.includes(Scope.CHARTS) && <ChartOverlay />}
        <WeatherRouteManager />
        <AviationWeather />
        <MetarTaf />
        {user?.scope.includes(Scope.AMDB) && <AmdbManager />}
      </MapContainer>
      <OverlayControls />
      <Button
        selected={mapVisible}
        className="absolute top-5 right-5 z-[999]"
        onClick={() => setMapVisible(!mapVisible)}>
        Map Visible
      </Button>
    </div>
  )
}
