import "@Styles/globals.scss";

import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import React from "react";
import { NavigraphAuthProvider } from "src/hooks/useNavigraphAuth";

interface CustomAppProps extends AppProps {
  Component: {
    Layout?: ({ children }: { children: React.ReactNode }) => JSX.Element;
  } & AppProps["Component"];
}

export default function App({ Component, pageProps }: CustomAppProps) {
  const LayoutComponent = Component.Layout || React.Fragment;
  return (
    <ThemeProvider attribute="class">
      <NavigraphAuthProvider>
        <LayoutComponent {...(Component.Layout ? pageProps : { children: pageProps.children })}>
          <Component {...pageProps} />
        </LayoutComponent>
      </NavigraphAuthProvider>
    </ThemeProvider>
  );
}
