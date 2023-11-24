import { getDefaultAppDomain } from "@navigraph/app"

export const getPackagesApiRoot = () => `https://api.${getDefaultAppDomain()}/v1/navdata/packages`
