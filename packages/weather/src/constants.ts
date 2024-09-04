import { getDefaultAppDomain } from "@navigraph/app"

export const getMetarApiRoot = () => `https://wx.api.${getDefaultAppDomain()}/v1/metar`
export const getTafApiRoot = () => `https://wx.api.${getDefaultAppDomain()}/v1/taf`
export const getRouteApiRoot = () => `https://wx.api.${getDefaultAppDomain()}/v1/route`
export const getAvwxApiRoot = () => `https://wx.api.${getDefaultAppDomain()}/v1/avwx`
