import { useRecoilState, useRecoilValue } from "recoil";
import { appState } from "../state/app";
import { redirect } from "react-router-dom";
import Button from "../components/Button";
import { mapFaaState, mapSourceState, mapTacState, mapThemeState } from "../state/mapStyle";
import { FaMoon, FaSun } from "react-icons/fa";
import JsonView from "../components/JsonView";
import { createPreset } from "../components/Map";

export default function Tiles() {
    const app = useRecoilValue(appState);

    const [source, setSource] = useRecoilState(mapSourceState);
    const [theme, setTheme] = useRecoilState(mapThemeState);
    const [faa, setFaa] = useRecoilState(mapFaaState);
    const [tac, setTac] = useRecoilState(mapTacState);

    if (!app) {
        redirect('/');
        return null;
    }

    return (
        <div className="page-container flex flex-col items-center gap-3 px-3">
            <h1>Tiles</h1>

            <div className="pane grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-3">
                    <Button selected={source === 'IFR HIGH'} onClick={() => setSource('IFR HIGH')}>IFR HIGH</Button>
                    <Button selected={source === 'IFR LOW'} onClick={() => setSource('IFR LOW')}>IFR LOW</Button>
                    <Button selected={source === 'VFR'} onClick={() => setSource('VFR')}>VFR</Button>
                    <Button disabled={faa} selected={source === 'WORLD'} onClick={() => setSource('WORLD')}>WORLD</Button>
                </div>
                <div className="flex flex-col gap-3 justify-around items-center">
                    <Button onClick={() => setTheme(theme === 'DAY' ? 'NIGHT' : 'DAY')}>{theme === 'DAY' ? <FaSun size={20} /> : <FaMoon size={20} />}</Button>

                    <Button disabled={source === 'WORLD'} selected={faa} onClick={() => setFaa(!faa)}>FAA</Button>
                    <Button disabled={!(source === 'VFR' && faa)} selected={tac} onClick={() => setTac(!tac)}>TAC</Button>
                </div>
            </div>

            <span className="text-sm text-gray-200">Tiles Preset</span>
            <JsonView content={createPreset(source, theme, faa, tac)} />
        </div>
    )
}
