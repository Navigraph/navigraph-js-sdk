/* eslint-disable no-console */
export const LEVELS = ["emerg", "alert", "crit", "err", "warning", "notice", "info", "debug"] as const
export type LogLevel = (typeof LEVELS)[number]

class Logger {
  level: LogLevel = "notice"

  private _log(level: LogLevel, ...message: unknown[]) {
    if (LEVELS.indexOf(this.level) < LEVELS.indexOf(level)) {
      return
    }

    switch (level) {
      case "emerg":
      case "alert":
      case "crit":
      case "err":
        console.error("[Navigraph]", ...message)
        break
      case "warning":
        console.warn("[Navigraph]", ...message)
        break
      case "debug":
        console.debug("[Navigraph]", ...message)
        break
      default:
        console.log("[Navigraph]", ...message)
        break
    }
  }
  log(...message: unknown[]) {
    this._log("info", ...message)
  }

  emerg(...message: unknown[]) {
    this._log("emerg", ...message)
  }

  alert(...message: unknown[]) {
    this._log("alert", ...message)
  }

  crit(...message: unknown[]) {
    this._log("crit", ...message)
  }

  err(...message: unknown[]) {
    this._log("err", ...message)
  }

  warning(...message: unknown[]) {
    this._log("warning", ...message)
  }

  notice(...message: unknown[]) {
    this._log("notice", ...message)
  }

  info(...message: unknown[]) {
    this._log("info", ...message)
  }

  debug(...message: unknown[]) {
    this._log("debug", ...message)
  }
}

const logger = new Logger()
export default logger
