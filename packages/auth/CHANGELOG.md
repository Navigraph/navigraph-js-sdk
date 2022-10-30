# @navigraph/auth

## 2.0.9

### Patch Changes

- [#28](https://github.com/Navigraph/navigraph-js-sdk/pull/28) [`d86fc3d`](https://github.com/Navigraph/navigraph-js-sdk/commit/d86fc3d561eb1359b4e67543fb815b3e51fe879d) Thanks [@SkySails](https://github.com/SkySails)! - Reduce amount of `onAuthStateChanged` events sent during init process, making it easier to track when the module is properly initialized.

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
