---
"@navigraph/auth": patch
---

Correctly handle signout by resetting tokens, broadcasting the user change to authentication listeners and ending the active session in identity.
