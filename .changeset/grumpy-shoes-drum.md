---
"@navigraph/auth": patch
---

Reduce amount of `onAuthStateChanged` events sent during init process, making it easier to track when the module is properly initialized.

Previously, a set up `onAuthStateChanged` event listener would receive `null` before the modules had fully initialized. With this new behavior, when the module has not yet declared itself ready, the initial state update will be _delayed_ until such is the case.
