---
"@navigraph/auth": patch
---

Improved the timing of the first callback from `onAuthStageChanged` after initial mount. The callback will no longer fire until it has made an attempt to restore a persisted session.
