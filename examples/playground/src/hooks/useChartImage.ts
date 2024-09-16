import { Chart, getChartsAPI } from "@navigraph/charts"
import { NavigraphTheme } from "@navigraph/leaflet"
import { useQuery } from "@tanstack/react-query"

/**
 * Gets a local URL for the image of a chosen theme for a specific chart
 */
export default function useChartImage(chart?: Chart | null, theme: NavigraphTheme = "DAY") {
  const charts = getChartsAPI()

  const { data } = useQuery({
    queryKey: ["chart-url", chart, theme],
    queryFn: async () => {
      if (!chart) return null

      const blob = await charts.getChartImage({
        chart,
        theme: theme === "DAY" ? "light" : "dark",
      })

      return blob && URL.createObjectURL(blob)
    },
  })

  return data ?? undefined
}
