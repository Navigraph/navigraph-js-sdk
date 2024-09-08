import { AmdbLayerName, getAmdbAPI } from "@navigraph/amdb"
import { useQueries } from "@tanstack/react-query"
import { circleMarker, geoJson, GeoJSON } from "leaflet"
import { memo, useEffect, useRef } from "react"
import { renderToString } from "react-dom/server"
import { useMap } from "react-leaflet"
import { useRecoilValue } from "recoil"
import { amdbLayersState } from "../../state/amdb"
import JsonView from "../JsonView"
import amdbStyle, { layerOrder } from "./amdbStyle"

const AmdbManager = memo(() => {
  const amdb = getAmdbAPI()

  const map = useMap()

  const amdbLayers = useRecoilValue(amdbLayersState)

  const data = useQueries({
    queries: amdbLayers.flatMap(([idarpt, layers]) =>
      layers.map(layer => ({
        queryKey: ["amdb-data", idarpt, layer],
        queryFn: async () => ({ idarpt, layer, data: await amdb.getAmdbLayer({ icao: idarpt, layer }) }),
      })),
    ),
  })

  const layers = useRef<{ idarpt: string; layerName: AmdbLayerName; layer: GeoJSON }[]>([])

  useEffect(() => {
    const toRemove = layers.current.filter(
      ({ idarpt, layerName }) => !data.some(({ data }) => data?.idarpt === idarpt && data?.layer === layerName),
    )

    toRemove.forEach(({ layer }) => {
      map.removeLayer(layer)
      layers.current.splice(
        layers.current.findIndex(x => x.layer === layer),
        1,
      )
    })

    const newLayers = data.flatMap(({ data }) => {
      if (
        data?.data &&
        !layers.current.some(({ idarpt, layerName }) => idarpt === data.idarpt && layerName === data.layer)
      ) {
        return [
          {
            idarpt: data.idarpt,
            layerName: data.layer,
            layer: geoJson(data.data, {
              style: amdbStyle(data.layer),

              pointToLayer: (feature, latlng) => {
                const marker = circleMarker(latlng, amdbStyle(data.layer)(feature))

                marker.feature = feature

                return marker
              },

              onEachFeature: (feature, _layer) => {
                _layer.on("click", e => {
                  const target = e.target as GeoJSON

                  const feature = target.feature

                  if (feature?.type === "Feature") {
                    const style = amdbStyle(data.layer)(feature)

                    style.stroke = true
                    style.color = "blue"

                    layers.current.forEach(({ layer }) => {
                      layer.resetStyle()
                    })

                    target.setStyle(style)
                  }
                })

                if (feature.properties) {
                  _layer.bindPopup(
                    renderToString(
                      <div className="flex flex-col items-center gap-2">
                        <span className="text-ng-background-200">{data.layer}</span>
                        <JsonView content={feature.properties} />
                      </div>,
                    ),
                  )
                }
              },
            }),
          },
        ]
      }

      return []
    })

    newLayers.forEach(({ idarpt, layerName, layer }) => {
      map.addLayer(layer)
      layers.current.push({ idarpt, layerName, layer })
    })

    layers.current
      .sort((a, b) => layerOrder[b.layerName] - layerOrder[a.layerName])
      .forEach(({ layer }) => layer.bringToFront())
  }, [data, map])

  return null
})

export default AmdbManager
