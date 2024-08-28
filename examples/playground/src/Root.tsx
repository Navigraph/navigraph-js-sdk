import MainWindow from "./MainWindow"
import SideBar from "./components/SideBar"
import { Outlet, Route, Routes } from "react-router-dom"
import useUserUpdater from "./hooks/useUserUpdater"
import useAppConfigLoader from "./hooks/useAppConfigLoader"
import App from "./pages/App"
import Auth from "./pages/Auth"
import Tiles from "./pages/Tiles"

function Root() {
  useAppConfigLoader();
  useUserUpdater();

  return (
    <main className='flex flex-row h-screen'>
      <SideBar />
      <Routes>
        <Route path="/app" element={<App />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/tiles" element={<Tiles />} />
      </Routes>
      <Outlet />
      <MainWindow />
    </main>
  )
}

export default Root
