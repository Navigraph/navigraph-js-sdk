import { DeviceFlowParams } from "@navigraph/auth"
import { useCallback, useState } from "react"
import { useNavigraphAuth } from "../hooks/useNavigraphAuth"

export default function Auth() {
  const [params, setParams] = useState<DeviceFlowParams | null>(null)
  const { user, isInitialized, signIn, signOut } = useNavigraphAuth()

  const handleSignIn = useCallback(() => signIn(params => setParams(params)).finally(() => setParams(null)), [signIn])

  const isLoginInProgress = !!params

  return (
    <>
      {!isInitialized && <div>Loading...</div>}

      {isInitialized && (
        <button
          className="py-2 px-4 font-semibold rounded-md bg-black text-white dark:bg-white dark:text-black"
          onClick={() => !isLoginInProgress && (user ? signOut() : handleSignIn())}>
          {user ? "Sign out" : !isLoginInProgress ? "Sign in" : "Signing in..."}
        </button>
      )}

      {params?.verification_uri_complete && !user && (
        <div className="flex flex-col items-center gap-2">
          <a
            href={params.verification_uri_complete}
            className="text-blue-600 bg-gray-500/10 p-3 rounded-lg"
            target="_blank"
            rel="noreferrer">
            Open sign in page
          </a>
          <span className="opacity-50">or scan this QR code:</span>
          <div className="p-2 rounded-lg bg-white mt-1">
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${params.verification_uri_complete}`}
              alt="QR Code for sign in."
            />
          </div>
        </div>
      )}
    </>
  )
}
