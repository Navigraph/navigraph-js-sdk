import logger from "../lib/Logger";
import { NavigraphApp } from "../lib/initializeApp";

export let app: NavigraphApp | undefined;

/** Returns a reference to the currently configured {@link NavigraphApp}. */
export const getApp = () => app;

/** Updates the {@link app} reference. */
export const setApp = (newApp: NavigraphApp) => {
  if (app) {
    logger.warning(
      "Navigraph App has already been initialized. The existing configuration will be overwritten."
    );
  }

  app = newApp;
};

/** Returns the domain for the currently configured {@link NavigraphApp}. */
export const getDefaultAppDomain = () => app?.domain ?? "navigraph.com";
