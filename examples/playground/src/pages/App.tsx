import { NavigraphApp, Scope } from "@navigraph/app"
import { useCallback, useEffect, useState } from "react"
import { TiWarning } from "react-icons/ti"
import Button from "../components/Button"
import { TextField } from "../components/TextField"
import { useNavigraphAuth } from "../hooks/useNavigraphAuth"

/**
 * App config should NEVER be customisable in the actual APP, it should be initialized at the entry point, and hard configured
 *
 * ! DO NOT USE CODE IN THIS FILE AS AN EXAMPLE
 */
export default function App() {
  const { app: config, auth, setApp } = useNavigraphAuth()

  const [clientId, setClientId] = useState(config?.clientId)
  const [clientSecret, setClientSecret] = useState(config?.clientSecret)
  const [scopes, setScopes] = useState(config?.scopes ?? [])

  const [editUnlocked, setEditUnlocked] = useState(!config)

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

    setEditUnlocked(true)
  }, [auth])

  const saveConfig = useCallback(() => {
    if (!clientId || !clientSecret) return

    const config: NavigraphApp = {
      clientId,
      clientSecret,
      scopes,
    }

    setApp(config)

    setEditUnlocked(false)
  }, [clientId, clientSecret, scopes, setApp])

  return (
    <div className="page-container flex flex-col items-center gap-3 p-6">
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
        <span className="text-sm">Scopes: </span>
        {Object.values(Scope).map(scope => (
          <label className="flex gap-2 items-center text-sm ml-5" key={scope}>
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

      <TiWarning className="text-orange-100 text-sm" size={30} />
      <span className="text-orange-100 text-sm">
        This app configuration panel is for a learning example only, your app should <b>NOT</b> be setup like this.
      </span>
      <span className="text-orange-100 text-sm">
        App Configuration should be done with an environment config and the app should be initialised near the entry
        point of your application and only happen <b>ONCE</b>.
      </span>
    </div>
  )
}
