import { useEffect } from "react"
import MainWindow from "./MainWindow"
import SideBar from "./components/SideBar"
import { Outlet } from "react-router-dom"
import { useRecoilState } from "recoil"
import { appState } from "./state/app"
import { initializeApp, NavigraphApp } from "@navigraph/app"
import { getAuth } from "@navigraph/auth"

function Root() {
  const [app, setApp] = useRecoilState(appState);

  useEffect(() => {
    if (app) return;

    const data = localStorage.getItem('NG_CONFIG');

    if (!data) return;

    const config = JSON.parse(data) as NavigraphApp;

    initializeApp(config);

    setApp({ config, auth: getAuth() })
  }, []);

  return (
    <main className='flex flex-row h-screen'>
      <SideBar />
      <Outlet />
      <MainWindow />
    </main>
  )
}

export default Root
