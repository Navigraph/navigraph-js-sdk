---
"@navigraph/auth": minor
---

Added locking behavior for SDK initialization process. This should prevent multiple instances of the SDK from initializing at the same time in a context where the tokens are shared, such as within an MSFS project with multiple entrypoints.
