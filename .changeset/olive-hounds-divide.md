---
"@navigraph/auth": minor
---

Added a `verify` parameter to the `getUser` function that optionally forces a re-verification of the user's credentials. Can be useful when syncing multiple instances of the SDK running in different contexts with shared credentials.
