# @navigraph/app

## 1.3.2

### Patch Changes

- [#44](https://github.com/Navigraph/navigraph-js-sdk/pull/44) [`1a39b1b`](https://github.com/Navigraph/navigraph-js-sdk/commit/1a39b1b2592cfc34742cfc80f4f7785328d30427) Thanks [@SkySails](https://github.com/SkySails)! - Introduced optional signal parameter that can be used to abort authentication attempts.

## 1.3.1

### Patch Changes

- [#42](https://github.com/Navigraph/navigraph-js-sdk/pull/42) [`ae78223`](https://github.com/Navigraph/navigraph-js-sdk/commit/ae782238a109ba370711dcb66d896a7636fc7e3a) Thanks [@SkySails](https://github.com/SkySails)! - Included dependencies like `axios` and `@navigraph/pkce` in the final bundle. Also bumped the target to ES6, which should fix some warnings when using Rollup related to usage of global `this`.

## 1.3.0

### Minor Changes

- [`7d7d597`](https://github.com/Navigraph/navigraph-js-sdk/commit/7d7d597b502e7e8b0b6a92980f2c3d0b39472cbc) Thanks [@SkySails](https://github.com/SkySails)! - Add `tiles` scope for use by authorized clients. With this scope included, token requests will have to be configured to store received cookies for cross-origin requests, which is currently handled automatically.

### Patch Changes

- [`89f2d85`](https://github.com/Navigraph/navigraph-js-sdk/commit/89f2d85f0f6850ea06cfae39cc0c8061ab0bf988) Thanks [@SkySails](https://github.com/SkySails)! - Added email scope

## 1.2.8

### Patch Changes

- [`614b35c`](https://github.com/Navigraph/navigraph-js-sdk/commit/614b35c9c77293133180880ca0e7d5bc446e3040) Thanks [@SkySails](https://github.com/SkySails)! - Add warning when an attempt is made to register a new app once one has already been registered

* [`54b30ae`](https://github.com/Navigraph/navigraph-js-sdk/commit/54b30ae2fe43958ce25b6b61f0d34c9983b6ca0d) Thanks [@SkySails](https://github.com/SkySails)! - Add `[Navigraph]` prefix to logs from this SDK

## 1.2.7

### Patch Changes

- [`c68b5f6`](https://github.com/Navigraph/navigraph-js-sdk/commit/c68b5f609d1026a31019c50a1edca81cca711af9) Thanks [@SkySails](https://github.com/SkySails)! - Patch bump to catch up with NPM version

## 1.2.6

### Patch Changes

- [`4e36132`](https://github.com/Navigraph/navigraph-js-sdk/commit/4e36132bdd1a0aae1ef428ff32553c7b656ae85d) Thanks [@SkySails](https://github.com/SkySails)! - Include `offline_access` scope by default and dedupe list of scopes.

* [#24](https://github.com/Navigraph/navigraph-js-sdk/pull/24) [`db63744`](https://github.com/Navigraph/navigraph-js-sdk/commit/db637448dfcbefc0ad8d11fc76a18ed2bff8f6b0) Thanks [@SkySails](https://github.com/SkySails)! - Improve error handling by throwing more unique errors

## 1.2.5

### Patch Changes

- [#19](https://github.com/Navigraph/navigraph-js-sdk/pull/19) [`58fb8fd`](https://github.com/Navigraph/navigraph-js-sdk/commit/58fb8fd8a9da0301a7a67a787f69c83b9ce171a6) Thanks [@kristianjohansson](https://github.com/kristianjohansson)! - Made domain configurable

## 1.2.4

### Patch Changes

- [#15](https://github.com/Navigraph/navigraph-js-sdk/pull/15) [`76e7c7d`](https://github.com/Navigraph/navigraph-js-sdk/commit/76e7c7d91a6b19d6040dc5b87561e8ecde6a6af2) Thanks [@SkySails](https://github.com/SkySails)! - Improved package documentation & information to an acceptable level.

## 1.2.3

### Patch Changes

- [`0543944`](https://github.com/Navigraph/sdk/commit/0543944fce3a7a1b7824763336e8072d8f3bb17d) Thanks [@SkySails](https://github.com/SkySails)! - Improve documentation

## 1.2.2

### Patch Changes

- [`0325973`](https://github.com/Navigraph/sdk/commit/03259735f5627a6a405d527dd3ed80f0a42311b1) Thanks [@SkySails](https://github.com/SkySails)! - Revamp exports to retain old interface

## 1.2.1

### Patch Changes

- [`3a72aac`](https://github.com/Navigraph/sdk/commit/3a72aacd984c8e0ca83e7209e088d57941c72f2e) Thanks [@SkySails](https://github.com/SkySails)! - Add default scopes (`openid` and `userinfo`) directly to avoid unnecessary boilerplate
