import { SpinningCircles } from "react-loading-icons"
import { Route, Routes } from "react-router-dom"
import NavigraphLogo from "./components/NavigraphLogo"
import SideBar from "./components/SideBar"
import { useNavigraphAuth } from "./hooks/useNavigraphAuth"
import MainWindow from "./MainWindow"
import Amdb from "./pages/Amdb"
import App from "./pages/App"
import Auth from "./pages/Auth"
import Charts from "./pages/Charts"
import Packages from "./pages/Packages"
import Tiles from "./pages/Tiles"
import Weather from "./pages/Weather"

export default function Root() {
  const { isInitialized } = useNavigraphAuth()

  if (!isInitialized) {
    return (
      <div className="h-screen flex items-center justify-center flex-col">
        <NavigraphLogo />
        <SpinningCircles />
      </div>
    )
  }

  return (
    <main className="flex flex-row h-screen">
      <SideBar />
      <Routes>
        <Route path="/app" element={<App />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/tiles" element={<Tiles />} />
        <Route path="/charts" element={<Charts />} />
        <Route path="/amdb/*" element={<Amdb />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/weather" element={<Weather />} />
      </Routes>
      <MainWindow />
    </main>
  )
}
