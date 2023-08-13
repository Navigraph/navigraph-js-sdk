---
"@navigraph/auth": patch
---

Added request buffers to all token requests, including user verification.
This ensures that the SDK does not send multiple identical token requests in parallel and instead returns one response for all requests, ultimately increasing both speed and reliability.
