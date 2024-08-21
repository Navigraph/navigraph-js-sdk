import { FAASource, NavigraphRasterSource, NavigraphTheme, NavigraphTileLayer } from "@navigraph/leaflet"
import { geoJSON, GeoJSON, Map } from "leaflet"
import { amdb, auth } from "./navigraph"
import "leaflet/dist/leaflet.css"
import "./style.css"
import { allLayers, AmdbLayerName, AmdbSearchResult } from "@navigraph/amdb"
import getAmdbLayers from "@navigraph/amdb/src/api/getAmdbLayers"

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

let airport: AmdbSearchResult | null = null

const visibleAmdbLayers: AmdbLayerName[] = []

let currentAmdbLayer: GeoJSON | null = null

async function updateAmdb() {
  ;(document.querySelectorAll(".amdb-layer") as NodeListOf<HTMLButtonElement>).forEach(element => {
    element.style.backgroundColor = visibleAmdbLayers.includes(element.id as AmdbLayerName) ? "green" : ""
  })

  if (currentAmdbLayer && map.hasLayer(currentAmdbLayer)) {
    map.removeLayer(currentAmdbLayer)
  }

  if (!airport) return

  const data = await getAmdbLayers({ icao: airport?.idarpt, include: visibleAmdbLayers })

  if (!data) return

  currentAmdbLayer = geoJSON(Object.values(data), {
    onEachFeature: (feature, layer) => {
      layer.on("click", e => {
        currentAmdbLayer?.resetStyle()

        e.target.setStyle({ color: "red" })
      })
      layer.bindPopup(`<p>${JSON.stringify(feature.properties, null, 4)}</p>`)
    },
  }).addTo(map)
}

const amdbContainer = document.querySelector<HTMLDivElement>(".amdb-layers")!

allLayers.forEach(layer => {
  const button = document.createElement("button")

  button.innerHTML = layer

  button.id = layer
  button.className = "amdb-layer"

  button.addEventListener("click", () => {
    if (visibleAmdbLayers.includes(layer)) {
      visibleAmdbLayers.splice(visibleAmdbLayers.indexOf(layer), 1)
    } else {
      visibleAmdbLayers.push(layer)
    }

    updateAmdb()
  })

  amdbContainer.appendChild(button)
})

const icaoInput = document.querySelector<HTMLInputElement>("#icao-input")

icaoInput?.addEventListener("change", async () => {
  const value = icaoInput.value

  if (value.length === 4 && /^[A-Z]{4}$/.test(value)) {
    airport = (await amdb.searchAmdb(value))?.[0] ?? null

    if (airport) {
      icaoInput.style.backgroundColor = "green"
      amdbContainer.style.visibility = "visible"
    } else {
      icaoInput.style.backgroundColor = "red"
      amdbContainer.style.visibility = "hidden"
    }

    updateAmdb()
  } else {
    icaoInput.style.backgroundColor = ""
  }
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
