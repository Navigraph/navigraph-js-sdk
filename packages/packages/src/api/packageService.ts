import { Logger } from "@navigraph/app"
import { isAxiosError, navigraphRequest } from "@navigraph/auth"
import { getPackagesApiRoot } from "../constants"
import { NavigraphPackage, PackageStatus } from "./types"

interface PackageResponseItem {
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
 * @throws {Error} Throws an error if the API request fails, with a message indicating the reason for failure.
 *
 * @example
 * // Fetch multiple packages in default format
 * fetchPackages().then(packages => console.log(packages));
 *
 * @example
 * // Fetch a single package in a specific format
 * fetchPackages({ format: 'DFD', single: true }).then(package => console.log(package));
 */
async function fetchPackages(options?: {
  format?: string
  single?: boolean
}): Promise<NavigraphPackage[] | NavigraphPackage | null> {
  try {
    const formatQuery = options?.format ? `?format=${options.format}` : ""
    const result = await navigraphRequest.get<PackageResponseItem[]>(`${getPackagesApiRoot()}${formatQuery}`)

    if (options?.single) {
      return result?.data && result?.data.length > 0 ? mapResponseToNavigraphPackage(result.data[0]) : null
    } else {
      return result?.data ? result.data.map(mapResponseToNavigraphPackage) : null
    }
  } catch (e) {
    const error = isAxiosError(e) ? e.message : (e as string)
    Logger.err("Failed to fetch packages. Reason:", error)
    throw new Error(`Failed to fetch packages. Reason: ${error}`)
  }
}

/**
 * Retrieves a list of Navigraph packages.
 * This function fetches packages from the Navigraph API based on the specified format.
 * It's useful for obtaining multiple packages in a specified format or all available formats if none is specified.
 *
 * @param {Object} [options] - Optional parameters for the fetch request.
 * @param {string} [options.format] - The format(s) of the package data to be returned, specified as comma-separated values.
 *                                   If not provided, packages in all available formats for your client are returned.
 * @returns {Promise<NavigraphPackage[]>} A promise that resolves to an array of NavigraphPackage objects.
 * @throws {Error} Throws an error if no packages are found or if the API request fails.
 *
 * @example
 * // Fetch packages in a specific format
 * getPackages({ format: 'pdf' }).then(packages => console.log(packages));
 *
 * @example
 * // Fetch packages in all available formats
 * getPackages().then(packages => console.log(packages));
 */
export async function getPackages(options?: { format: string }): Promise<NavigraphPackage[]> {
  const packages = await fetchPackages(options)
  if (!packages) {
    throw new Error("No packages found")
  }
  return packages as NavigraphPackage[]
}

/**
 * Retrieves a Navigraph package.
 * This function is typically what should be used to retrieve a package from the Navigraph API.
 *
 * @returns {Promise<NavigraphPackage>} A promise that resolves to a NavigraphPackage object.
 * @throws {Error} Throws an error if no package is found or if the API request fails.
 *
 * @example
 * try {
 *   const package = await getPackage();
 *   console.log(package);
 * } catch (error) {
 *   console.error("Failed to retrieve the package:", error);
 * }
 */
export async function getPackage(): Promise<NavigraphPackage> {
  const packageItem = await fetchPackages({ single: true })
  if (!packageItem) {
    throw new Error("No package found")
  }
  return packageItem as NavigraphPackage
}
