---
"@navigraph/auth": minor
---

Changed the functionality of the user `verify` parameter that is passed to `getUser()`. The SDK will now always try to grab new credentials from the server when this option is passed, instead of first checking the validity of the access token.

This fixes an issue in `@navigraph/leaflet` where a complete refresh is _required_ in order to grab new credentials when tiles fail to load.
