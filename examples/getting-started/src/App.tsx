import { NoPackagesFoundError, RequestFailedError } from "@navigraph/app"
import { DeviceFlowParams } from "@navigraph/auth"
import { NavigraphPackage } from "@navigraph/packages"
import { useCallback, useState } from "react"
import { useNavigraphAuth } from "./hooks/useNavigraphAuth"
import { charts, packages } from "./lib/navigraph"

function App() {
  const [params, setParams] = useState<DeviceFlowParams | null>(null)
  const [chartsIndex, setChartsIndex] = useState<string | undefined>(undefined)
  const [packageDetails, setPackageDetails] = useState<NavigraphPackage | undefined>(undefined)
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)

  const { user, isInitialized, signIn, signOut } = useNavigraphAuth()

  const fetchChartsIndex = () =>
    charts.getChartsIndex({ icao: "KJFK" }).then(d => setChartsIndex(JSON.stringify(d, null, 2)))

  async function fetchPackage() {
    try {
      const pkg = await packages.getDefaultPackage()

      setPackageDetails(pkg)
    } catch (error) {
      if (error instanceof NoPackagesFoundError) setErrorMessage("No packages found")
      else if (error instanceof RequestFailedError) setErrorMessage("Failed to fetch packages")
      else if (error instanceof Error) setErrorMessage("An unknown error occurred")
      else setErrorMessage("An unknown error occurred")
    }
  }

  const handleSignIn = useCallback(() => signIn(p => setParams(p)).finally(() => setParams(null)), [signIn])

  const isLoginInProgress = !!params

  return (
    <main className="dark:bg-black dark:text-white flex flex-col space-y-10 items-center justify-center min-h-screen ">
      {!isInitialized && <div>Loading...</div>}

      <h1 className="text-6xl text-black dark:text-white font-bold">Navigraph SDK Demo</h1>

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

      {user && (
        <>
          <div className="flex flex-col items-center space-y-2">
            <h2 className="text-2xl mb-2">
              Welcome, <span className="text-blue-400 font-bold">{user.preferred_username}</span>
            </h2>
            <button
              onClick={fetchChartsIndex}
              className="bg-black dark:bg-white text-white dark:text-black py-2 px-4 font-semibold rounded-md">
              Fetch charts index
            </button>
            <button
              onClick={fetchPackage}
              className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 font-semibold rounded-md">
              Fetch default package
            </button>
            {packageDetails && (
              <a href={packageDetails.file?.url} className="text-blue-500 hover:text-blue-700">
                Download {packageDetails.format}
              </a>
            )}
            {errorMessage && <span className="text-red-500 hover:text-red-700">{errorMessage}</span>}
          </div>
        </>
      )}

      {chartsIndex && <pre className="text-sm max-h-[40vh] overflow-auto">{chartsIndex}</pre>}
    </main>
  )
}

export default App
