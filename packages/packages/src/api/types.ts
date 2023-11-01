export enum PackageStatus {
  CURRENT = "current",
  DEPRECATED = "deprecated",
  OUTDATED = "outdated",
  FUTURE = "future",
  PREVIOUS = "previous",
  UNKNOWN = "unknown",
}

/**
 * Represents a file in the Navigraph Packages API.
 */
export interface NavigraphFile {
  /**
   * The name of the file.
   */
  fileName: string
  /**
   * The SHA256 hash of the file.
   */
  hash: string
  /**
   * The URL of the file.
   */
  url: string
}

/**
 * Represents a Navigraph package.
 */
export interface NavigraphPackage {
  /** The ID of the package. */
  id: string
  /** The AIRAC cycle of the package. */
  cycle: string
  /** The revision of the package. */
  revision: string
  /** The format of the package. */
  format: string
  /** The status of the package. */
  status: PackageStatus
  /** The file object */
  file?: NavigraphFile
}
