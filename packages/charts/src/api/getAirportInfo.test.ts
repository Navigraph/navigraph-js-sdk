import { navigraphRequest } from "@navigraph/auth"
import getAirportInfo from "./getAirportInfo"

const getSpy = jest.spyOn(navigraphRequest, "get")
const consoleSpy = jest.spyOn(console, "error").mockImplementation()

it("given a valid icao, when no user is authenticated, should return null and log an error", async () => {
  getSpy.mockImplementation(() =>
    Promise.reject({
      message: "Request failed with status code 401",
      isAxiosError: true,
      response: {
        status: 401,
        data: "Unauthorized",
      },
    }),
  )

  const response = await getAirportInfo({ icao: "ESSA" })

  expect(response).toEqual(null)
  expect(consoleSpy).toHaveBeenCalledWith(
    "[Navigraph]",
    "Failed to fetch airport information. Reason:",
    "Request failed with status code 401",
  )
})

// TODO: Figure out how to mock `navigraphRequest` without breaking the interceptors in order to simulate authenticated requests
