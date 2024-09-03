import { DeviceFlowTokenExpiredError, InvalidScopeError } from "@navigraph/app"
import { useCallback, useState } from "react"
import { redirect } from "react-router-dom"
import { useRecoilState } from "recoil"
import { LargeButton } from "../components/Button"
import JsonView from "../components/JsonView"
import { useNavigraphAuth } from "../hooks/useNavigraphAuth"
import { authState } from "../state/auth"

export default function Auth() {
  const [error, setError] = useState<Error | null>(null)
  const [params, setParams] = useRecoilState(authState)

  const { user, auth } = useNavigraphAuth()

  const handleSignIn = useCallback(() => {
    if (!auth) return
    auth
      .signInWithDeviceFlow(params => {
        setParams(params)
        setError(null)
      })
      .catch(err => {
        if (err instanceof Error) {
          setError(err)
        }
      })
      .finally(() => setParams(null))
  }, [auth, setParams])

  if (!auth) redirect("/")

  return (
    <div className="page-container flex flex-col items-center gap-3 px-3">
      <h1>Auth</h1>

      {!params && !user && <LargeButton onClick={handleSignIn}>Sign In with device flow</LargeButton>}
      {params && (
        <>
          <JsonView content={params} />

          <LargeButton onClick={() => window.open(params.verification_uri_complete, "_blank")}>
            Navigate to Sign In Page
          </LargeButton>
        </>
      )}

      {error && (
        <div className="text-red-500">
          {error instanceof DeviceFlowTokenExpiredError
            ? "Session expired, try again!"
            : error instanceof InvalidScopeError
            ? "Invalid scope provided, perhaps the configured client does not have permission for all requested scopes"
            : error.message}
        </div>
      )}

      {user && (
        <>
          <JsonView content={user} />

          <LargeButton onClick={() => auth?.signOut()}>Sign Out</LargeButton>
        </>
      )}
    </div>
  )
}
