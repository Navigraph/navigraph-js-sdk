import { getAmdbAPI } from "@navigraph/amdb"
import { Scope } from "@navigraph/app"
import { NavigraphAuth, User } from "@navigraph/auth"
import { getChartsAPI } from "@navigraph/charts"
import { getPackagesAPI } from "@navigraph/packages"
import { ReactNode } from "react"
import { useNavigate } from "react-router-dom"
import { useNavigraphAuth } from "../hooks/useNavigraphAuth"

interface PropsStruct {
  [Scope.AMDB]: ReturnType<typeof getAmdbAPI>
  [Scope.CHARTS]: ReturnType<typeof getChartsAPI>
  [Scope.FMSDATA]: ReturnType<typeof getPackagesAPI>
}

export function protectedPage<P extends object, S extends Scope[]>(
  Component: (
    props: P & { auth: NavigraphAuth; user: User } & Pick<PropsStruct, Extract<S[number], keyof PropsStruct>>,
  ) => ReactNode,
  requiredScopes: S,
) {
  return (props: P) => {
    const navigate = useNavigate()

    const { auth, user } = useNavigraphAuth()

    if (!auth || !user || !requiredScopes.every(scope => user.scope.includes(scope))) {
      navigate("/")
      return null
    }

    const amdb = user.scope.includes(Scope.AMDB) ? getAmdbAPI() : undefined
    const charts = user.scope.includes(Scope.CHARTS) ? getChartsAPI() : undefined
    const fmsdata = user.scope.includes(Scope.FMSDATA) ? getPackagesAPI() : undefined

    return (
      <Component
        user={user}
        auth={auth}
        amdb={amdb}
        charts={charts}
        fmsdata={fmsdata}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        {...(props as unknown as any)}
      />
    )
  }
}
