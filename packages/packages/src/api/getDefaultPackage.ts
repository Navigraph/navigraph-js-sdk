import { NoPackagesFoundError } from "@navigraph/app"
import { getPackages } from "./getPackages"
import { NavigraphPackage } from "./types"

/**
 * Retrieves a Navigraph package.
 * This function is typically what should be used to retrieve a package from the Navigraph API.
 *
 * @returns {Promise<NavigraphPackage>} A promise that resolves to a NavigraphPackage object.
 * @throws {NoPackagesFoundError} If no package is found or if the API request fails.
 * @throws {RequestFailedError} If the API request fails.
 *
 * @example
 * try {
 *   const package = await getPackage();
 *   console.log(package);
 * } catch (error) {
 *   console.error("Failed to retrieve the package:", error);
 * }
 */
export async function getDefaultPackage(): Promise<NavigraphPackage> {
  const packageItem = await getPackages({ single: true })
  if (!packageItem) throw new NoPackagesFoundError()
  return packageItem
}
