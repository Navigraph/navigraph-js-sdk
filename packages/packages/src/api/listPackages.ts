import { NoPackagesFoundError } from "@navigraph/app"
import getPackages from "./getPackages"
import { NavigraphPackage } from "./types"

/**
 * Retrieves a list of Navigraph packages.
 * It's useful for listing all available packages assigned to the developer.
 *
 * @returns {Promise<NavigraphPackage[]>} A promise that resolves to an array of NavigraphPackage objects.
 * @throws {NoPackagesFoundError} If no package is found or if the API request fails.
 * @throws {RequestFailedError} If the API request fails.
 *
 * @example
 * // Fetch packages in all available formats
 * listPackages().then(packages => console.log(packages));
 */
export default async function listPackages(): Promise<NavigraphPackage[]> {
  const packages = await getPackages()
  if (!packages) throw new NoPackagesFoundError()
  return packages
}
