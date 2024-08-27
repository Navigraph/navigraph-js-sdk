import MainWindow from "./MainWindow"
import SideBar from "./components/SideBar"
import { Outlet } from "react-router-dom"
import useUserUpdater from "./hooks/useUserUpdater"
import useAppConfigLoader from "./hooks/useAppConfigLoader"

function Root() {
  useAppConfigLoader();
  useUserUpdater();

  return (
    <main className='flex flex-row h-screen'>
      <SideBar />
      <Outlet />
      <MainWindow />
    </main>
  )
}

export default Root
