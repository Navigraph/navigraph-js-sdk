import { NoPackagesFoundError } from "@navigraph/app"
import getPackages from "./getPackages"
import { NavigraphPackage } from "./types"

/**
 * Retrieves a Navigraph package.
 * This function is typically what should be used to retrieve a package from the Navigraph API.
 *
 * @param {string} [format] The format of the package to retrieve. If not specified, the default package will be retrieved.
 *
 * @returns {Promise<NavigraphPackage>} A promise that resolves to a NavigraphPackage object.
 * @throws {NoPackagesFoundError} If no package is found or if the API request fails.
 * @throws {RequestFailedError} If the API request fails.
 *
 * @example
 * try {
 *   const package = await getDefaultPackage();
 *   console.log(package);
 * } catch (error) {
 *   console.error("Failed to retrieve the package:", error);
 * }
 */
export default async function getPackage(format?: string): Promise<NavigraphPackage> {
  const packageItem = await getPackages({ format, default: !format })
  if (!packageItem) throw new NoPackagesFoundError()
  return packageItem
}
