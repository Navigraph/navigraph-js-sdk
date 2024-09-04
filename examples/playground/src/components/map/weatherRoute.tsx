import { LatLng, LeafletMouseEvent } from "leaflet"
import { useEffect, useState } from "react"
import { Marker, Polyline, useMap } from "react-leaflet"
import { useRecoilState } from "recoil"
import { weatherRouteEditState, weatherRouteState } from "../../state/weather"

export default function WeatherRouteManager() {
  const map = useMap()

  const [editActive, setEditActive] = useRecoilState(weatherRouteEditState)

  const [route, setRoute] = useRecoilState(weatherRouteState)

  const [nextPosition, setNextPosition] = useState<LatLng | null>(null)

  useEffect(() => {
    const clickCallback = (e: LeafletMouseEvent) => {
      if (editActive) {
        setRoute([...route, e.latlng])
      }
    }

    const mouseMoveCallback = (e: LeafletMouseEvent) => {
      if (editActive) {
        setNextPosition(e.latlng)
      }
    }

    if (!editActive) {
      setNextPosition(null)
    }

    map.on("click", clickCallback)
    map.on("mousemove", mouseMoveCallback)

    return () => {
      map.off("click", clickCallback)
      map.off("mousemove", mouseMoveCallback)
    }
  }, [editActive, map, route, setRoute])

  useEffect(() => {
    const callback = (e: KeyboardEvent) => {
      if (e.key === "Enter" && editActive) {
        setEditActive(false)
      }
    }

    document.addEventListener("keydown", callback)

    return () => {
      document.removeEventListener("keydown", callback)
    }
  }, [editActive, setEditActive])

  return (
    <>
      <Polyline positions={route} />
      {nextPosition && route.length >= 1 && (
        <Polyline color="red" positions={[route[route.length - 1], nextPosition]} />
      )}
      {nextPosition && <Marker position={nextPosition} />}
    </>
  )
}
