import { Logger, RequestFailedError } from "@navigraph/app"
import { isAxiosError, navigraphRequest } from "@navigraph/auth"
import { getPackagesApiRoot } from "../constants"
import { NavigraphPackage, PackageStatus } from "./types"

export interface PackageResponseItem {
  package_id: string
  cycle: string
  revision: string
  description: string
  format: string
  package_status: string
  format_type: string
  files: {
    file_id: string
    key: string
    hash: string
    signed_url: string
  }[]
  addons: {
    addon_id: string
  }[]
}

/**
 * Fetches Navigraph packages from the API.
 * This private shared function can retrieve either a single package or an array of packages based on the provided options.
 * It allows specifying the format of the package data and whether a single package should be returned.
 * It also maps the API response to the simpler NavigraphPackage type to avoid exposing the legacy API response structure.
 *
 * @param {Object} [options] - Optional parameters for the fetch request.
 * @param {string} [options.format] - The format of the package data to be returned. If not specified, all available formats are returned.
 * @param {boolean} [options.single] - Set to true to return only the first package. If false or not provided, an array of packages is returned.
 * @returns {Promise<NavigraphPackage[] | NavigraphPackage | null>} A promise that resolves to either an array of NavigraphPackage objects, a single NavigraphPackage object, or null if no packages are found.
 * @throws {RequestFailedError} If the API request fails, with a message indicating the reason for failure.
 *
 * @example
 * // Fetch multiple packages in default format
 * fetchPackages().then(packages => console.log(packages));
 *
 * @example
 * // Fetch a single package in a specific format
 * fetchPackages({ format: 'DFD', single: true }).then(package => console.log(package));
 */
export async function getPackages<
  TSingle extends boolean = false,
  TReturn = TSingle extends true ? NavigraphPackage : NavigraphPackage[],
>(options?: { format?: string; single?: TSingle }): Promise<TReturn | null> {
  try {
    const formatQuery = options?.format ? `?format=${options.format}` : ""
    const result = await navigraphRequest.get<PackageResponseItem[]>(`${getPackagesApiRoot()}${formatQuery}`)

    if (options?.single) {
      return result?.data && result?.data.length > 0 ? (mapResponseToNavigraphPackage(result.data[0]) as TReturn) : null
    } else {
      return result?.data ? (result.data.map(mapResponseToNavigraphPackage) as TReturn) : null
    }
  } catch (e) {
    const error = isAxiosError(e) ? e.message : (e as string)
    Logger.err("Failed to fetch packages. Reason:", error)
    throw new RequestFailedError("packages", error)
  }
}

function mapResponseToNavigraphPackage(pkg: PackageResponseItem): NavigraphPackage {
  const file = pkg.files.length > 0 ? pkg.files[0] : null

  return {
    id: pkg.package_id,
    cycle: pkg.cycle,
    revision: pkg.revision,
    format: pkg.format,
    status: mapStatus(pkg.package_status),
    file: file
      ? {
          fileName: file.key,
          hash: file.hash,
          url: file.signed_url,
        }
      : undefined,
  }
}

function mapStatus(status: string): PackageStatus {
  switch (status) {
    case "current":
      return PackageStatus.CURRENT
    case "deprecated":
      return PackageStatus.DEPRECATED
    case "outdated":
      return PackageStatus.OUTDATED
    case "future":
      return PackageStatus.FUTURE
    case "previous":
      return PackageStatus.PREVIOUS
    default:
      return PackageStatus.UNKNOWN
  }
}
