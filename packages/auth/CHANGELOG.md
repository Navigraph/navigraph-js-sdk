# @navigraph/auth

## 2.3.2

### Patch Changes

- [`16e00c0`](https://github.com/Navigraph/navigraph-js-sdk/commit/16e00c0516b599999c257ecfb1fc79ea6ea69e3e) Thanks [@SkySails](https://github.com/SkySails)! - Synchronize packages after internal reorganization.

- Updated dependencies [[`16e00c0`](https://github.com/Navigraph/navigraph-js-sdk/commit/16e00c0516b599999c257ecfb1fc79ea6ea69e3e)]:
  - @navigraph/app@1.3.3

## 2.3.1

### Patch Changes

- [#54](https://github.com/Navigraph/navigraph-js-sdk/pull/54) [`eb64ddd`](https://github.com/Navigraph/navigraph-js-sdk/commit/eb64dddaac618d47bdbb88dd41b17db5ff67a221) Thanks [@SkySails](https://github.com/SkySails)! - Improved handling of signouts on failed initialization or token refresh attempts.

## 2.3.0

### Minor Changes

- [#51](https://github.com/Navigraph/navigraph-js-sdk/pull/51) [`268420c`](https://github.com/Navigraph/navigraph-js-sdk/commit/268420c2ee34f0e9698d659229127343f25f2f8e) Thanks [@SkySails](https://github.com/SkySails)! - Added locking behavior for SDK initialization process. This should prevent multiple instances of the SDK from initializing at the same time in a context where the tokens are shared, such as within an MSFS project with multiple entrypoints.

- [#52](https://github.com/Navigraph/navigraph-js-sdk/pull/52) [`8e43986`](https://github.com/Navigraph/navigraph-js-sdk/commit/8e43986980a6006d2d967004f3a23c5f13a9c155) Thanks [@SkySails](https://github.com/SkySails)! - Added a `verify` parameter to the `getUser` function that optionally forces a re-verification of the user's credentials. Can be useful when syncing multiple instances of the SDK running in different contexts with shared credentials.

## 2.2.5

### Patch Changes

- [#48](https://github.com/Navigraph/navigraph-js-sdk/pull/48) [`647450d`](https://github.com/Navigraph/navigraph-js-sdk/commit/647450d34d98664c2f760e83fa11bbc8c7908191) Thanks [@SkySails](https://github.com/SkySails)! - Marked `cancelToken` as optional when using `signInWithDeviceFlow`. Also improved types of the `CancelToken` itself.

## 2.2.4

### Patch Changes

- [#46](https://github.com/Navigraph/navigraph-js-sdk/pull/46) [`2644065`](https://github.com/Navigraph/navigraph-js-sdk/commit/2644065fc6a605467121f52e095f94c8a8b7450f) Thanks [@SkySails](https://github.com/SkySails)! - Refactored use of `AbortController` to instead use the more backwards-compatible `CancelToken` from `axios`.

## 2.2.3

### Patch Changes

- [#44](https://github.com/Navigraph/navigraph-js-sdk/pull/44) [`1a39b1b`](https://github.com/Navigraph/navigraph-js-sdk/commit/1a39b1b2592cfc34742cfc80f4f7785328d30427) Thanks [@SkySails](https://github.com/SkySails)! - Introduced optional signal parameter that can be used to abort authentication attempts.

- Updated dependencies [[`1a39b1b`](https://github.com/Navigraph/navigraph-js-sdk/commit/1a39b1b2592cfc34742cfc80f4f7785328d30427)]:
  - @navigraph/app@1.3.2

## 2.2.2

### Patch Changes

- [#42](https://github.com/Navigraph/navigraph-js-sdk/pull/42) [`ae78223`](https://github.com/Navigraph/navigraph-js-sdk/commit/ae782238a109ba370711dcb66d896a7636fc7e3a) Thanks [@SkySails](https://github.com/SkySails)! - Included dependencies like `axios` and `@navigraph/pkce` in the final bundle. Also bumped the target to ES6, which should fix some warnings when using Rollup related to usage of global `this`.

- Updated dependencies [[`ae78223`](https://github.com/Navigraph/navigraph-js-sdk/commit/ae782238a109ba370711dcb66d896a7636fc7e3a)]:
  - @navigraph/app@1.3.1

## 2.2.1

### Patch Changes

- [`ec55b55`](https://github.com/Navigraph/navigraph-js-sdk/commit/ec55b5505aab9baa20c2f95ea63ff0ec1a330e55) Thanks [@SkySails](https://github.com/SkySails)! - Fixed a typo, `scopes` should have been `scope`

## 2.2.0

### Minor Changes

- [`ac9d6e1`](https://github.com/Navigraph/navigraph-js-sdk/commit/ac9d6e1d241d43b732bef8677993bdc55bc27ac3) Thanks [@SkySails](https://github.com/SkySails)! - Fix issue where wrong endpoint would be called with `withCredentials` set to true, causing CORS issues.

## 2.1.0

### Minor Changes

- [`7d7d597`](https://github.com/Navigraph/navigraph-js-sdk/commit/7d7d597b502e7e8b0b6a92980f2c3d0b39472cbc) Thanks [@SkySails](https://github.com/SkySails)! - Add `tiles` scope for use by authorized clients. With this scope included, token requests will have to be configured to store received cookies for cross-origin requests, which is currently handled automatically.

### Patch Changes

- Updated dependencies [[`89f2d85`](https://github.com/Navigraph/navigraph-js-sdk/commit/89f2d85f0f6850ea06cfae39cc0c8061ab0bf988), [`7d7d597`](https://github.com/Navigraph/navigraph-js-sdk/commit/7d7d597b502e7e8b0b6a92980f2c3d0b39472cbc)]:
  - @navigraph/app@1.3.0

## 2.0.12

### Patch Changes

- [#36](https://github.com/Navigraph/navigraph-js-sdk/pull/36) [`cd6873f`](https://github.com/Navigraph/navigraph-js-sdk/commit/cd6873f6faca9de47aca491e62870cba038a184f) Thanks [@SkySails](https://github.com/SkySails)! - Support asynchronous CustomStorage implementations

## 2.0.11

### Patch Changes

- [`41be723`](https://github.com/Navigraph/navigraph-js-sdk/commit/41be723002f665a7caa888208269f3842cbb6a66) Thanks [@SkySails](https://github.com/SkySails)! - Improve developer-facing documentation & types

- [`219fc1a`](https://github.com/Navigraph/navigraph-js-sdk/commit/219fc1aa2c9b09a4a093568a07a0e21fcc2a2bba) Thanks [@SkySails](https://github.com/SkySails)! - Prevent attempt to load persisted credentials if an attempt has already been made

- [#36](https://github.com/Navigraph/navigraph-js-sdk/pull/36) [`cd6873f`](https://github.com/Navigraph/navigraph-js-sdk/commit/cd6873f6faca9de47aca491e62870cba038a184f) Thanks [@SkySails](https://github.com/SkySails)! - Support asynchronous CustomStorage implementations

## 2.0.10

### Patch Changes

- [#34](https://github.com/Navigraph/navigraph-js-sdk/pull/34) [`55373fe`](https://github.com/Navigraph/navigraph-js-sdk/commit/55373fe6caf031f2cd6ff39d638a4c801dc017b4) Thanks [@kristianjohansson](https://github.com/kristianjohansson)! - Removed max attempts from the device flow login to use the default time set by the identity server

* [`f26d62e`](https://github.com/Navigraph/navigraph-js-sdk/commit/f26d62e6401cf27b8557734ecb81b67937738bcc) Thanks [@SkySails](https://github.com/SkySails)! - Add explicit returntypes for `getAuth()` and `getChartsAPI()`

* Updated dependencies [[`614b35c`](https://github.com/Navigraph/navigraph-js-sdk/commit/614b35c9c77293133180880ca0e7d5bc446e3040), [`54b30ae`](https://github.com/Navigraph/navigraph-js-sdk/commit/54b30ae2fe43958ce25b6b61f0d34c9983b6ca0d)]:
  - @navigraph/app@1.2.8

## 2.0.9

### Patch Changes

- [`7c6e0d3`](https://github.com/Navigraph/navigraph-js-sdk/commit/7c6e0d3c35986a96c669fe22117cbef75723d7c9) Thanks [@SkySails](https://github.com/SkySails)! - Reduce amount of `onAuthStateChanged` events sent during init process, making it easier to track when the module is properly initialized.

  Previously, a set up `onAuthStateChanged` event listener would receive `null` before the modules had fully initialized. With this new behavior, when the module has not yet declared itself ready, the initial state update will be _delayed_ until such is the case.

## 2.0.8

### Patch Changes

- [`c68b5f6`](https://github.com/Navigraph/navigraph-js-sdk/commit/c68b5f609d1026a31019c50a1edca81cca711af9) Thanks [@SkySails](https://github.com/SkySails)! - Patch bump to catch up with NPM version

- Updated dependencies [[`c68b5f6`](https://github.com/Navigraph/navigraph-js-sdk/commit/c68b5f609d1026a31019c50a1edca81cca711af9)]:
  - @navigraph/app@1.2.7

## 2.0.7

### Patch Changes

- [#21](https://github.com/Navigraph/navigraph-js-sdk/pull/21) [`e017bc4`](https://github.com/Navigraph/navigraph-js-sdk/commit/e017bc45c64fe80e65ed7606747eb6f3d8ca68b1) Thanks [@SkySails](https://github.com/SkySails)! - Handle failed attempts at restoring a previous session. This used to throw an error, but now just warns the implementor of the fact that a failed attempt was made.

* [#24](https://github.com/Navigraph/navigraph-js-sdk/pull/24) [`db63744`](https://github.com/Navigraph/navigraph-js-sdk/commit/db637448dfcbefc0ad8d11fc76a18ed2bff8f6b0) Thanks [@SkySails](https://github.com/SkySails)! - Improve error handling by throwing more unique errors

* Updated dependencies [[`4e36132`](https://github.com/Navigraph/navigraph-js-sdk/commit/4e36132bdd1a0aae1ef428ff32553c7b656ae85d), [`db63744`](https://github.com/Navigraph/navigraph-js-sdk/commit/db637448dfcbefc0ad8d11fc76a18ed2bff8f6b0)]:
  - @navigraph/app@1.2.6

## 2.0.6

### Patch Changes

- [#19](https://github.com/Navigraph/navigraph-js-sdk/pull/19) [`58fb8fd`](https://github.com/Navigraph/navigraph-js-sdk/commit/58fb8fd8a9da0301a7a67a787f69c83b9ce171a6) Thanks [@kristianjohansson](https://github.com/kristianjohansson)! - Made domain configurable

- Updated dependencies [[`58fb8fd`](https://github.com/Navigraph/navigraph-js-sdk/commit/58fb8fd8a9da0301a7a67a787f69c83b9ce171a6)]:
  - @navigraph/app@1.2.5

## 2.0.5

### Patch Changes

- [#17](https://github.com/Navigraph/navigraph-js-sdk/pull/17) [`c3a8058`](https://github.com/Navigraph/navigraph-js-sdk/commit/c3a8058a846c6a79cd9a9af8a01f6598fccf4d06) Thanks [@SkySails](https://github.com/SkySails)! - Call token revocation endpoint on signout instead of calling endsession.

## 2.0.4

### Patch Changes

- [#15](https://github.com/Navigraph/navigraph-js-sdk/pull/15) [`76e7c7d`](https://github.com/Navigraph/navigraph-js-sdk/commit/76e7c7d91a6b19d6040dc5b87561e8ecde6a6af2) Thanks [@SkySails](https://github.com/SkySails)! - Improved package documentation & information to an acceptable level.

- Updated dependencies [[`76e7c7d`](https://github.com/Navigraph/navigraph-js-sdk/commit/76e7c7d91a6b19d6040dc5b87561e8ecde6a6af2)]:
  - @navigraph/app@1.2.4

## 2.0.3

### Patch Changes

- [#12](https://github.com/Navigraph/sdk/pull/12) [`cbd7bc5`](https://github.com/Navigraph/sdk/commit/cbd7bc5b6df32301fcaa217e221d158b7b268b8d) Thanks [@SkySails](https://github.com/SkySails)! - Correctly handle signout by resetting tokens, broadcasting the user change to authentication listeners and ending the active session in identity.

## 2.0.2

### Patch Changes

- [`0543944`](https://github.com/Navigraph/sdk/commit/0543944fce3a7a1b7824763336e8072d8f3bb17d) Thanks [@SkySails](https://github.com/SkySails)! - Improve documentation

* [`4d4ef82`](https://github.com/Navigraph/sdk/commit/4d4ef82f9e285877fbbd57715b9c4be62bb88c71) Thanks [@SkySails](https://github.com/SkySails)! - Improved the timing of the first callback from `onAuthStageChanged` after initial mount. The callback will no longer fire until it has made an attempt to restore a persisted session.

* Updated dependencies [[`0543944`](https://github.com/Navigraph/sdk/commit/0543944fce3a7a1b7824763336e8072d8f3bb17d)]:
  - @navigraph/app@1.2.3

## 2.0.1

### Patch Changes

- [`0325973`](https://github.com/Navigraph/sdk/commit/03259735f5627a6a405d527dd3ed80f0a42311b1) Thanks [@SkySails](https://github.com/SkySails)! - Revamp exports to retain old interface

- Updated dependencies [[`0325973`](https://github.com/Navigraph/sdk/commit/03259735f5627a6a405d527dd3ed80f0a42311b1)]:
  - @navigraph/app@1.2.2

## 2.0.0

### Major Changes

- [`e2a5b81`](https://github.com/Navigraph/sdk/commit/e2a5b819e061ff566ef05fef35a9ef994a035399) Thanks [@SkySails](https://github.com/SkySails)! - Remove built-in QR generation methods in favor of custom platform-specific solutions.

  This was done because most implementors want to pick their own library and also because the one that was used was not really browser-compatible out of the box.

### Patch Changes

- Updated dependencies [[`3a72aac`](https://github.com/Navigraph/sdk/commit/3a72aacd984c8e0ca83e7209e088d57941c72f2e)]:
  - @navigraph/app@1.2.1
