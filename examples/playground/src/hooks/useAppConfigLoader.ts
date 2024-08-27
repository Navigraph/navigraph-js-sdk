import { useRecoilState } from "recoil";
import { appState } from "../state/app";
import { useEffect } from "react";
import { getAuth } from "@navigraph/auth";
import { initializeApp, NavigraphApp } from "@navigraph/app";

export default function useAppConfigLoader() {
    const [app, setApp] = useRecoilState(appState);

    useEffect(() => {
        if (app) return;

        const data = localStorage.getItem('NG_CONFIG');

        if (!data) return;

        const config = JSON.parse(data) as NavigraphApp;

        initializeApp(config);

        setApp({ config, auth: getAuth() })
    }, []);
}