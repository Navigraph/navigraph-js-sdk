import { describe, expect, test, vi } from "vitest"
import logger from "./Logger"

describe("Logging utility", () => {
  test("Configured level above logged level", () => {
    logger.level = "err"
    const spy = vi.spyOn(console, "log").mockImplementation(() => undefined)
    logger.info("Message")
    expect(spy).not.toHaveBeenCalled()
    spy.mockRestore()
  })

  test("Configured level below logged level", () => {
    logger.level = "debug"
    const spy = vi.spyOn(console, "log").mockImplementation(() => undefined)
    logger.info("Message")
    expect(spy).toHaveBeenCalled()
    spy.mockRestore()
  })

  test("Configured level at logged level", () => {
    logger.level = "info"
    const spy = vi.spyOn(console, "log").mockImplementation(() => undefined)
    logger.info("Message")
    expect(spy).toHaveBeenCalled()
    spy.mockRestore()
  })

  test("One argument", () => {
    logger.level = "info"
    const spy = vi.spyOn(console, "log").mockImplementation(() => undefined)
    logger.info("Message")
    expect(spy).toHaveBeenCalledWith("[Navigraph]", "Message")
    spy.mockRestore()
  })

  test("Multi argument", () => {
    logger.level = "info"
    const spy = vi.spyOn(console, "log").mockImplementation(() => undefined)
    logger.info("More", "messages")
    expect(spy).toHaveBeenCalledWith("[Navigraph]", "More", "messages")
    spy.mockRestore()
  })

  test("Non-string", () => {
    logger.level = "info"
    const spy = vi.spyOn(console, "log").mockImplementation(() => undefined)
    logger.info(5)
    expect(spy).toHaveBeenCalledWith("[Navigraph]", 5)
    spy.mockRestore()
  })
})
