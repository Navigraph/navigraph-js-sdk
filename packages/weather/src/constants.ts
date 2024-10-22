import { getDefaultAppDomain } from "@navigraph/app"

export const getWeatherApiRoot = () => `https://wx.api.${getDefaultAppDomain()}/v1`
