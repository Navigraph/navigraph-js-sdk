import { NoPackagesFoundError } from "@navigraph/app"
import { getPackages } from "./getPackages"
import { NavigraphPackage } from "./types"

/**
 * Retrieves a Navigraph package by format.
 * This function should be used to fetch a package in a specific format.
 * This is useful for clients that has access to more formats than the default one.
 *
 * @returns {Promise<NavigraphPackage>} A promise that resolves to a NavigraphPackage object.
 * @throws {NoPackagesFoundError} If no package is found or if the API request fails.
 * @throws {RequestFailedError} If the API request fails.
 *
 * @example
 * try {
 *   const package = await getPackageByFormat("DFD_json");
 *   console.log(package);
 * } catch (error) {
 *   console.error("Failed to retrieve the package:", error);
 * }
 */
export async function getPackageByFormat(format: string): Promise<NavigraphPackage> {
  const packageItem = await getPackages({ single: true, format })
  if (!packageItem) throw new NoPackagesFoundError()
  return packageItem
}
