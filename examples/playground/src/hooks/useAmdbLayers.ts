import { AmdbLayerName, AmdbResponseStructure, getAmdbAPI } from "@navigraph/amdb"
import { useQueries } from "@tanstack/react-query"

/**
 * A hook which provides layer data from the AMDB API
 * @param idarpt - ICAO code of the airport to query data from
 * @param amdbLayers - List of AMDB layer names to provide data from
 * @returns - A list of layer tuples, containing the layer name and the data. The data will be undefined if the query for that layer did not resolve correctly
 */
export default function useAmdbLayers(
  idarpt: string,
  amdbLayers: AmdbLayerName[],
): [AmdbLayerName, AmdbResponseStructure[AmdbLayerName] | undefined][] {
  const amdb = getAmdbAPI()

  const data = useQueries({
    queries: amdbLayers.map(layer => ({
      queryKey: ["amdb-data", idarpt, layer],
      // This could potentially be optimised to use getAmdbLayers to query multiple at once, but make sure it only queries the difference when `amdbLayers` updates
      queryFn: async () => await amdb.getAmdbLayer({ icao: idarpt, layer }),
    })),
  })

  return data.map(({ data }, i) => [amdbLayers[i], data ?? undefined])
}
