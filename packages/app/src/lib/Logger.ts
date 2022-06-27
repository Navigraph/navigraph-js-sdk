/* eslint-disable no-console */
export const LEVELS = ["emerg", "alert", "crit", "err", "warning", "notice", "info", "debug"] as const;
export type LogLevel = typeof LEVELS[number];

class Logger {
  level: LogLevel = "notice";

  private _log(level: LogLevel, ...message: any[]) {
    if (LEVELS.indexOf(this.level) < LEVELS.indexOf(level)) {
      return;
    }

    const prefixedMsg = ["[Navigraph SDK]", ...message];

    switch (level) {
      case "emerg":
      case "alert":
      case "crit":
      case "err":
        console.error(...prefixedMsg);
        break;
      case "debug":
        console.debug(...prefixedMsg);
        break;
      default:
        console.log(...prefixedMsg);
        break;
    }
  }
  log(...message: any[]) {
    this._log("info", ...message);
  }

  emerg(...message: any[]) {
    this._log("emerg", ...message);
  }

  alert(...message: any[]) {
    this._log("alert", ...message);
  }

  crit(...message: any[]) {
    this._log("crit", ...message);
  }

  err(...message: any[]) {
    this._log("err", ...message);
  }

  warning(...message: any[]) {
    this._log("warning", ...message);
  }

  notice(...message: any[]) {
    this._log("notice", ...message);
  }

  info(...message: any[]) {
    this._log("info", ...message);
  }

  debug(...message: any[]) {
    this._log("debug", ...message);
  }
}

const logger = new Logger();
export default logger;
