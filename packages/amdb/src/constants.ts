import { getDefaultAppDomain } from "@navigraph/app"

export const getAmdbApiRoot = () => `https://amdb.api.${getDefaultAppDomain()}/v1`
