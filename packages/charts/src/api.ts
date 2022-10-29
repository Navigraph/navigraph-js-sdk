import { getApp, Logger, NotInitializedError, Scope } from "@navigraph/app";
import { navigraphRequest } from "@navigraph/auth";
import { getChartsApiRoot } from "./constants";
import { Chart, ChartsIndexResponse } from "./public-types";

/** Fetches an index of available charts for a specified airport
 * @param options.icao - The ICAO code of an airport
 * @returns {Chart[]} A list of chart objects
 */
const getChartsIndex = async ({ icao }: { icao: string }): Promise<Chart[] | null> => {
  const result = await navigraphRequest
    .get<ChartsIndexResponse>(`${getChartsApiRoot()}/${icao}`)
    .catch((e: AxiosError) => Logger.err("Failed to fetch charts index. Reason:", e?.message));
  return result?.data?.charts || null;
};

/** Fetches a chart image blob based on a {@link Chart} object.
 * @param {Chart} options.chart - The chart relevant Chart object
 * @param {("light"|"dark")} options.theme - The theme to apply to the chart
 * @returns {Blob} A chart image blob
 */
const getChartImage = async ({
  chart,
  theme = "light",
}: {
  chart: Chart;
  /** @default "light" */
  theme?: "light" | "dark";
}): Promise<Blob | null> => {
  const imageUrl = theme === "light" ? chart.image_day_url : chart.image_night_url;
  const result = await navigraphRequest
    .get<Blob>(imageUrl, {
      responseType: "blob",
    })
    .catch((e: AxiosError) => Logger.err("Failed to fetch charts image. Reason:", e?.message));
  return result?.data || null;
};

/** Grabs a reference to an object containing available Navigraph Charts API functionality */
export const getChartsAPI = () => {
  const app = getApp();

  if (!app) {
    throw new NotInitializedError("Auth");
  } else if (!app.scopes.includes(Scope.CHARTS)) {
    Logger.warning(
      "Your Navigraph Application does not have the CHARTS scope. Attempts to access the Charts API will fail."
    );
  }

  return {
    getChartsIndex,
    getChartImage,
  };
};
