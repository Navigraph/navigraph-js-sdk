import { getDefaultAppDomain } from "@navigraph/app"

export const getAmdbApiRoot = () => `https://amdb.api.${getDefaultAppDomain()}/v1`
export const getInfoApiRoot = () => `https://amdb.api.${getDefaultAppDomain()}/info`
