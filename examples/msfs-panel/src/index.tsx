import "core-js/stable";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { NavigraphAuthProvider } from "./hooks/useNavigraphAuth";

ReactDOM.render(
  <React.StrictMode>
    <NavigraphAuthProvider>
      <App />
    </NavigraphAuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
