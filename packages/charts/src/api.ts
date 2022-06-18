import { authenticatedAxios } from "auth";
import { CHARTS_API_ROOT } from "./constants";
import { Chart, ChartsIndexResponse } from "./public-types";

export const requestChartsIndex = async (icao: string): Promise<ChartsIndexResponse["charts"]> => {
  const result = await authenticatedAxios.get<ChartsIndexResponse>(`${CHARTS_API_ROOT}/charts/${icao}`);
  return result.data.charts;
};

export const requestChartImage = async (chart: Chart, dayMode = true): Promise<Blob> => {
  const imageUrl = dayMode ? chart.image_day_url : chart.image_night_url;
  const result = await authenticatedAxios.get<Blob>(imageUrl, {
    responseType: "blob",
  });
  // eslint-disable-next-line no-undef
  return new File([result.data], chart + ".png");
};
