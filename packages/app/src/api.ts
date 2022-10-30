import { _apps } from "./internal";
import logger from "./lib/Logger";
import { NavigraphApp, Scope } from "./public-types";

/** Grabs the currently authenticated Navigraph App. */
export const getApp = () => {
  const app = _apps.get("DEFAULT");
  return app;
};
export const getDefaultAppDomain = () => getApp()?.domain ?? "navigraph.com";
/**
 * Initialize a Navigraph application. This configures the Navigraph SDK
 * with the necessary details to authenticate and communicate with Navigraph APIs.
 * @param {NavigraphApp} app - The configuration needed to define your Navigraph application
 * */
export function initializeApp(app: NavigraphApp) {
  const DEFAULT_SCOPES = ["userinfo", "openid", "offline_access"] as unknown as Scope[];

  app.scopes = Array.from(new Set([...DEFAULT_SCOPES, ...app.scopes]));

  if (_apps.get("DEFAULT")) {
    logger.warning(
      "Navigraph App has already been initialized. The existing configuration will be overwritten."
    );
  }

  _apps.set("DEFAULT", app);
}
