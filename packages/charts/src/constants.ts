import { getDefaultAppDomain } from "@navigraph/app";

export const getChartsApiRoot = () => `https://api.${getDefaultAppDomain()}/v2/charts`;
