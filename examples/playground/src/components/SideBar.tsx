import { Scope } from "@navigraph/app"
import clsx from "clsx"
import { IconType } from "react-icons"
import { FaDatabase, FaDownload, FaGlobe, FaMap, FaUser } from "react-icons/fa"
import { MdOutlineSettings } from "react-icons/md"
import { TiWeatherPartlySunny } from "react-icons/ti"
import { NavLink } from "react-router-dom"
import { useNavigraphAuth } from "../hooks/useNavigraphAuth"

interface SideBarLinkProps {
  path: string
  children: string
  icon: IconType
  disabled?: boolean
}

function SideBarLink({ path, children, icon: Icon, disabled }: SideBarLinkProps) {
  return (
    <NavLink className={clsx("flex flex-col gap-1 items-center group", disabled && "pointer-events-none")} to={path}>
      {({ isActive }) => (
        <>
          <Icon
            className={clsx(
              "group-hover:text-blue-25",
              disabled ? "text-gray-900" : isActive ? "text-blue-25" : "text-white",
            )}
            size={20}
          />
          <span
            className={clsx(
              "text-sm group-hover:text-blue-50",
              disabled ? "text-gray-900" : isActive ? "text-blue-25" : "text-white",
            )}>
            {children}
          </span>
        </>
      )}
    </NavLink>
  )
}

export default function SideBar() {
  const { user, auth } = useNavigraphAuth()

  return (
    <div className="flex flex-col w-20 p-3 gap-5">
      <SideBarLink path="/app" icon={MdOutlineSettings}>
        App
      </SideBarLink>
      <SideBarLink path="/auth" icon={FaUser} disabled={!auth}>
        Auth
      </SideBarLink>
      <SideBarLink path="/tiles" icon={FaGlobe} disabled={!user?.scope.includes(Scope.TILES)}>
        Tiles
      </SideBarLink>
      <SideBarLink path="/charts" icon={FaMap} disabled={!user?.scope.includes(Scope.CHARTS)}>
        Charts
      </SideBarLink>
      <SideBarLink path="/amdb" icon={FaDatabase} disabled={!user?.scope.includes(Scope.AMDB)}>
        AMDB
      </SideBarLink>
      <SideBarLink path="/packages" icon={FaDownload} disabled={!user?.scope.includes(Scope.FMSDATA)}>
        Packages
      </SideBarLink>
      <SideBarLink path="/weather" icon={TiWeatherPartlySunny} disabled={!user}>
        Weather
      </SideBarLink>
    </div>
  )
}
