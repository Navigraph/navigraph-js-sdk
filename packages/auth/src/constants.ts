import { getDefaultAppDomain } from "@navigraph/app";

//TODO: Use Discovery doc
export const IDENTITY_DEVICE_AUTH_ENDPOINT = "/connect/deviceauthorization";
export const IDENTITY_TOKEN_ENDPOINT = "/connect/token";
export const IDENTITY_REVOCATION_ENDPOINT = "/connect/revocation";

export const getIdentityApiRoot = () => `https://identity.api.${getDefaultAppDomain()}`;
export const getIdentityDeviceAuthEndpoint = () => getIdentityApiRoot() + IDENTITY_DEVICE_AUTH_ENDPOINT;
export const getIdentityRevocationEndpoint = () => getIdentityApiRoot() + IDENTITY_REVOCATION_ENDPOINT;
export const getIdentityTokenEndpoint = () => getIdentityApiRoot() + IDENTITY_TOKEN_ENDPOINT;
