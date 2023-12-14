# @navigraph/leaflet

## 2.0.0

### Major Changes

- [#85](https://github.com/Navigraph/navigraph-js-sdk/pull/85) [`509b64d`](https://github.com/Navigraph/navigraph-js-sdk/commit/509b64d7db964fbacdab391a4c6db806b8d91f7c) Thanks [@SkySails](https://github.com/SkySails)! - Added support for FAA Sectionals (VFR & IFR)

## 1.1.3

### Patch Changes

- Updated dependencies [[`fc8ef31`](https://github.com/Navigraph/navigraph-js-sdk/commit/fc8ef31c1a09b6ccf465ab0c91a58b7e59da9c99), [`5561a94`](https://github.com/Navigraph/navigraph-js-sdk/commit/5561a94808514046d8dd1b924b5a8b1101818a04)]:
  - @navigraph/auth@2.5.1
  - @navigraph/app@1.3.5

## 1.1.2

### Patch Changes

- Updated dependencies [[`b1ecbc8`](https://github.com/Navigraph/navigraph-js-sdk/commit/b1ecbc89f6fe1c951bcf9a04d8cd03eba2342037)]:
  - @navigraph/auth@2.5.0

## 1.1.1

### Patch Changes

- [`f1a850f`](https://github.com/Navigraph/navigraph-js-sdk/commit/f1a850fd7ea613ba9467b93d7643de2887dcc97e) Thanks [@SkySails](https://github.com/SkySails)! - Improved reliability of the enroute map by making sure that it is re-rendered on every change to the authenticated user

## 1.1.0

### Minor Changes

- [`9c63110`](https://github.com/Navigraph/navigraph-js-sdk/commit/9c63110fac945ac8ff5035215453aa24fb216069) Thanks [@SkySails](https://github.com/SkySails)!
  - Added error handling for uninitialized or badly configured client settings.
  - Removed unnecessary and potentially problematic bundling of Navigraph dependencies

## 1.0.3

### Patch Changes

- [`1d45f35`](https://github.com/Navigraph/navigraph-js-sdk/commit/1d45f356143b84b102bccf939b87ce9cd8328377) Thanks [@SkySails](https://github.com/SkySails)! - Added support for passing in a `TileLayerOptions` object to the `NavigraphTileLayer` in order to configure the default Leaflet options.

## 1.0.2

### Patch Changes

- [`5cb7606`](https://github.com/Navigraph/navigraph-js-sdk/commit/5cb7606baa7acfe8fdd9060b31795e0170a90cd3) Thanks [@SkySails](https://github.com/SkySails)! - Added ability to partially update the map preset. It is now possible to just change the theme, or just the source without specifying the other explicitly.

- [`cbe01a5`](https://github.com/Navigraph/navigraph-js-sdk/commit/cbe01a52bec0a0bfe3086ae83700733dc0e7bc9c) Thanks [@SkySails](https://github.com/SkySails)! - Fixed typo in type name

## 1.0.1

### Patch Changes

- [`35e9eaf`](https://github.com/Navigraph/navigraph-js-sdk/commit/35e9eaf64d471f2d88e32e6ad147f6b98aa529c9) Thanks [@SkySails](https://github.com/SkySails)! - Export types with consistent names, use types instead of enum.

## 1.0.0

### Major Changes

- [`e50b445`](https://github.com/Navigraph/navigraph-js-sdk/commit/e50b44549d18bb45c32e920ed19b5c683e0f88b8) Thanks [@SkySails](https://github.com/SkySails)! - The first release of the `@navigraph/leaflet` module!
