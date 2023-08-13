---
"@navigraph/auth": patch
---

Fixed token expiry check. Previously, a token would be considered expired 3 minutes **after** it expired, but the intention was to treat it as expired 3 minutes **before** its real expiry.
