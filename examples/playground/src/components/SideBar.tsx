import clsx from "clsx";
import { IconType } from "react-icons";
import { MdOutlineSettings } from "react-icons/md";
import { NavLink } from "react-router-dom";

interface SideBarLinkProps {
    path: string
    children: string
    icon: IconType
}

function SideBarLink({ path, children, icon: Icon }: SideBarLinkProps) {
    return (
        <NavLink className="flex flex-col gap-1 items-center group" to={path}>
            {({ isActive }) =>
                <>
                    <Icon className={clsx("group-hover:text-blue-25", isActive ? 'text-blue-25' : 'text-white')} size={20} />
                    <span className={clsx("text-sm group-hover:text-blue-50", isActive && 'text-blue-25')}>{children}</span>
                </>
            }
        </NavLink>
    )
}

export default function SideBar() {
    return (
        <div className="flex flex-col w-20 p-3">
            <SideBarLink path="/app" icon={MdOutlineSettings} >App</SideBarLink>
        </div>
    )
}