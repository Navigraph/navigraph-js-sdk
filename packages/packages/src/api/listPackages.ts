import { NoPackagesFoundError } from "@navigraph/app"
import { getPackages } from "./getPackages"
import { NavigraphPackage } from "./types"

/**
 * Retrieves a list of Navigraph packages.
 * This function fetches packages from the Navigraph API based on the specified format.
 * It's useful for obtaining multiple packages in a specified format or all available formats if none is specified.
 *
 * @param {Object} [options] - Optional parameters for the fetch request.
 * @param {string} [options.format] - The format(s) of the package data to be returned, specified as comma-separated values.
 *                                   If not provided, packages in all available formats for your client are returned.
 * @returns {Promise<NavigraphPackage[]>} A promise that resolves to an array of NavigraphPackage objects.
 * @throws {NoPackagesFoundError} If no package is found or if the API request fails.
 * @throws {RequestFailedError} If the API request fails.
 *
 * @example
 * // Fetch packages in a specific format
 * getPackages({ format: 'pdf' }).then(packages => console.log(packages));
 *
 * @example
 * // Fetch packages in all available formats
 * getPackages().then(packages => console.log(packages));
 */
export async function listPackages(options?: { format: string }): Promise<NavigraphPackage[]> {
  const packages = await getPackages(options)
  if (!packages) throw new NoPackagesFoundError()
  return packages
}
