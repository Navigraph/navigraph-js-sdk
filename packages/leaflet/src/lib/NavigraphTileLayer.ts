import { Logger, getDefaultAppDomain } from "@navigraph/app";
import { NavigraphAuth } from "@navigraph/auth";
import { TileLayer, Coords, DoneCallback } from "leaflet";

enum NavigraphRasterSourceOption {
  "IFR HIGH" = "ifr.hi",
  "IFR LOW" = "ifr.lo",
  "VFR" = "vfr",
  "WORLD" = "world",
}

export type NavigraphRasterSource = keyof typeof NavigraphRasterSourceOption;
export type NavigraphRasterTheme = "DAY" | "NIGHT";

export interface PresetConfig {
  source: NavigraphRasterSource;
  theme: NavigraphRasterTheme;
  forceRetina?: boolean;
}

function getNavigraphTileURL(
  source: NavigraphRasterSource = "VFR",
  theme: NavigraphRasterTheme = "DAY",
  retina = false
) {
  return `https://enroute-bitmap.charts.api-v2.${getDefaultAppDomain()}/styles/${NavigraphRasterSourceOption[source]}.${theme.toLowerCase()}/{z}/{x}/{y}${retina ? "@2x" : "{r}"}.png` // prettier-ignore
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
  protected FAILED_TILES = new Set<string>();

  /** Indicates whether map tiles failed to load due to authentication being invalid or missing. */
  private isMissingAuth = false;

  constructor(public auth: NavigraphAuth, public preset: PresetConfig = { source: "VFR", theme: "DAY" }) {
    super(getNavigraphTileURL(preset.source, preset.theme, preset.forceRetina));

    auth.onAuthStateChanged((user) => {
      if (this.isMissingAuth && user) {
        this.redraw();
        this.isMissingAuth = false;
      }
    });

    if (!this.auth.isInitialized()) {
      Logger.warning(
        "NavigraphLayer was created before Navigraph Auth was initialized. Tiles may fail to load until a user is signed in."
      );
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
    this.preset = preset;
    const newUrl = getNavigraphTileURL(preset.source, preset.theme, preset.forceRetina);
    this.setUrl(newUrl);
  }

  protected createTile(coords: Coords, done: DoneCallback): HTMLElement {
    const url = this.getTileUrl(coords);
    const img = document.createElement("img");

    img.onerror = () => {
      Logger.debug("Failed to load tile!");

      this.isMissingAuth = this.auth.getUser() === null;
      const tileHasFailedBefore = this.FAILED_TILES.has(url);

      if (tileHasFailedBefore || this.isMissingAuth) return;

      Logger.debug("Refreshing auth and tile...");
      this.FAILED_TILES.add(url);
      this.auth
        .getUser(true)
        .then(() => (img.src = url))
        .catch(() => (this.isMissingAuth = true));
    };

    img.onload = () => {
      done(undefined, img);
      this.FAILED_TILES.clear();
      Logger.debug("Loaded tile successfully!");
    };

    img.src = url;

    return img;
  }
}
