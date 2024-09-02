import { Route, Routes } from "react-router-dom"
import SideBar from "./components/SideBar"
import useAppConfigLoader from "./hooks/useAppConfigLoader"
import useUserUpdater from "./hooks/useUserUpdater"
import MainWindow from "./MainWindow"
import Amdb from "./pages/Amdb"
import App from "./pages/App"
import Auth from "./pages/Auth"
import Charts from "./pages/Charts"
import Packages from "./pages/Packages"
import Tiles from "./pages/Tiles"

export default function Root() {
  useAppConfigLoader()
  useUserUpdater()

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
      </Routes>
      <MainWindow />
    </main>
  )
}
