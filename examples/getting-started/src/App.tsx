import { NoPackagesFoundError, RequestFailedError } from "@navigraph/app"
import { NavigraphPackage } from "@navigraph/packages"
import { useCallback, useState } from "react"
import Auth from "./components/Auth"
import Button from "./components/Button"
import { useNavigraphAuth } from "./hooks/useNavigraphAuth"
import { charts, packages } from "./lib/navigraph"

const AIRPORT_ICAO = "KJFK"

function App() {
  const [output, setOutput] = useState<string | undefined>(undefined)
  const [packageDetails, setPackageDetails] = useState<NavigraphPackage | undefined>(undefined)
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)

  const { user } = useNavigraphAuth()

  const handleNavigraphError = useCallback(
    (error: unknown) => {
      if (error instanceof NoPackagesFoundError) setErrorMessage("No packages found")
      else if (error instanceof RequestFailedError) setErrorMessage("Failed to fetch packages")
      else if (error instanceof Error) setErrorMessage("An unknown error occurred")
      else setErrorMessage("An unknown error occurred: " + error)
    },
    [setErrorMessage],
  )

  const listCharts = () =>
    charts
      .getChartsIndex({ icao: AIRPORT_ICAO })
      .then(charts => setOutput(JSON.stringify(charts, null, 2)))
      .catch(err => handleNavigraphError(err))

  const fetchPackage = () =>
    packages
      .getPackage()
      .then(pkg => setPackageDetails(pkg))
      .catch(err => handleNavigraphError(err))

  const listPackages = () =>
    packages
      .listPackages()
      .then(pkgs => setOutput(JSON.stringify(pkgs, null, 2)))
      .catch(err => handleNavigraphError(err))

  return (
    <main className="dark:bg-black dark:text-white flex flex-col space-y-10 items-center justify-center min-h-screen ">
      <h1 className="text-6xl text-black dark:text-white font-bold">Navigraph SDK Demo</h1>

      <Auth />

      {user && (
        <>
          <div className="flex flex-col items-center space-y-2">
            <h2 className="text-2xl mb-2">
              Welcome, <span className="text-blue-400 font-bold">{user.preferred_username}</span>
            </h2>

            <Button onClick={listCharts}>List {AIRPORT_ICAO} charts</Button>
            <Button onClick={listPackages}>List available packages</Button>
            <Button onClick={fetchPackage}>Fetch default package</Button>

            {packageDetails && (
              <a href={packageDetails.file?.url} className="text-blue-500 hover:text-blue-700">
                Download {packageDetails.format}
              </a>
            )}

            {errorMessage && <span className="text-red-500 hover:text-red-700">{errorMessage}</span>}
          </div>
        </>
      )}

      {output && <pre className="text-sm max-h-[40vh] max-w-[90vw] overflow-auto">{output}</pre>}
    </main>
  )
}

export default App
