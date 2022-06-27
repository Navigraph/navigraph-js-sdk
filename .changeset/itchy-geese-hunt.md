---
"@navigraph/auth": major
---

Remove built-in QR generation methods in favor of custom platform-specific solutions.

This was done because most implementors want to pick their own library and also because the one that was used was not really browser-compatible out of the box.
