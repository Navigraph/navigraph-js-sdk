import { getApp, getDefaultAppDomain, Logger, NotInitializedError, Scope } from "@navigraph/app"
import { NavigraphAuth } from "@navigraph/auth"
import { Coords, DoneCallback, TileLayer, TileLayerOptions } from "leaflet"

enum NavigraphRasterSourceOption {
  "IFR HIGH" = "ifr.hi",
  "IFR LOW" = "ifr.lo",
  "VFR" = "vfr",
  "WORLD" = "world",
}

enum FAASourceOption {
  "VFR" = "VFR",
  "IFR HIGH" = "IFRH",
  "IFR LOW" = "IFRL",
}

export type NavigraphRasterSource = keyof typeof NavigraphRasterSourceOption
export type FAASource = keyof typeof FAASourceOption
export type NavigraphTheme = "DAY" | "NIGHT"

export type PresetConfig = { theme?: NavigraphTheme; forceRetina?: boolean } & (
  | { type: "Navigraph"; source: NavigraphRasterSource }
  | { type: "FAA"; source: Extract<FAASource, "VFR">; withTAC?: boolean }
  | { type: "FAA"; source: Exclude<FAASource, "VFR"> }
)

function getNavigraphTileURL(options: PresetConfig) {
  const { source, theme = "DAY" } = options
  const forceRetina = "forceRetina" in options ? options.forceRetina : false
  return `https://enroute-bitmap.charts.api-v2.${getDefaultAppDomain()}/styles/${NavigraphRasterSourceOption[source]}.${theme.toLowerCase()}/{z}/{x}/{y}${forceRetina ? "@2x" : "{r}"}.png` // prettier-ignore
}

/**
 * A Leaflet tile layer that renders Navigraph enroute charts.
 * @example
 * ```ts
 * const navigraphLayer = new NavigraphTileLayer(auth, { source: "IFR HIGH", theme: "NIGHT" });
 * navigraphLayer.addTo(map);
 *
 * navigraphLayer.setPreset({ source: "IFR LOW", theme: "DAY" });
 * ```
 */
export class NavigraphTileLayer extends TileLayer {
  /** A list of tiles that has failed to load since the last successful tile load. */
  protected FAILED_TILES = new Set<string>()

  /** Indicates whether map tiles failed to load due to authentication being invalid or missing. */
  private isMissingAuth = false

  private maxFAAZoom = 12

  private tacLayer = new TileLayer(`https://enroute.charts.api-v2.${getDefaultAppDomain()}/FAA/TAC/{z}/{x}/{y}.png`, {
    minZoom: 10,
    maxNativeZoom: 12,
    maxZoom: this.maxFAAZoom,
    tileSize: 512,
    zoomOffset: -1,
    className: "faa-vfr-tiles",
  })

  private vfrLayer = new TileLayer(`https://enroute.charts.api-v2.${getDefaultAppDomain()}/FAA/VFR/{z}/{x}/{y}.png`, {
    minZoom: 1,
    maxNativeZoom: 11,
    maxZoom: this.maxFAAZoom,
    className: "faa-vfr-tiles",
  })

  // prettier-ignore
  private ifrLowLayer = new TileLayer(`https://enroute.charts.api-v2.${getDefaultAppDomain()}/FAA/IFRL/{z}/{x}/{y}.png`, {
    minZoom: 1,
    maxNativeZoom: 10,
    maxZoom: this.maxFAAZoom,
    className: "faa-ifr-tiles"
  })

  // prettier-ignore
  private ifrHighLayer = new TileLayer(`https://enroute.charts.api-v2.${getDefaultAppDomain()}/FAA/IFRH/{z}/{x}/{y}.png`, {
    minZoom: 1,
    maxNativeZoom: 9,
    maxZoom: this.maxFAAZoom,
    className: "faa-ifr-tiles"
  })

  private styleElement = (() => {
    const style = document.createElement("style")
    style.innerHTML = `
      .night .faa-vfr-tiles img {
        filter: brightness(0.6);
      }

      .night .faa-ifr-tiles img {
        filter: hue-rotate(180deg) invert(1);
      }
    `

    return style
  })()

  constructor(
    public auth: NavigraphAuth,
    public preset: PresetConfig = { type: "Navigraph", source: "VFR", theme: "DAY" },
    tileOptions?: TileLayerOptions,
  ) {
    super(getNavigraphTileURL(preset), tileOptions)

    this.on("remove", () => document.head?.removeChild(this.styleElement))
    this.on("add", () => {
      document.head.appendChild(this.styleElement)
      this.setPreset(preset)
    })

    const app = getApp()

    if (!app) throw new NotInitializedError("NavigraphTileLayer")

    if (!app.scopes.includes(Scope.TILES)) {
      Logger.warning(
        "NavigraphTileLayer was initialized, but the 'tiles' scope is missing. This may cause issues with loading tiles.",
      )
    }

    auth.onAuthStateChanged(() => this.redraw())

    if (!this.auth.isInitialized()) {
      Logger.warning(
        "NavigraphLayer was created before Navigraph Auth was initialized. Tiles may fail to load until a user is signed in.",
      )
    }
  }

  /**
   * Changes the preset that the map is rendering. Automatically rerenders the map.
   * @param preset The base style of the map tiles.
   * @param theme The color theme of the map tiles.
   * @example
   * ```ts
   * navigraphLayer.setPreset({ source: "IFR HIGH", theme: "NIGHT" });
   * ```
   */
  public setPreset(preset: PresetConfig) {
    const newUrl = getNavigraphTileURL(preset)
    this.setUrl(newUrl)

    this.toggleFAALayer(this.vfrLayer, preset.type === "FAA" && preset.source === "VFR")
    this.toggleFAALayer(this.tacLayer, preset.type === "FAA" && preset.source === "VFR" && (preset.withTAC ?? false))
    this.toggleFAALayer(this.ifrLowLayer, preset.type === "FAA" && preset.source === "IFR LOW")
    this.toggleFAALayer(this.ifrHighLayer, preset.type === "FAA" && preset.source === "IFR HIGH")

    document.body.classList.toggle("night", preset.theme === "NIGHT")

    Logger.debug("Changed map preset", preset)

    this.preset = preset
  }

  private toggleFAALayer(layer: TileLayer, visible: boolean) {
    if (visible && !this._map.hasLayer(layer)) {
      Logger.debug("Adding FAA layer", layer)
      layer.addTo(this._map)
    } else if (!visible && this._map.hasLayer(layer)) {
      Logger.debug("Removing FAA layer", layer)
      layer.remove()
    }
  }

  protected createTile(coords: Coords, done: DoneCallback): HTMLElement {
    const url = this.getTileUrl(coords)
    const img = document.createElement("img")

    img.onerror = () => {
      Logger.debug("Failed to load tile!")

      this.isMissingAuth = this.auth.getUser() === null
      const tileHasFailedBefore = this.FAILED_TILES.has(url)

      if (tileHasFailedBefore || this.isMissingAuth) return

      Logger.debug("Refreshing auth and tile...")
      this.FAILED_TILES.add(url)
      this.auth
        .getUser(true)
        .then(() => (img.src = url))
        .catch(() => (this.isMissingAuth = true))
    }

    img.onload = () => {
      done(undefined, img)
      this.FAILED_TILES.clear()
      Logger.debug("Loaded tile successfully!")
    }

    img.src = url

    return img
  }
}
