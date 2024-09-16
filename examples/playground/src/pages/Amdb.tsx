import { allLayers, getAmdbAPI } from "@navigraph/amdb"
import { Scope } from "@navigraph/app"
import { useQuery } from "@tanstack/react-query"
import { LatLng } from "leaflet"
import { useEffect, useState } from "react"
import { FaMagnifyingGlass } from "react-icons/fa6"
import SpinningCircles from "react-loading-icons/dist/esm/components/spinning-circles"
import { Link, Route, Routes, useParams } from "react-router-dom"
import { useRecoilState, useSetRecoilState } from "recoil"
import Button, { LargeButton } from "../components/Button"
import JsonView from "../components/JsonView"
import { protectedPage } from "../components/protectedPage"
import { TextField } from "../components/TextField"
import { amdbLayersState } from "../state/amdb"
import { mapCenterState } from "../state/map"

function AmdbPage({ amdb }: { amdb: ReturnType<typeof getAmdbAPI> }) {
  const { idarpt } = useParams()

  // Find metadata for a specific airport by using the searchAmdb function and then searching for the chosen airport
  // Most of the time searchAmdb will return only one airport, the correct one, if searching with the airports ICAO, but it is safe to then search for the matching one, incase one airports ICAO ends up as a substring of another airports name
  const { data: airport, isLoading } = useQuery({
    queryKey: ["amdb-search-specific", idarpt],
    queryFn: async () =>
      idarpt ? (await amdb.searchAmdb(idarpt))?.find(airport => airport.idarpt === idarpt) : undefined,
  })

  const [layers, setLayers] = useRecoilState(amdbLayersState)

  // Find the list of chosen layers for the chosen airport
  const airportLayers = layers.find(layers => layers[0] === airport?.idarpt)?.[1]

  const setMapCenter = useSetRecoilState(mapCenterState)

  useEffect(() => {
    // When the page is opened to a new airport, move the map to that airport
    if (airport) {
      setMapCenter({ latLng: new LatLng(airport?.coordinates.lat, airport?.coordinates.lon), options: { zoom: 12 } })
    }
  }, [airport, setMapCenter])

  if (isLoading) {
    return <SpinningCircles />
  }

  if (!airport) {
    return <span>{idarpt} has no AMDB data or does not exist</span>
  }

  // As we have made aerodromereferencepoint a required layer to be selected, it will never be part of the airportLayers state, and instead just be included by the map renderer if the airport has been added
  // TODO: Doing it this way is bad, adding the airport to the map should just add aerodromereferencepoint to the list but always have that toggle as disabled
  const allLayersSelected = allLayers.every(x => x === "aerodromereferencepoint" || airportLayers?.includes(x))

  return (
    <div className="px-3 flex flex-col items-center gap-3 min-h-0 pb-5">
      <Link to="/amdb">
        <Button onClick={() => null} className="absolute left-2 w-min">
          Back
        </Button>
      </Link>

      <h1>
        {airport.idarpt}/{airport.iata}
      </h1>
      <span className="text-sm">{airport.name}</span>

      {airportLayers === undefined ? (
        <LargeButton onClick={() => setLayers([...layers, [airport.idarpt, []]])}>Add to Map</LargeButton>
      ) : (
        <>
          <div className="flex flex-col overflow-auto gap-3">
            <Button selected disabled onClick={() => null}>
              aerodromereferencepoint
            </Button>
            <Button
              onClick={() => {
                if (allLayersSelected) {
                  setLayers([...layers.filter(x => x[0] !== airport.idarpt), [airport.idarpt, []]])
                } else {
                  setLayers([
                    ...layers.filter(x => x[0] !== airport.idarpt),
                    [airport.idarpt, allLayers.filter(x => x !== "aerodromereferencepoint")],
                  ])
                }
              }}
              selected={allLayersSelected}>
              All Layers
            </Button>

            {allLayers.map(layer => {
              if (layer === "aerodromereferencepoint") return null

              return (
                <Button
                  key={layer}
                  className="px-5"
                  selected={airportLayers.includes(layer)}
                  onClick={() => {
                    if (airportLayers.includes(layer)) {
                      setLayers([
                        ...layers.filter(x => x[0] !== airport.idarpt),
                        [airport.idarpt, airportLayers.filter(x => x !== layer)],
                      ])
                    } else {
                      setLayers([
                        ...layers.filter(x => x[0] !== airport.idarpt),
                        [airport.idarpt, [...airportLayers, layer]],
                      ])
                    }
                  }}>
                  {layer}
                </Button>
              )
            })}
          </div>
          <LargeButton onClick={() => setLayers(layers.filter(x => x[0] !== airport.idarpt))}>
            Remove from Map
          </LargeButton>
        </>
      )}
    </div>
  )
}

function AmdbSearch({ amdb }: { amdb: ReturnType<typeof getAmdbAPI> }) {
  const [query, setQuery] = useState("")

  // Use the AMDB search endpoint based upon the current query string
  const { data: response, isLoading } = useQuery({
    queryKey: ["amdb-search", query],
    queryFn: () => amdb.searchAmdb(query),
    enabled: !!query,
  })

  return (
    <>
      <TextField label="Query" icon={FaMagnifyingGlass} value={query} onChange={setQuery} />

      {isLoading && <SpinningCircles />}
      {response && (
        <div className="overflow-auto space-y-3 px-3 self-stretch">
          {response &&
            response.map(item => (
              <Link to={`/amdb/${item.idarpt}`} key={item.idarpt}>
                <JsonView onClick={() => null} content={item} />
              </Link>
            ))}
        </div>
      )}
    </>
  )
}

const Amdb = protectedPage(
  ({ amdb }) => {
    return (
      <div className="page-container flex flex-col gap-3 items-center relative">
        <h1>AMDB</h1>

        <Routes>
          <Route index element={<AmdbSearch amdb={amdb} />} />
          <Route path=":idarpt" element={<AmdbPage amdb={amdb} />} />
        </Routes>
      </div>
    )
  },
  [Scope.AMDB],
)

export default Amdb
