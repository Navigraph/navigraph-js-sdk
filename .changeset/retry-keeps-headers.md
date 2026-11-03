---
"@navigraph/auth": patch
---

When `navigraphRequest` retries a request after refreshing the access token, the retry now keeps the request's own headers. It used to send only the new `Authorization` header.
