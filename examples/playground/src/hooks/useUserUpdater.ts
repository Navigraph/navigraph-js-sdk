import { useEffect } from "react"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { appState } from "../state/app"
import { userState } from "../state/user"

export default function useUserUpdater() {
  const app = useRecoilValue(appState)

  const setUser = useSetRecoilState(userState)

  useEffect(() => {
    const unsubscribe = app?.auth.onAuthStateChanged(u => setUser(u))

    return () => unsubscribe?.()
  }, [app?.auth, setUser])
}
