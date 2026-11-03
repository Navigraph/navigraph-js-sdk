import axios, { AxiosAdapter, AxiosRequestConfig, AxiosResponse } from "axios"
import { describe, expect, test, vi } from "vitest"

function createAccessToken(claims: object) {
  const encode = (value: object) => btoa(JSON.stringify(value))
  return [encode({ alg: "RS256" }), encode({ client_id: "test-client", ...claims }), "signature"].join(".")
}

const oldToken = createAccessToken({ sub: "test-sub", scope: ["charts"], version: 1 })
const newToken = createAccessToken({ sub: "test-sub", scope: ["charts"], version: 2 })

/** Fakes an API that rejects `oldToken` with a 401 and records the headers of every request it gets. */
function createApi() {
  const requests: Record<string, unknown>[] = []

  const adapter: AxiosAdapter = (config: AxiosRequestConfig) => {
    const headers = { ...config.headers } as Record<string, unknown>
    requests.push(headers)

    if (headers.Authorization === `Bearer ${oldToken}`) {
      const response = { status: 401, statusText: "Unauthorized", data: null, headers: {}, config }
      return Promise.reject(Object.assign(new Error("Unauthorized"), { isAxiosError: true, config, response }))
    }

    return Promise.resolve({ status: 200, statusText: "OK", data: "ok", headers: {}, config } as AxiosResponse)
  }

  return { adapter, requests }
}

/** Loads a fresh copy of the SDK, signed in with `oldToken`. */
async function createSignedInRequest() {
  vi.resetModules()
  const app = await import("@navigraph/app")
  const { tokenStorage } = await import("../internals/storage")
  const { navigraphRequest } = await import("./navigraphRequest")

  app.initializeApp({ clientId: "test-client", clientSecret: "test-secret", scopes: [app.Scope.CHARTS] })

  const items = new Map([
    ["access_token", oldToken],
    ["refresh_token", "test-refresh-token"],
  ])
  tokenStorage.setStorage({
    getItem: key => items.get(key) ?? null,
    setItem: (key, value) => void items.set(key, value),
  })

  return navigraphRequest
}

describe("navigraphRequest", () => {
  test("keeps the caller's headers and adds the access token", async () => {
    const navigraphRequest = await createSignedInRequest()
    const api = createApi()
    vi.spyOn(axios, "post").mockResolvedValue({ data: { access_token: newToken, refresh_token: "new-refresh-token" } })

    await navigraphRequest.get("https://api.navigraph.com/test", {
      headers: { "X-Custom": "yes" },
      adapter: api.adapter,
    })

    expect(api.requests[0]).toMatchObject({ "X-Custom": "yes", Authorization: `Bearer ${oldToken}` })
  })

  test("keeps the caller's headers when it retries a request after refreshing the token", async () => {
    const navigraphRequest = await createSignedInRequest()
    const api = createApi()
    vi.spyOn(axios, "post").mockResolvedValue({ data: { access_token: newToken, refresh_token: "new-refresh-token" } })

    const response = await navigraphRequest.get("https://api.navigraph.com/test", {
      headers: { "X-Custom": "yes" },
      adapter: api.adapter,
    })

    expect(response.data).toBe("ok")
    expect(api.requests).toHaveLength(2)
    expect(api.requests[1]).toMatchObject({ "X-Custom": "yes", Authorization: `Bearer ${newToken}` })
  })
})
