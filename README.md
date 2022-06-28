<div align="center">
  <a href="https://navigraph.com">
    <img src="https://navigraph.com/assets/images/navigraph_logo_only.svg" alt="Logo" width="80" height="80">
  </a>

  <h1>Navigraph SDK</h1>

  <p>The Navigraph SDK for TypeScript/JavaScript implementations of Navigraph APIs and services.</p>
  
  <a href="https://developers.devigraph.com/docs/sdk/getting-started"><strong>Read the documentation »</strong></a>
  <br />

  <div align="center">
  <a href="https://img.shields.io/npm/v/navigraph?label=navigraph&style=flat-square">
    <img src="https://img.shields.io/npm/v/navigraph?label=navigraph&style=flat-square" alt="npm - navigraph">
  </a>
  <a href="https://img.shields.io/npm/v/navigraph?label=%40navigraph%2Fapp&style=flat-square">
    <img src="https://img.shields.io/npm/v/navigraph?label=%40navigraph%2Fapp&style=flat-square" alt="npm - @navigraph/app">
  </a>
  <a href="https://img.shields.io/npm/v/navigraph?label=%40navigraph%2Fauth&style=flat-square">
    <img src="https://img.shields.io/npm/v/navigraph?label=%40navigraph%2Fauth&style=flat-square" alt="npm - @navigraph/auth">
  </a>
  <a href="https://img.shields.io/npm/v/navigraph?label=%40navigraph%2Fcharts&style=flat-square">
    <img src="https://img.shields.io/npm/v/navigraph?label=%40navigraph%2Fcharts&style=flat-square" alt="npm - @navigraph/charts">
  </a>
</div>
</div>

## Installation

### Yarn

```
yarn add navigraph
```

### NPM

```
npm i -S navigraph
```

## Usage

For a full example implementation, see [`/examples/getting-started/`](/examples/getting-started/).

```ts
import { initializeApp, Scope } from "navigraph/app";
import { getAuth } from "navigraph/auth";
import { getChartsAPI } from "navigraph/charts";

const config: NavigraphApp = {
  clientId: "<YOUR_NAVIGRAPH_CLIENT_ID>",
  clientSecret: "<YOUR_NAVIGRAPH_CLIENT_SECRET>",
  scopes: [Scope.CHARTS /* Additional scopes here */],
};

initializeApp(config);

export const auth = getAuth();
export const charts = getChartsAPI();

auth.signInWithDeviceFlow((params) =>
  /* Show params.verification_uri_complete as a QR code, scan it, sign in */
)

charts.getChartsIndex({ icao: "KJFK" }).then(console.log) // => { "charts": [{ "index_number": "10-1P" ...
```

## Supported environments

This library aims to be compatible with Coherent GT, as implemented by Microsoft Flight simulator. According to Coherent their environment is similar to Safari 10.1.2 (STP 34), so by supporting this environment we should be supporting any modern environment as well, both Node and browser.

## License

Distributed under the MIT License. See [`LICENSE`](/LICENSE) for more information.
