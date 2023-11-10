/* eslint-disable max-classes-per-file */
export class NotInitializedError extends Error {
  constructor(source?: string) {
    const message = source ? `[${source}] Navigraph app is not initialized.` : "Navigraph app is not initialized."
    super(message)
    this.name = "NotInitializedError"
  }
}
export class UserDeniedAccessError extends Error {
  constructor() {
    super("Authentication failed. User denied access.")
    this.name = "UserDeniedAccessError"
  }
}

export class DeviceFlowTokenExpiredError extends Error {
  constructor() {
    super("Authentication failed. Device flow token expired.")
    this.name = "DeviceFlowTokenExpiredError"
  }
}

export class InvalidScopeError extends Error {
  constructor(scope?: string) {
    super(`Authentication failed. Invalid scope ${scope ? ": " + scope : "provided."}`)
    this.name = "InvalidScopeError"
  }
}

export class InvalidClientError extends Error {
  constructor() {
    super("Unable to sign in with device flow. The client is likely incorrectly configured.")
    this.name = "InvalidClientError"
  }
}

export class AuthenticationAbortedError extends Error {
  constructor() {
    super("Unable to sign in with device flow. The authentication was aborted.")
    this.name = "AuthenticationAborted"
  }
}

export class NonGeoreferencedChartError extends Error {
  constructor(indexNumber: string) {
    super(`Could not calculate bounds for ${indexNumber || "a chart"} since it is not georeferenced`)
    this.name = "NonGeoreferencedChartError"
  }
}

export class NoPackagesFoundError extends Error {
  constructor() {
    super("No packages found")
    this.name = "NoPackagesFoundError"
  }
}

export class RequestFailedError extends Error {
  constructor(resource: string, reason?: string) {
    super(`Failed to fetch ${resource}${reason ? `. Reason: ${reason}` : ""}`)
    this.name = "RequestFailedError"
  }
}
