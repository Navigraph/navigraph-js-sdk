import { Logger } from "@navigraph/app";
import { isAxiosError, navigraphRequest } from "@navigraph/auth";
import { Chart } from "../public-types";

/** Fetches a chart image blob based on a {@link Chart} object.
 * @param {Chart} options.chart - The chart relevant Chart object
 * @param {("light"|"dark")} options.theme - The theme to apply to the chart
 * @returns {Blob} A chart image blob
 */
export default async function getChartImage({
  chart,
  theme = "light",
}: {
  chart: Chart;
  /** @default "light" */
  theme?: "light" | "dark";
}): Promise<Blob | null> {
  const imageUrl = theme === "light" ? chart.image_day_url : chart.image_night_url;
  const result = await navigraphRequest
    .get<Blob>(imageUrl, {
      responseType: "blob",
    })
    .catch((e: unknown) =>
      Logger.err("Failed to fetch charts image. Reason:", isAxiosError(e) ? e.message : e)
    );
  return result?.data || null;
}
