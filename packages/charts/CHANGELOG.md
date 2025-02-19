# @navigraph/charts

## 2.1.0

### Minor Changes

- [#97](https://github.com/Navigraph/navigraph-js-sdk/pull/97) [`cd467ac`](https://github.com/Navigraph/navigraph-js-sdk/commit/cd467ac5db40b9a01a13ee358b0fbdb41a485af1) Thanks [@professoralex13](https://github.com/professoralex13)! - fix types export

### Patch Changes

- Updated dependencies [[`cd467ac`](https://github.com/Navigraph/navigraph-js-sdk/commit/cd467ac5db40b9a01a13ee358b0fbdb41a485af1)]:
  - @navigraph/auth@2.6.0
  - @navigraph/app@1.4.0

## 2.0.5

### Patch Changes

- Updated dependencies [[`0e88baf`](https://github.com/Navigraph/navigraph-js-sdk/commit/0e88baff14209d4179ee0f70b2292626817cd2f4)]:
  - @navigraph/app@1.3.6
  - @navigraph/auth@2.5.2

## 2.0.4

### Patch Changes

- Updated dependencies [[`fc8ef31`](https://github.com/Navigraph/navigraph-js-sdk/commit/fc8ef31c1a09b6ccf465ab0c91a58b7e59da9c99), [`5561a94`](https://github.com/Navigraph/navigraph-js-sdk/commit/5561a94808514046d8dd1b924b5a8b1101818a04)]:
  - @navigraph/auth@2.5.1
  - @navigraph/app@1.3.5

## 2.0.3

### Patch Changes

- Updated dependencies [[`b1ecbc8`](https://github.com/Navigraph/navigraph-js-sdk/commit/b1ecbc89f6fe1c951bcf9a04d8cd03eba2342037)]:
  - @navigraph/auth@2.5.0

## 2.0.2

### Patch Changes

- Updated dependencies [[`ebe1b9f`](https://github.com/Navigraph/navigraph-js-sdk/commit/ebe1b9fc24df9d6407ff98b0e3fb28903889835f)]:
  - @navigraph/auth@2.4.3

## 2.0.1

### Patch Changes

- [`7d0bd67`](https://github.com/Navigraph/navigraph-js-sdk/commit/7d0bd6727385d0252a298c45e87bf7e4d77cd55e) Thanks [@SkySails](https://github.com/SkySails)! - Added ability to choose between standard and CAO charts when fetching a charts index.

- Updated dependencies [[`5964894`](https://github.com/Navigraph/navigraph-js-sdk/commit/596489472608b75190ed5e969638c1c3a76eecdc)]:
  - @navigraph/app@1.3.4
  - @navigraph/auth@2.4.2

## 2.0.0

### Major Changes

- [`23db6a6`](https://github.com/Navigraph/navigraph-js-sdk/commit/23db6a601d77c12e2d7be5b2381c2d19af667fa8) Thanks [@SkySails](https://github.com/SkySails)! - Moved the Leaflet integration to a separate package.

  You can now find the `NavigraphTileLayer` in `@navigraph/leaflet`!

## 1.4.0

### Minor Changes

- [#69](https://github.com/Navigraph/navigraph-js-sdk/pull/69) [`c4ee897`](https://github.com/Navigraph/navigraph-js-sdk/commit/c4ee897b0476d0435b45366940fc7381c568109e) Thanks [@SkySails](https://github.com/SkySails)! - Added `NavigraphTileLayer`, a Leaflet `TileLayer` that implements Navigraph enroute tiles.
  The aim with this extension is to help developers by making the following features available:

  - Switching of source between VFR, IFR and world map
  - Changing of the theme between day and night
  - Automatic handling of credential expiry, with useful hints in the log when something does not look quite right.

### Patch Changes

- Updated dependencies [[`2c364c2`](https://github.com/Navigraph/navigraph-js-sdk/commit/2c364c276047326ba3fbdd3f395a4e47a040fe16), [`693d01f`](https://github.com/Navigraph/navigraph-js-sdk/commit/693d01ff0fe04fc53bdb83865b5be5b3d2f8d035)]:
  - @navigraph/auth@2.4.1

## 1.3.0

### Minor Changes

- [#64](https://github.com/Navigraph/navigraph-js-sdk/pull/64) [`9c2d597`](https://github.com/Navigraph/navigraph-js-sdk/commit/9c2d597a710d86e662bcd9da8190871d5722096c) Thanks [@SkySails](https://github.com/SkySails)! - Added airport information endpoint access. This endpoint can be used to fetch details such as available fuel, types of repair services etc..

## 1.2.26

### Patch Changes

- Updated dependencies [[`c49ebbc`](https://github.com/Navigraph/navigraph-js-sdk/commit/c49ebbcffaaac1a7102659eada0c8dde998386ec)]:
  - @navigraph/auth@2.4.0

## 1.2.25

### Patch Changes

- [`dcf8ace`](https://github.com/Navigraph/navigraph-js-sdk/commit/dcf8ace68c72403b30d94fe6bab67feab5291ddd) Thanks [@SkySails](https://github.com/SkySails)! - Added missing exports of chart type-code enums.

## 1.2.24

### Patch Changes

- Updated dependencies [[`16e00c0`](https://github.com/Navigraph/navigraph-js-sdk/commit/16e00c0516b599999c257ecfb1fc79ea6ea69e3e)]:
  - @navigraph/app@1.3.3
  - @navigraph/auth@2.3.2

## 1.2.23

### Patch Changes

- [#58](https://github.com/Navigraph/navigraph-js-sdk/pull/58) [`f8e9c67`](https://github.com/Navigraph/navigraph-js-sdk/commit/f8e9c671ceabaa83729e47fc9402a9fc3f1a3e0f) Thanks [@SkySails](https://github.com/SkySails)! - Added exhaustive types to the `Chart.type_code` property using enums that contain all possible types in the source.

## 1.2.22

### Patch Changes

- [#55](https://github.com/Navigraph/navigraph-js-sdk/pull/55) [`3927692`](https://github.com/Navigraph/navigraph-js-sdk/commit/39276928c56a25f3f2f8a0a2776e75da785345e6) Thanks [@SkySails](https://github.com/SkySails)! - Updated the `Chart` types & associated documentation to better aid developers. Also added information about the newly introduced additional bounding boxes: `profile`, `minimums` and `header`.

- Updated dependencies [[`eb64ddd`](https://github.com/Navigraph/navigraph-js-sdk/commit/eb64dddaac618d47bdbb88dd41b17db5ff67a221)]:
  - @navigraph/auth@2.3.1

## 1.2.21

### Patch Changes

- Updated dependencies [[`268420c`](https://github.com/Navigraph/navigraph-js-sdk/commit/268420c2ee34f0e9698d659229127343f25f2f8e), [`8e43986`](https://github.com/Navigraph/navigraph-js-sdk/commit/8e43986980a6006d2d967004f3a23c5f13a9c155)]:
  - @navigraph/auth@2.3.0

## 1.2.20

### Patch Changes

- [#50](https://github.com/Navigraph/navigraph-js-sdk/pull/50) [`fc9d30f`](https://github.com/Navigraph/navigraph-js-sdk/commit/fc9d30fdf3566874878ae181ebe22309dc20b5fe) Thanks [@SkySails](https://github.com/SkySails)! - Added `ChartCategory` type for improved type-safety when dealing with chart objects.

- Updated dependencies [[`647450d`](https://github.com/Navigraph/navigraph-js-sdk/commit/647450d34d98664c2f760e83fa11bbc8c7908191)]:
  - @navigraph/auth@2.2.5

## 1.2.19

### Patch Changes

- Updated dependencies [[`2644065`](https://github.com/Navigraph/navigraph-js-sdk/commit/2644065fc6a605467121f52e095f94c8a8b7450f)]:
  - @navigraph/auth@2.2.4

## 1.2.18

### Patch Changes

- Updated dependencies [[`1a39b1b`](https://github.com/Navigraph/navigraph-js-sdk/commit/1a39b1b2592cfc34742cfc80f4f7785328d30427)]:
  - @navigraph/auth@2.2.3
  - @navigraph/app@1.3.2

## 1.2.17

### Patch Changes

- [#42](https://github.com/Navigraph/navigraph-js-sdk/pull/42) [`ae78223`](https://github.com/Navigraph/navigraph-js-sdk/commit/ae782238a109ba370711dcb66d896a7636fc7e3a) Thanks [@SkySails](https://github.com/SkySails)! - Included dependencies like `axios` and `@navigraph/pkce` in the final bundle. Also bumped the target to ES6, which should fix some warnings when using Rollup related to usage of global `this`.

- Updated dependencies [[`ae78223`](https://github.com/Navigraph/navigraph-js-sdk/commit/ae782238a109ba370711dcb66d896a7636fc7e3a)]:
  - @navigraph/app@1.3.1
  - @navigraph/auth@2.2.2

## 1.2.16

### Patch Changes

- Updated dependencies [[`ec55b55`](https://github.com/Navigraph/navigraph-js-sdk/commit/ec55b5505aab9baa20c2f95ea63ff0ec1a330e55)]:
  - @navigraph/auth@2.2.1

## 1.2.15

### Patch Changes

- Updated dependencies [[`ac9d6e1`](https://github.com/Navigraph/navigraph-js-sdk/commit/ac9d6e1d241d43b732bef8677993bdc55bc27ac3)]:
  - @navigraph/auth@2.2.0

## 1.2.14

### Patch Changes

- Updated dependencies [[`89f2d85`](https://github.com/Navigraph/navigraph-js-sdk/commit/89f2d85f0f6850ea06cfae39cc0c8061ab0bf988), [`7d7d597`](https://github.com/Navigraph/navigraph-js-sdk/commit/7d7d597b502e7e8b0b6a92980f2c3d0b39472cbc)]:
  - @navigraph/app@1.3.0
  - @navigraph/auth@2.1.0

## 1.2.13

### Patch Changes

- Updated dependencies [[`cd6873f`](https://github.com/Navigraph/navigraph-js-sdk/commit/cd6873f6faca9de47aca491e62870cba038a184f)]:
  - @navigraph/auth@2.0.12

## 1.2.12

### Patch Changes

- Updated dependencies [[`41be723`](https://github.com/Navigraph/navigraph-js-sdk/commit/41be723002f665a7caa888208269f3842cbb6a66), [`219fc1a`](https://github.com/Navigraph/navigraph-js-sdk/commit/219fc1aa2c9b09a4a093568a07a0e21fcc2a2bba)]:
  - @navigraph/auth@2.0.11

## 1.2.11

### Patch Changes

- [`f26d62e`](https://github.com/Navigraph/navigraph-js-sdk/commit/f26d62e6401cf27b8557734ecb81b67937738bcc) Thanks [@SkySails](https://github.com/SkySails)! - Add explicit returntypes for `getAuth()` and `getChartsAPI()`

- Updated dependencies [[`55373fe`](https://github.com/Navigraph/navigraph-js-sdk/commit/55373fe6caf031f2cd6ff39d638a4c801dc017b4), [`614b35c`](https://github.com/Navigraph/navigraph-js-sdk/commit/614b35c9c77293133180880ca0e7d5bc446e3040), [`54b30ae`](https://github.com/Navigraph/navigraph-js-sdk/commit/54b30ae2fe43958ce25b6b61f0d34c9983b6ca0d), [`f26d62e`](https://github.com/Navigraph/navigraph-js-sdk/commit/f26d62e6401cf27b8557734ecb81b67937738bcc)]:
  - @navigraph/auth@2.0.10
  - @navigraph/app@1.2.8

## 1.2.10

### Patch Changes

- Updated dependencies [[`7c6e0d3`](https://github.com/Navigraph/navigraph-js-sdk/commit/7c6e0d3c35986a96c669fe22117cbef75723d7c9)]:
  - @navigraph/auth@2.0.9

## 1.2.9

### Patch Changes

- [`c68b5f6`](https://github.com/Navigraph/navigraph-js-sdk/commit/c68b5f609d1026a31019c50a1edca81cca711af9) Thanks [@SkySails](https://github.com/SkySails)! - Patch bump to catch up with NPM version

- Updated dependencies [[`c68b5f6`](https://github.com/Navigraph/navigraph-js-sdk/commit/c68b5f609d1026a31019c50a1edca81cca711af9)]:
  - @navigraph/app@1.2.7
  - @navigraph/auth@2.0.8

## 1.2.8

### Patch Changes

- Updated dependencies [[`4e36132`](https://github.com/Navigraph/navigraph-js-sdk/commit/4e36132bdd1a0aae1ef428ff32553c7b656ae85d), [`e017bc4`](https://github.com/Navigraph/navigraph-js-sdk/commit/e017bc45c64fe80e65ed7606747eb6f3d8ca68b1), [`db63744`](https://github.com/Navigraph/navigraph-js-sdk/commit/db637448dfcbefc0ad8d11fc76a18ed2bff8f6b0)]:
  - @navigraph/app@1.2.6
  - @navigraph/auth@2.0.7

## 1.2.7

### Patch Changes

- [#19](https://github.com/Navigraph/navigraph-js-sdk/pull/19) [`58fb8fd`](https://github.com/Navigraph/navigraph-js-sdk/commit/58fb8fd8a9da0301a7a67a787f69c83b9ce171a6) Thanks [@kristianjohansson](https://github.com/kristianjohansson)! - Made domain configurable

- Updated dependencies [[`58fb8fd`](https://github.com/Navigraph/navigraph-js-sdk/commit/58fb8fd8a9da0301a7a67a787f69c83b9ce171a6)]:
  - @navigraph/app@1.2.5
  - @navigraph/auth@2.0.6

## 1.2.6

### Patch Changes

- Updated dependencies [[`c3a8058`](https://github.com/Navigraph/navigraph-js-sdk/commit/c3a8058a846c6a79cd9a9af8a01f6598fccf4d06)]:
  - @navigraph/auth@2.0.5

## 1.2.5

### Patch Changes

- [#15](https://github.com/Navigraph/navigraph-js-sdk/pull/15) [`76e7c7d`](https://github.com/Navigraph/navigraph-js-sdk/commit/76e7c7d91a6b19d6040dc5b87561e8ecde6a6af2) Thanks [@SkySails](https://github.com/SkySails)! - Improved package documentation & information to an acceptable level.

- Updated dependencies [[`76e7c7d`](https://github.com/Navigraph/navigraph-js-sdk/commit/76e7c7d91a6b19d6040dc5b87561e8ecde6a6af2)]:
  - @navigraph/app@1.2.4
  - @navigraph/auth@2.0.4

## 1.2.4

### Patch Changes

- Updated dependencies [[`cbd7bc5`](https://github.com/Navigraph/sdk/commit/cbd7bc5b6df32301fcaa217e221d158b7b268b8d)]:
  - @navigraph/auth@2.0.3

## 1.2.3

### Patch Changes

- [`0543944`](https://github.com/Navigraph/sdk/commit/0543944fce3a7a1b7824763336e8072d8f3bb17d) Thanks [@SkySails](https://github.com/SkySails)! - Improve documentation

* [`ac47f7d`](https://github.com/Navigraph/sdk/commit/ac47f7dcdf8fac9365466d1f368fc362bd040ae3) Thanks [@SkySails](https://github.com/SkySails)! - Made `theme` option for `getChartImage` optional in type

* Updated dependencies [[`0543944`](https://github.com/Navigraph/sdk/commit/0543944fce3a7a1b7824763336e8072d8f3bb17d), [`4d4ef82`](https://github.com/Navigraph/sdk/commit/4d4ef82f9e285877fbbd57715b9c4be62bb88c71)]:
  - @navigraph/app@1.2.3
  - @navigraph/auth@2.0.2

## 1.2.2

### Patch Changes

- [`0325973`](https://github.com/Navigraph/sdk/commit/03259735f5627a6a405d527dd3ed80f0a42311b1) Thanks [@SkySails](https://github.com/SkySails)! - Revamp exports to retain old interface

- Updated dependencies [[`0325973`](https://github.com/Navigraph/sdk/commit/03259735f5627a6a405d527dd3ed80f0a42311b1)]:
  - @navigraph/app@1.2.2
  - @navigraph/auth@2.0.1

## 1.2.1

### Patch Changes

- Updated dependencies [[`3a72aac`](https://github.com/Navigraph/sdk/commit/3a72aacd984c8e0ca83e7209e088d57941c72f2e), [`e2a5b81`](https://github.com/Navigraph/sdk/commit/e2a5b819e061ff566ef05fef35a9ef994a035399)]:
  - @navigraph/app@1.2.1
  - @navigraph/auth@2.0.0
