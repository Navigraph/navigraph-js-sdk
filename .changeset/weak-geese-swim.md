---
"@navigraph/app": patch
"@navigraph/auth": patch
"@navigraph/charts": patch
"navigraph": patch
---

Included dependencies like `axios` and `@navigraph/pkce` in the final bundle. Also bumped the target to ES6, which should fix some warnings when using Rollup related to usage of global `this`.
