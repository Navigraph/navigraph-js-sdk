---
"@navigraph/app": patch
"@navigraph/auth": patch
"@navigraph/charts": patch
---

Handle failed attempts at restoring a previous session. This used to throw an error, but now just warns the implementor of the fact that a failed attempt was made.
