# @navigraph/auth

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
