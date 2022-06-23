/* eslint-disable max-classes-per-file */
export class NotInitializedError extends Error {
  constructor(source?: string) {
    const message = source
      ? `[${source}] Navigraph app is not initialized.`
      : "Navigraph app is not initialized.";
    super(message);
    this.name = "NotInitializedError";
  }
}
export class UserDeniedAccessError extends Error {
  constructor() {
    super("Authentication failed. User denied access.");
    this.name = "UserDeniedAccessError";
  }
}

export class DeviceFlowTokenExpiredError extends Error {
  constructor() {
    super("Authentication failed. Device flow token expired.");
    this.name = "DeviceFlowTokenExpiredError";
  }
}

export class NonGeoreferencedChartError extends Error {
  constructor(indexNumber: string) {
    super(`Could not calculate bounds for ${indexNumber || "a chart"} since it is not georeferenced`);
    this.name = "NonGeoreferencedChartError";
  }
}
