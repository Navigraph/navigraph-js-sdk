import { AVWX_SOURCES, getWeatherApi } from "@navigraph/weather"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { BiTrash } from "react-icons/bi"
import { FaMagnifyingGlass } from "react-icons/fa6"
import SpinningCircles from "react-loading-icons/dist/esm/components/spinning-circles"
import { useRecoilState, useSetRecoilState } from "recoil"
import Button from "../components/Button"
import JsonView from "../components/JsonView"
import { weatherColors } from "../components/map/AviationWeather"
import { protectedPage } from "../components/protectedPage"
import SegmentControl from "../components/SegmentControl"
import { TextField } from "../components/TextField"
import {
  avwxState,
  metarTafMarkersState,
  weatherRouteEditState,
  weatherRouteRangeState,
  weatherRouteState,
  weatherRouteTypeState,
} from "../state/weather"

function AirportPage() {
  const [icao, setIcao] = useState("")

  const [page, setPage] = useState(0)

  const weatherApi = getWeatherApi()

  const setMetarTafMarkers = useSetRecoilState(metarTafMarkersState)

  const { data: metar, isLoading: metarLoading } = useQuery({
    queryKey: ["metar", icao],
    queryFn: () => {
      return weatherApi.getMetarsAtAirport(icao)
    },
    enabled: icao.length === 4,
  })

  const { data: taf, isLoading: tafLoading } = useQuery({
    queryKey: ["taf", icao],
    queryFn: () => {
      return weatherApi.getTafsAtAirport(icao)
    },
    enabled: icao.length === 4,
  })

  useEffect(() => {
    if (page === 0) {
      setMetarTafMarkers(metar ?? [])
    } else {
      setMetarTafMarkers(taf ?? [])
    }

    return () => {
      setMetarTafMarkers([])
    }
  }, [setMetarTafMarkers, page, metar, taf])

  return (
    <>
      <TextField label="Airport ICAO" icon={FaMagnifyingGlass} value={icao} onChange={setIcao} />
      <SegmentControl index={page} onChange={setPage} segments={["Metar", "Taf"]} />

      {(metarLoading || tafLoading) && <SpinningCircles />}

      <div className="flex flex-col gap-3 overflow-auto px-3 self-stretch">
        {page === 0 &&
          metar &&
          metar.map(metar => (
            <div>
              <JsonView content={metar} />
            </div>
          ))}
        {page === 1 &&
          taf &&
          taf.map(taf => (
            <div>
              <JsonView content={taf} />
            </div>
          ))}
      </div>
    </>
  )
}

function RoutePage() {
  const [route, setRoute] = useRecoilState(weatherRouteState)

  const [reportType, setReportType] = useRecoilState(weatherRouteTypeState)

  const [reportRange, setReportRange] = useRecoilState(weatherRouteRangeState)

  const [editActive, setEditActive] = useRecoilState(weatherRouteEditState)

  const [page, setPage] = useState(0)

  const weatherApi = getWeatherApi()

  const setMetarTafMarkers = useSetRecoilState(metarTafMarkersState)

  const { data, isLoading } = useQuery({
    queryKey: ["route-reports", route, reportType, reportRange],
    queryFn: () => {
      return weatherApi.getReportsAlongRoute(
        route.map(({ lat, lng }) => [lng, lat]),
        reportType,
        reportRange,
      )
    },
    enabled: route.length >= 2,
  })

  useEffect(() => {
    setMetarTafMarkers(data ?? [])

    return () => {
      setMetarTafMarkers([])
    }
  }, [setMetarTafMarkers, data])

  return (
    <>
      <SegmentControl segments={["Positions", "Reports"]} index={page} onChange={setPage} />
      {page === 0 && (
        <>
          <div className="flex flex-col items-center gap-3 overflow-auto w-full px-2">
            {route.map((point, i) => (
              <div className="flex gap-1 items-center justify-between w-full">
                <span className="text-sm font-mono">
                  {Math.abs(point.lat).toFixed(8)}&deg; <b>{point.lat > 0 ? "N" : "S"}</b>
                  &nbsp;
                  {Math.abs(point.lng).toFixed(8)}&deg; <b>{point.lng > 0 ? "E" : "W"}</b>
                </span>
                <Button
                  onClick={() => {
                    setRoute([...route.filter((_, j) => i !== j)])
                  }}>
                  <BiTrash />
                </Button>
              </div>
            ))}
          </div>
          <div className="flex gap-1 justify-between w-full">
            <Button onClick={() => setRoute([])}>Delete All</Button>
            {editActive ? (
              <Button onClick={() => setEditActive(false)}>Finish</Button>
            ) : (
              <Button onClick={() => setEditActive(true)}>Add Points</Button>
            )}
          </div>
        </>
      )}
      {page === 1 && (
        <>
          <select onChange={e => setReportType(e.target.value as "metar" | "taf")} value={reportType}>
            <option value="metar">Metar</option>
            <option value="taf">Taf</option>
          </select>
          <select onChange={e => setReportRange(parseInt(e.target.value))} value={reportRange}>
            <option value={5}>5nm</option>
            <option value={10}>10nm</option>
            <option value={20}>20nm</option>
            <option value={40}>40nm</option>
            <option value={90}>90nm</option>
          </select>
          {isLoading ? (
            <SpinningCircles />
          ) : data ? (
            <div className="flex flex-col gap-3 overflow-auto px-3 self-stretch">
              {data.map(report => (
                <div>
                  <JsonView content={report} />
                </div>
              ))}
            </div>
          ) : (
            <span>No Reports found</span>
          )}
        </>
      )}
    </>
  )
}

function AvwxPage() {
  const [sources, setSources] = useRecoilState(avwxState)

  return (
    <div className="flex flex-col gap-3">
      {AVWX_SOURCES.map(source => (
        <Button
          key={source}
          selectedColor={weatherColors[source]}
          className="px-5"
          selected={sources.includes(source)}
          onClick={() => {
            if (sources.includes(source)) {
              setSources([...sources.filter(x => x !== source)])
            } else {
              setSources([...sources.filter(x => x !== source), source])
            }
          }}>
          {source}
        </Button>
      ))}
    </div>
  )
}

const Weather = protectedPage(() => {
  const [page, setPage] = useState(0)

  return (
    <div className="page-container flex flex-col items-center gap-3 px-3 pb-3">
      <h1>Weather</h1>

      <SegmentControl index={page} onChange={setPage} segments={["Airport", "Route", "AVWX"]} />

      {page === 0 && <AirportPage />}
      {page === 1 && <RoutePage />}
      {page === 2 && <AvwxPage />}
    </div>
  )
}, [])

export default Weather
