import { initializeApp, NavigraphApp, Scope } from "@navigraph/app"
import { getAuth } from "@navigraph/auth"
import { useCallback, useEffect, useState } from "react"
import { useRecoilState } from "recoil"
import Button from "../components/Button"
import { TextField } from "../components/TextField"
import { appState } from "../state/app"

export default function App() {
  const [app, setApp] = useRecoilState(appState)

  const config = app?.config
  const auth = app?.auth

  const [clientId, setClientId] = useState(config?.clientId)
  const [clientSecret, setClientSecret] = useState(config?.clientSecret)
  const [scopes, setScopes] = useState(config?.scopes ?? [])
  const [domain, setDomain] = useState(config?.domain ?? "navigraph.com")

  const [editUnlocked, setEditUnlocked] = useState(!app)

  useEffect(() => {
    setClientId(config?.clientId)
    setClientSecret(config?.clientSecret)
    setScopes(config?.scopes ?? [])

    if (config) {
      setEditUnlocked(false)
    }
  }, [config])

  const editConfig = useCallback(async () => {
    if (!window.confirm("This will Sign Out any current logins")) return

    await auth?.signOut()

    localStorage.removeItem("NG_CONFIG")

    setEditUnlocked(true)
  }, [auth])

  const saveConfig = useCallback(() => {
    if (!clientId || !clientSecret) return

    const config: NavigraphApp = {
      clientId,
      clientSecret,
      scopes,
      domain,
    }

    localStorage.setItem("NG_CONFIG", JSON.stringify(config))

    initializeApp(config)

    setApp({ config, auth: getAuth() })

    setEditUnlocked(false)
  }, [clientId, clientSecret, scopes, domain, setApp])

  return (
    <div className="page-container flex flex-col items-center gap-3">
      <h1>App Configuration</h1>

      <div className="flex flex-col gap-2 pane">
        <TextField
          value={clientId ?? ""}
          onChange={setClientId}
          label="Client ID"
          className="w-64"
          disabled={!editUnlocked}
        />
        <TextField
          value={clientSecret ?? ""}
          onChange={setClientSecret}
          label="Client Secret"
          className="w-64"
          disabled={!editUnlocked}
        />
        <select onChange={e => setDomain(e.target.value)} value={domain} disabled={!editUnlocked}>
          <option value="navigraph.com">Production</option>
          <option value="navigraphlabs.com">Staging</option>
          <option value="devigraph.com">Development</option>
        </select>
        <span className="text-sm">Scopes: </span>
        {Object.values(Scope).map(scope => (
          <label className="flex gap-2 items-center text-sm ml-5">
            {scope}
            <input
              disabled={!editUnlocked}
              type="checkbox"
              value={scope}
              checked={scopes?.includes(scope)}
              onChange={e => {
                const value = e.target.value as Scope
                if (scopes?.includes(value)) {
                  setScopes(scopes.filter(scope => scope !== value))
                } else {
                  setScopes([value, ...scopes])
                }
              }}
            />
          </label>
        ))}

        <div className="flex flex-row justify-between">
          <Button onClick={editConfig} disabled={editUnlocked}>
            Edit
          </Button>

          <Button onClick={saveConfig} disabled={!editUnlocked || !clientId || !clientSecret}>
            Save
          </Button>
        </div>
      </div>
    </div>
  )
}
