import { navigraphRequest } from "@navigraph/auth";
import { Chart } from "../public-types";
import getChartImage from "./getChartImage";

const getSpy = jest.spyOn(navigraphRequest, "get");
const consoleSpy = jest.spyOn(console, "error").mockImplementation();

const chart: Chart = {
  image_day: "essa01p1_d.png",
  image_night: "essa01p1_n.png",
  thumb_day: "essa01p1_thumb_d.png",
  thumb_night: "essa01p1_thumb_n.png",
  icao_airport_identifier: "ESSA",
  id: "ESSA01P1",
  category: "APT",
  bounding_boxes: null,
  precision_approach: null,
  index_number: "10-1P1",
  name: "AIRPORT BRIEFING (GEN CONTD)",
  revision_date: "20220204",
  is_georeferenced: false,
  width: 1519,
  height: 2500,
  procedures: [],
  runways: [],
  image_day_url: "https://api.navigraph.com/v2/charts/ESSA/essa01p1_d.png",
  image_night_url: "https://api.navigraph.com/v2/charts/ESSA/essa01p1_n.png",
  thumb_day_url: "https://api.navigraph.com/v2/charts/ESSA/essa01p1_thumb_d.png",
  thumb_night_url: "https://api.navigraph.com/v2/charts/ESSA/essa01p1_thumb_n.png",
};

beforeEach(() => {
  jest.clearAllMocks();
});

it("given a valid chart, when no user is authenticated, should return null and log an error", async () => {
  getSpy.mockImplementation(() =>
    Promise.reject({
      message: "Request failed with status code 401",
      response: {
        status: 401,
        data: "Unauthorized",
      },
    })
  );

  const response = await getChartImage({ chart, theme: "light" });

  expect(response).toEqual(null);
  expect(consoleSpy).toHaveBeenCalledWith(
    "[Navigraph]",
    "Failed to fetch charts image. Reason:",
    "Request failed with status code 401"
  );
});

// TODO: Figure out how to mock `navigraphRequest` without breaking the interceptors in order to simulate authenticated requests
