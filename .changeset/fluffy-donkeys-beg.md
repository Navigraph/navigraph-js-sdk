---
"@navigraph/weather": patch
---

Removed package scripts from published NPM package. Most importantly, this prevevents the `postinstall` script (which is only intended to be used during development) from being included.
