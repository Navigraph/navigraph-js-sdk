import { _apps } from "./internal";
import { NavigraphApp } from "./public-types";

export const getApp = () => {
  const app = _apps.get("DEFAULT");
  return app;
};

/** Initialize a Navigraph application. This configures the Navigraph SDK
 *  with the necessary details to authenticate and communicate with Navigraph APIs. */
export function initializeApp(app: NavigraphApp) {
  _apps.set("DEFAULT", app);
}
