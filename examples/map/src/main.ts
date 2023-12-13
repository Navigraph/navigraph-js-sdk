import { FAASource, NavigraphRasterSource, NavigraphTheme, NavigraphTileLayer } from "@navigraph/leaflet"
import { Map } from "leaflet"
import { auth } from "./navigraph"
import "leaflet/dist/leaflet.css"
import "./style.css"

// Instantiate a Leaflet map and set view to Sweden
const map = new Map("map").setView([59.334591, 18.06324], 5)

const ngLayer = new NavigraphTileLayer(auth).addTo(map)

document.querySelectorAll<HTMLButtonElement>(".sources > button").forEach(el => {
  el.addEventListener("click", () => {
    const source = el.innerText as NavigraphRasterSource
    ngLayer.setPreset({ ...ngLayer.preset, type: "Navigraph", source })
  })
})

document.querySelectorAll<HTMLButtonElement>(".faa-sources > button").forEach(el => {
  el.addEventListener("click", () => {
    const source = el.innerText as FAASource
    ngLayer.setPreset({ ...ngLayer.preset, type: "FAA", source })
  })
})

document.querySelectorAll<HTMLButtonElement>(".themes > button").forEach(el => {
  el.addEventListener("click", () => {
    const theme = el.innerText as NavigraphTheme
    ngLayer.setPreset({ ...ngLayer.preset, theme })
  })
})

// Auth UI

const signinBtn = document.querySelector<HTMLDivElement>("#signin")!

signinBtn.addEventListener("click", () =>
  auth.signInWithDeviceFlow(params => window.open(params.verification_uri_complete, "_blank")).catch(console.error),
)

auth.onAuthStateChanged(user => {
  console.log("User changed", user)
  signinBtn.innerHTML = user ? `Signed in as ${user.preferred_username}` : "Sign in"
})
