---
"@navigraph/weather": patch
---

Fixes `npm i` failing with `patch-package: not found`. The tarball had no scripts in it, but the registry metadata still listed a `postinstall` hook. `npm` reads the metadata rather than the tarball, so it tried to run a tool that was never a dependency.