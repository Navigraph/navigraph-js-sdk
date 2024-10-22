import { memo } from "react"
import { Marker, Popup } from "react-leaflet"
import { useRecoilValue } from "recoil"
import { metarTafMarkersState } from "../../state/weather"
import JsonView from "../JsonView"

const MetarTaf = memo(() => {
  const markers = useRecoilValue(metarTafMarkersState)

  return [
    ...markers.flatMap(({ latitude, longitude, ...data }) => {
      if (!latitude || !longitude) return

      return (
        <Marker position={{ lat: latitude, lng: longitude }}>
          <Popup>
            <JsonView content={data} />
          </Popup>
        </Marker>
      )
    }),
  ]
})

export default MetarTaf
