import { AVWXSource, getWeatherApi } from "@navigraph/weather"
import { useQueries } from "@tanstack/react-query"
import { circleMarker, GeoJSON as LeafletGeoJSON } from "leaflet"
import { memo, useRef } from "react"
import { renderToString } from "react-dom/server"
import { GeoJSON } from "react-leaflet"
import { useRecoilValue } from "recoil"
import { avwxState } from "../../state/weather"
import JsonView from "../JsonView"

export const weatherColors: Record<AVWXSource, string> = {
  AIREP: "rgb(195, 48, 34)",
  AIRMET: "rgb(128, 128, 128)",
  CWA: "rgb(0, 80, 160)",
  GAIRMET: "rgb(160, 96, 0)",
  ISIGMET: "rgb(153, 0, 153)",
  METAR: "rgb(50, 185, 243)",
  SIGMET: "rgb(27, 136, 136)",
}

/**
 * Handles the rendering of Aviation Weather reports to the map
 */
const Avwx = memo(() => {
  const weatherApi = getWeatherApi()

  const sources = useRecoilValue(avwxState)

  // Queries reports for all of the selected AVWX layers
  const layers = useQueries({
    queries: sources.map(source => ({
      queryKey: ["avwx", source],
      queryFn: async () => [source, await weatherApi.getAviationWeatherReports([source])] as const,
    })),
  })

  // Store refs to the map layers so they can be updated based on selections
  const layersRef = useRef<Partial<Record<AVWXSource, LeafletGeoJSON>>>({})

  return layers.map(({ data }) => {
    if (!data) return null

    return (
      <GeoJSON
        ref={value => {
          layersRef.current[data[0]] = value ?? undefined
        }}
        key={data[0]}
        data={data[1]}
        style={{
          color: weatherColors[data[0]],
        }}
        pointToLayer={(feature, latlng) => {
          const marker = circleMarker(latlng)

          marker.feature = feature

          return marker
        }}
        onEachFeature={(feature, _layer) => {
          _layer.on("click", e => {
            const target = e.target as LeafletGeoJSON

            const feature = target.feature

            if (feature?.type === "Feature") {
              Object.values(layersRef.current).forEach(layer => {
                layer?.resetStyle()
              })

              target.setStyle({ color: "blue" })
            }
          })

          if (feature.properties) {
            _layer.bindPopup(
              renderToString(
                <div className="flex flex-col items-center gap-2">
                  <span className="text-ng-background-200">{data[0]}</span>
                  <JsonView content={feature.properties} />
                </div>,
              ),
            )
          }
        }}
      />
    )
  })
})

export default Avwx
