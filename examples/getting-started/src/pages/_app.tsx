import React from "react";
import type { AppProps } from "next/app";
import { NavigraphAuthProvider } from "../hooks/useNavigraphAuth";
import "../styles/globals.scss";

interface CustomAppProps extends AppProps {
  Component: {
    Layout?: ({ children }: { children: React.ReactNode }) => JSX.Element;
  } & AppProps["Component"];
}

export default function App({ Component, pageProps }: CustomAppProps) {
  const LayoutComponent = Component.Layout || React.Fragment;
  return (
    <NavigraphAuthProvider>
      <LayoutComponent {...(Component.Layout ? pageProps : { children: pageProps.children })}>
        <Component {...pageProps} />
      </LayoutComponent>
    </NavigraphAuthProvider>
  );
}
