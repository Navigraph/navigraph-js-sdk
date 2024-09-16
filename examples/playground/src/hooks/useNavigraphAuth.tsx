import { initializeApp, NavigraphApp } from "@navigraph/app"
import { getAuth, NavigraphAuth, User } from "navigraph/auth"
import React, { createContext, useContext, useEffect, useMemo, useState } from "react"

interface NavigraphAuthContext {
  isInitialized: boolean
  user: User | null
  app: NavigraphApp | null
  setApp: (app: NavigraphApp | null) => void
  auth?: NavigraphAuth
}

const authContext = createContext<NavigraphAuthContext>({
  isInitialized: false,
  user: null,
  app: null,
  setApp: () => {
    throw new Error("Not initialized")
  },
})

/**
 * Provides authentication and app config state, along with handling loading of credentials from local storage and providing user object
 *
 * Please do not use this code as an example, app configuration should not be dynamic, it is just for ease of use in the running playground
 *
 * ! This is NOT how app configuration and auth should be handled in your application. App Configuration should be done with an environment config and the app should be initialised near the entry
 * ! point of your application and only happen ONCE.
 */
export function NavigraphAuthProvider({ children }: { children: React.ReactNode }) {
  const [app, setApp] = useState<NavigraphApp | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)

  const auth = useMemo(() => {
    if (app) {
      return getAuth()
    } else {
      // Absolutely do not do this in a real app, this is just for faking the time usually taken for loading a refresh token when the app hasn been already initialised for consistency, so that theres always a navigraph loading screen
      setTimeout(() => {
        setIsInitialized(true)
      }, 500)
    }
  }, [app])

  // Subscribe to user changes on mount
  // Whenever a user is signed in or out, this hook will respond to the change.
  useEffect(() => {
    const unsubscribe = auth?.onAuthStateChanged(u => {
      setUser(u)
      setIsInitialized(true)
    })

    // Cleanup subscription on unmount
    return () => unsubscribe?.()
  }, [auth])

  // Handle loading client credentials from Config
  useEffect(() => {
    if (app) return

    const data = localStorage.getItem("NG_CONFIG")

    if (!data) return

    const config = JSON.parse(data) as NavigraphApp

    initializeApp(config)
    setApp(config)
  }, [app, setApp])

  return (
    <authContext.Provider
      value={{
        user,
        isInitialized,
        app,
        setApp: app => {
          if (app) {
            initializeApp(app)

            localStorage.setItem("NG_CONFIG", JSON.stringify(app))
          } else {
            void auth?.signOut()

            localStorage.removeItem("NG_CONFIG")
          }
          setApp(app)
        },
        auth,
      }}>
      {children}
    </authContext.Provider>
  )
}

/**
 * A hook for accessing and mutating the navigraph authentication state of the app
 */
export const useNavigraphAuth = () => useContext(authContext)
