import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { NavigraphAuthProvider } from "./hooks/useNavigraphAuth.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NavigraphAuthProvider>
      <App />
    </NavigraphAuthProvider>
  </React.StrictMode>
);
