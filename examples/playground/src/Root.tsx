import { PropsWithChildren } from "react"
import MainWindow from "./MainWindow"

function SideBar() {
  return (
    <div className="w-20">

    </div>
  )
}

function Root({ children }: PropsWithChildren) {
  return (
    <main className='flex flex-row h-screen'>
      <SideBar />
      {children}
      <MainWindow />
    </main>
  )
}

export default Root
