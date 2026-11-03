import { describe, expect, test, vi } from "vitest"
import logger, { LogLevel } from "./Logger"

const silence = (method: "log" | "warn" | "error" | "debug") =>
  vi.spyOn(console, method).mockImplementation(() => undefined)

describe("Logger", () => {
  test("drops messages less severe than the configured level", () => {
    logger.level = "err"
    const log = silence("log")

    logger.info("Message")

    expect(log).not.toHaveBeenCalled()
  })

  test.for<{ configured: LogLevel }>([{ configured: "info" }, { configured: "debug" }])(
    "prints info messages when the configured level is $configured",
    ({ configured }) => {
      logger.level = configured
      const log = silence("log")

      logger.info("Message")

      expect(log).toHaveBeenCalledWith("[Navigraph]", "Message")
    },
  )

  test("prefixes the message and passes every argument through unchanged", () => {
    logger.level = "info"
    const log = silence("log")

    logger.info("Loaded", 5, { icao: "ESSA" })

    expect(log).toHaveBeenCalledWith("[Navigraph]", "Loaded", 5, { icao: "ESSA" })
  })

  test.for([
    { method: "emerg", output: "error" },
    { method: "alert", output: "error" },
    { method: "crit", output: "error" },
    { method: "err", output: "error" },
    { method: "warning", output: "warn" },
    { method: "notice", output: "log" },
    { method: "info", output: "log" },
    { method: "log", output: "log" },
    { method: "debug", output: "debug" },
  ] as const)("writes $method messages to console.$output", ({ method, output }) => {
    logger.level = "debug"
    const write = silence(output)

    logger[method]("Message")

    expect(write).toHaveBeenCalledWith("[Navigraph]", "Message")
  })
})
