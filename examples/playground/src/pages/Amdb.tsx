import JsonView from "../components/JsonView";
import { protectedPage } from "../components/protectedPage";
import { Scope } from "@navigraph/app";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { TextField } from "../components/TextField";
import SpinningCircles from "react-loading-icons/dist/esm/components/spinning-circles";
import { Link, Route, Routes, useParams } from "react-router-dom";
import { allLayers, getAmdbAPI } from "@navigraph/amdb";
import { useRecoilState } from "recoil";
import { amdbLayersState } from "../state/amdb";
import Button, { LargeButton } from "../components/Button";

function AmdbPage({ amdb }: { amdb: ReturnType<typeof getAmdbAPI> }) {
    const { idarpt } = useParams();

    const { data: airport, isLoading } = useQuery({
        queryKey: ['amdb-search'],
        queryFn: async () => (await amdb.searchAmdb(idarpt!))?.find((airport) => airport.idarpt === idarpt!)
    });

    const [layers, setLayers] = useRecoilState(amdbLayersState);

    const airportLayers = layers.find((layers) => layers[0] === airport?.idarpt)?.[1];

    if (isLoading) {
        return <SpinningCircles />
    }

    if (!airport) {
        return <span>{idarpt} has no AMDB data or does not exist</span>
    }

    return (
        <div className="px-3 flex flex-col items-center gap-3 min-h-0 pb-5">
            <h1>{airport.idarpt}/{airport.iata}</h1>
            <span className="text-sm">{airport.name}</span>

            {airportLayers === undefined ?
                <LargeButton onClick={() => setLayers([...layers, [airport.idarpt, []]])}>Add to Map</LargeButton> :
                <>
                    <div className="flex flex-col overflow-auto gap-3">
                        <Button selected disabled onClick={() => null}>aerodromereferencepoint</Button>
                        {allLayers.map((layer) => {
                            if (layer === 'aerodromereferencepoint') return null;

                            return (
                                <Button
                                    className="px-5"
                                    selected={airportLayers.includes(layer)}
                                    onClick={() => {
                                        if (airportLayers.includes(layer)) {
                                            setLayers([...layers.filter((x) => x[0] !== airport.idarpt), [airport.idarpt, airportLayers.filter((x) => x !== layer)]])
                                        } else {
                                            setLayers([...layers.filter((x) => x[0] !== airport.idarpt), [airport.idarpt, [...airportLayers, layer]]])
                                        }
                                    }}
                                >
                                    {layer}
                                </Button>
                            )
                        })}
                    </div>
                    <LargeButton onClick={() => setLayers(layers.filter((x) => x[0] !== airport.idarpt))}>Remove from Map</LargeButton>
                </>
            }


        </div >
    )
}

function AmdbSearch({ amdb }: { amdb: ReturnType<typeof getAmdbAPI> }) {
    const [query, setQuery] = useState('');

    const { data: response, isLoading } = useQuery({
        queryKey: ['amdb-search', query],
        queryFn: () => amdb.searchAmdb(query),
        enabled: !!query
    })

    return (
        <>
            <TextField label="Query" icon={FaMagnifyingGlass} value={query} onChange={setQuery} />

            {isLoading && <SpinningCircles />}
            {response &&
                <div className="overflow-auto space-y-3 px-3 self-stretch">
                    {response && response.map((item) =>
                        <Link to={`/amdb/${item.idarpt}`}>
                            <JsonView onClick={() => null} content={item} />
                        </Link>
                    )}
                </div >
            }
        </>
    );
}

const Amdb = protectedPage(({ amdb }) => {
    return (
        <div className="page-container flex flex-col gap-3 items-center">
            <h1>AMDB</h1>

            <Routes>
                <Route index element={<AmdbSearch amdb={amdb} />} />
                <Route path=":idarpt" element={<AmdbPage amdb={amdb} />} />
            </Routes>
        </div>
    )
}, [Scope.AMDB]);

export default Amdb;
