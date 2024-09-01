import MainWindow from "./MainWindow"
import SideBar from "./components/SideBar"
import { Route, Routes } from "react-router-dom"
import useUserUpdater from "./hooks/useUserUpdater"
import useAppConfigLoader from "./hooks/useAppConfigLoader"
import App from "./pages/App"
import Auth from "./pages/Auth"
import Tiles from "./pages/Tiles"
import Charts from "./pages/Charts"
import Amdb from "./pages/Amdb"
import Packages from "./pages/Packages"

export default function Root() {
  useAppConfigLoader();
  useUserUpdater();

  return (
    <main className='flex flex-row h-screen'>
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
