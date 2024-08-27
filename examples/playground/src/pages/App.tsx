import { useRecoilState } from "recoil"
import { appState } from "../state/app"
import { useCallback, useEffect, useState } from "react";
import { TextField } from "../components/TextField";
import Button from "../components/Button";
import { initializeApp, NavigraphApp, Scope } from "@navigraph/app";
import { getAuth } from "@navigraph/auth";

export default function App() {
    const [app, setApp] = useRecoilState(appState);

    const config = app?.config;
    const auth = app?.auth;

    const [clientId, setClientId] = useState(config?.clientId);
    const [clientSecret, setClientSecret] = useState(config?.clientSecret);
    const [scopes, setScopes] = useState(config?.scopes ?? []);

    const [editUnlocked, setEditUnlocked] = useState(!app);

    useEffect(() => {
        setClientId(config?.clientId);
        setClientSecret(config?.clientSecret);
        setScopes(config?.scopes ?? []);

        if (config) {
            setEditUnlocked(false);
        }
    }, [config]);

    const editConfig = useCallback(() => {
        if (!window.confirm("This will Sign Out any current logins")) return;

        auth?.signOut();

        localStorage.removeItem('NG_CONFIG');

        setEditUnlocked(true);
    }, [auth]);

    const saveConfig = useCallback(() => {
        if (!clientId || !clientSecret) return;

        const config: NavigraphApp = {
            clientId,
            clientSecret,
            scopes
        }

        localStorage.setItem('NG_CONFIG', JSON.stringify(config));

        initializeApp(config);

        setApp({ config, auth: getAuth() });

        setEditUnlocked(false);
    }, [clientId, clientSecret, scopes]);

    return (
        <div className="page-container flex flex-col items-center gap-3">
            <h1>App Configuration</h1>

            <div className="flex flex-col gap-2 bg-ng-background-400 p-2 rounded-lg shadow-md">
                <TextField value={clientId ?? ''} onChange={setClientId} label="Client ID" className="w-64" disabled={!editUnlocked} />
                <TextField value={clientSecret ?? ''} onChange={setClientSecret} label="Client Secret" className="w-64" disabled={!editUnlocked} />
                <span className="text-sm">Scopes: </span>
                {Object.values(Scope).map((scope) => (
                    <label className="flex gap-2 items-center text-sm ml-5">
                        {scope}
                        <input disabled={!editUnlocked} type="checkbox" value={scope} checked={scopes?.includes(scope)} onChange={(e) => {
                            if (scopes?.includes(e.target.value as Scope)) {
                                setScopes(scopes.filter((scope) => scope !== e.target.value))
                            } else {
                                setScopes([e.target.value as Scope, ...scopes])
                            }
                        }} />
                    </label>
                ))}

                <div className="flex flex-row justify-between">
                    <Button onClick={editConfig} disabled={editUnlocked}>Edit</Button>

                    <Button onClick={saveConfig} disabled={!editUnlocked || !clientId || !clientSecret}>Save</Button>
                </div>
            </div>
        </div>
    )
}