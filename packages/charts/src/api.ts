import { getApp, Logger, NotInitializedError, Scope } from "@navigraph/app";
import { authenticatedAxios } from "@navigraph/auth";
import { CHARTS_API_ROOT } from "./constants";
import { Chart, ChartsIndexResponse } from "./public-types";

const getChartsIndex = async (props: { icao: string }): Promise<ChartsIndexResponse["charts"]> => {
  const result = await authenticatedAxios.get<ChartsIndexResponse>(`${CHARTS_API_ROOT}/charts/${props.icao}`);
  return result.data.charts;
};

const getChartImage = async ({
  chart,
  dayMode = true,
}: {
  chart: Chart;
  dayMode?: boolean;
}): Promise<Blob> => {
  const imageUrl = dayMode ? chart.image_day_url : chart.image_night_url;
  const result = await authenticatedAxios.get<Blob>(imageUrl, {
    responseType: "blob",
  });
  // eslint-disable-next-line no-undef
  return new File([result.data], chart + ".png");
};

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
