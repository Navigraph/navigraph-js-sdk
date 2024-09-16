import { AmdbLayerName } from "@navigraph/amdb"
import { circleMarker, geoJson, GeoJSON } from "leaflet"
import { memo, useEffect, useRef } from "react"
import { renderToString } from "react-dom/server"
import { useMap } from "react-leaflet"
import { useRecoilValue } from "recoil"
import useAmdbLayers from "../../hooks/useAmdbLayers"
import { amdbLayersState } from "../../state/amdb"
import JsonView from "../JsonView"
import amdbStyle, { layerOrder } from "./amdbStyle"

/**
 * Handles the rendering of AMDB layers to the map for a specific airport
 */
function AmdbLayer({ idarpt, layerNames }: { idarpt: string; layerNames: AmdbLayerName[] }) {
  const map = useMap()

  const data = useAmdbLayers(idarpt, layerNames)

  // Store references to the layer instances
  const layers = useRef<{ layerName: AmdbLayerName; layer: GeoJSON }[]>([])

  // This use effect will run each time the layer data or layers to render has (probably) updated
  useEffect(() => {
    // Find layers which are no longer present in the queried data
    const toRemove = layers.current.filter(({ layerName }) => !data.some(([_layerName]) => _layerName === layerName))

    // Remove these layers from the map and from the stored references
    toRemove.forEach(({ layer }) => {
      map.removeLayer(layer)
      layers.current.splice(
        layers.current.findIndex(x => x.layer === layer),
        1,
      )
    })

    // Create layers which there is now queried data for, but no stored layer for it
    const newLayers = data.flatMap(([layerName, data]) => {
      if (data && !layers.current.some(x => x.layerName === layerName)) {
        return [
          {
            layerName,
            layer: geoJson(data, {
              style: amdbStyle,

              pointToLayer: (feature, latlng) => {
                const marker = circleMarker(latlng, amdbStyle(feature))

                marker.feature = feature

                return marker
              },

              onEachFeature: (feature, _layer) => {
                _layer.on("click", e => {
                  const target = e.target as GeoJSON

                  const feature = target.feature

                  if (feature?.type === "Feature") {
                    const style = amdbStyle(feature)

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
                        <span className="text-ng-background-200">{layerName}</span>
                        <JsonView content={feature.properties as unknown} />
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

    // Add the new layers to the map and store the references
    newLayers.forEach(({ layerName, layer }) => {
      map.addLayer(layer)
      layers.current.push({ layerName, layer })
    })

    // Sort the layers and bring them to front in that correct order to ensure they appear in the correct order on the map
    layers.current
      .sort((a, b) => layerOrder[b.layerName] - layerOrder[a.layerName])
      .forEach(({ layer }) => layer.bringToFront())
  }, [data, map])

  return null
}

/**
 * Handles the rendering of selected AMDB layers from selected airports to the leaflet map
 */
const AmdbManager = memo(() => {
  const amdbLayers = useRecoilValue(amdbLayersState)

  return amdbLayers.map(([idarpt, layerNames]) => <AmdbLayer idarpt={idarpt} layerNames={layerNames} />)
})

export default AmdbManager
