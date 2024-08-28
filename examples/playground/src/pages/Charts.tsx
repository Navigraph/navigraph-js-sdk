import { FaMagnifyingGlass } from "react-icons/fa6";
import { TextField } from "../components/TextField";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Scope } from "@navigraph/app";
import { protectedPage } from "../components/protectedPage";
import { AirportInfo, Chart, getChartsAPI } from "@navigraph/charts";
import SpinningCircles from "react-loading-icons/dist/esm/components/spinning-circles";
import JsonView from "../components/JsonView";
import SegmentControl from "../components/SegmentControl";
import clsx from "clsx";
import Button from "../components/Button";
import { IoLayers } from "react-icons/io5";
import { LuTableProperties } from "react-icons/lu";
import { useRecoilState } from "recoil";
import { chartOverlayState } from "../state/chartOverlay";

enum ChartCategory {
    STAR,
    APP,
    TAXI,
    SID,
    REF
}

const categoryKeys = [
    'ARR',
    'APP',
    'APT',
    'DEP',
    'REF'
]

function ChartRow({ chart }: { chart: Chart }) {
    const [open, setOpen] = useState(false);

    const [chartOverlay, setChartOverlay] = useRecoilState(chartOverlayState);

    return (
        <div className="max-h-96 flex flex-col gap-1">
            <div className="py-1 px-4 border-y-[0.5px] border-ng-background-500 flex gap-2 items-center justify-between hover:bg-ng-background-300 cursor-pointer">
                <span className="text-sm font-semibold">{chart.name}<br />{chart.index_number}</span>
                <div className="flex gap-2">
                    {chart.is_georeferenced && <Button selected={chartOverlay?.id === chart.id} onClick={() => setChartOverlay(chart)}><IoLayers className="text-gray-25" size={20} /></Button>}
                    <Button selected={open} onClick={() => setOpen((x) => !x)}><LuTableProperties className="text-gray-25" size={20} /></Button>
                </div>
            </div>
            {open && <JsonView content={chart} />}
        </div>
    )
}

function ChartsPage({ airport, charts }: { airport: AirportInfo, charts: ReturnType<typeof getChartsAPI> }) {
    const { data: index, isLoading } = useQuery({
        queryKey: ['charts-index', airport.icao_airport_identifier],
        queryFn: () => charts.getChartsIndex({ icao: airport.icao_airport_identifier }),
    })

    const [category, setCategory] = useState(ChartCategory.STAR);

    if (isLoading) return <SpinningCircles />

    if (!index) return null;

    return (
        <>
            <SegmentControl
                segments={Object.keys(ChartCategory).filter((x) => x !== '0' && !parseInt(x))}
                index={category}
                onChange={setCategory}
                activeBackgroundColor={(i) => ['bg-star-700', 'bg-app-600', 'bg-rwy-700', 'bg-sid-500', 'bg-[#A264D8]'][i]}
                inactiveTextColor={(i) => ['text-star-700', 'text-app-600', 'text-rwy-700', 'text-sid-500', 'text-[#A264D8]'][i]}
            />
            <div className="flex flex-col overflow-auto flex-1 border-[1px] border-ng-background-500 w-full">
                {index.filter((chart) => chart.category === categoryKeys[category]).map((chart) => <ChartRow key={chart.id} chart={chart} />)}
            </div>
        </>
    )
}

enum AirportPage {
    Info,
    Charts
}

function AirportPane({ airport, charts }: { airport: AirportInfo, charts: ReturnType<typeof getChartsAPI> }) {
    const [page, setPage] = useState(AirportPage.Info)

    return (
        <>
            <SegmentControl index={page} onChange={setPage} segments={['Info', 'Charts']} />
            {page === AirportPage.Info ? <JsonView content={airport} /> : <ChartsPage airport={airport} charts={charts} />}
        </>
    )
}

const Charts = protectedPage(({ charts }) => {
    const [icao, setIcao] = useState('');

    const { data: airport, isLoading } = useQuery({
        queryKey: ['charts-airport', icao],
        queryFn: () => charts.getAirportInfo({ icao }),
        enabled: icao.length === 4
    })

    return (
        <div className="page-container flex flex-col items-center gap-3">
            <h1>Charts</h1>

            <TextField label="Airport ICAO" icon={FaMagnifyingGlass} value={icao} onChange={setIcao} />

            {icao.length === 4 && (isLoading ? <SpinningCircles /> : airport ? <AirportPane airport={airport} charts={charts} /> : <span>{icao} has no Charts</span>)}
        </div>
    )
}, [Scope.CHARTS]);

export default Charts;