// @vitest-environment jsdom
import { createHash } from "node:crypto"
import axios, { AxiosResponse } from "axios"
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest"
import type { CustomStorage } from "../internals/storage"
import type { NavigraphAuth } from "../lib/getAuth"
import type { DeviceFlowCallback } from "./device-flow"

const DEVICE_AUTHORIZATION_URL = "https://identity.api.navigraph.com/connect/deviceauthorization"
const TOKEN_URL = "https://identity.api.navigraph.com/connect/token"

const testUser = {
  preferred_username: "test-user",
  scope: ["openid", "userinfo", "offline_access", "charts"],
  sub: "test-sub",
  subscriptions: ["charts"],
}

const deviceAuthorization = {
  device_code: "test-device-code",
  user_code: "TESTCODE",
  verification_uri: "https://navigraph.com/code",
  verification_uri_complete: "https://navigraph.com/code?user_code=TESTCODE",
  expires_in: 1800,
  interval: 5,
}

const tokens = {
  access_token: createAccessToken(testUser),
  refresh_token: "test-refresh-token",
  expires_in: 3600,
  token_type: "Bearer",
}

function createAccessToken(claims: object) {
  const encode = (value: object) => btoa(JSON.stringify(value))
  return [encode({ alg: "RS256" }), encode({ client_id: "test-client", ...claims }), "signature"].join(".")
}

const ok = (data: unknown) => Promise.resolve({ status: 200, data } as AxiosResponse)

const oauthError = (error: string) => Promise.reject({ isAxiosError: true, response: { status: 400, data: { error } } })

/** Fakes the identity server. Token requests get `token` responses in order, and the last one repeats. */
function mockIdentityServer({
  deviceAuthorizationResponse = () => ok(deviceAuthorization),
  token = [() => ok(tokens)],
}: {
  deviceAuthorizationResponse?: () => Promise<AxiosResponse>
  token?: (() => Promise<AxiosResponse>)[]
} = {}) {
  let tokenRequests = 0

  return vi.spyOn(axios, "post").mockImplementation(url => {
    if (url === DEVICE_AUTHORIZATION_URL) return deviceAuthorizationResponse()
    if (url === TOKEN_URL) return token[Math.min(tokenRequests++, token.length - 1)]()
    return Promise.reject(new Error(`Unexpected request to ${url}`))
  })
}

/** The form fields sent in each request to `url`. */
function requestBodies(request: ReturnType<typeof mockIdentityServer>, url: string) {
  return request.mock.calls
    .filter(([requestUrl]) => requestUrl === url)
    .map(([, body]) => Object.fromEntries(body as URLSearchParams))
}

function createMemoryStorage(): CustomStorage {
  const items = new Map<string, string>()

  return {
    getItem: key => items.get(key) ?? null,
    setItem: (key, value) => void items.set(key, value),
  }
}

/** Loads a fresh copy of the SDK, so that no sign-in state carries over between tests. */
async function createAuth() {
  vi.resetModules()
  const app = await import("@navigraph/app")
  const { default: getAuth } = await import("../lib/getAuth")

  app.initializeApp({ clientId: "test-client", clientSecret: "test-secret", scopes: [app.Scope.CHARTS] })

  return { auth: getAuth({ storage: createMemoryStorage() }), errors: app }
}

/** Starts a device flow sign-in and runs the polling timers until it settles. */
async function signIn(auth: NavigraphAuth, callback: DeviceFlowCallback = () => undefined) {
  const result = auth.signInWithDeviceFlow(callback)
  // The caller awaits the result. This stops a rejection from being reported as unhandled while the timers run.
  result.catch(() => undefined)

  await vi.runAllTimersAsync()

  return result
}

describe("signInWithDeviceFlow", () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date("2026-01-01T12:00:00Z"))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  test("gives the callback the code and URLs the user needs to approve the device", async () => {
    mockIdentityServer()
    const { auth } = await createAuth()
    const callback = vi.fn()

    await signIn(auth, callback)

    expect(callback).toHaveBeenCalledWith({
      user_code: "TESTCODE",
      verification_uri: "https://navigraph.com/code",
      verification_uri_complete: "https://navigraph.com/code?user_code=TESTCODE",
    })
  })

  test("resolves with the user once the user has approved the device", async () => {
    mockIdentityServer({ token: [() => oauthError("authorization_pending"), () => ok(tokens)] })
    const { auth } = await createAuth()

    const user = await signIn(auth)

    expect(user).toEqual(testUser)
  })

  test("notifies auth state listeners of the signed-in user", async () => {
    mockIdentityServer()
    const { auth } = await createAuth()
    const listener = vi.fn()
    auth.onAuthStateChanged(listener)

    await signIn(auth)

    expect(listener).toHaveBeenLastCalledWith(testUser)
  })

  test("makes the signed-in user available from getUser", async () => {
    mockIdentityServer()
    const { auth } = await createAuth()

    await signIn(auth)

    expect(auth.getUser()).toEqual(testUser)
  })

  test("requests a device code with the client credentials and a PKCE challenge", async () => {
    const request = mockIdentityServer()
    const { auth } = await createAuth()

    await signIn(auth)

    expect(requestBodies(request, DEVICE_AUTHORIZATION_URL)).toEqual([
      {
        client_id: "test-client",
        client_secret: "test-secret",
        code_challenge: expect.any(String) as string,
        code_challenge_method: "S256",
      },
    ])
  })

  test("requests tokens with the device code and the app's scopes", async () => {
    const request = mockIdentityServer()
    const { auth } = await createAuth()

    await signIn(auth)

    expect(requestBodies(request, TOKEN_URL)).toEqual([
      {
        client_id: "test-client",
        client_secret: "test-secret",
        code_verifier: expect.any(String) as string,
        device_code: "test-device-code",
        grant_type: "urn:ietf:params:oauth:grant-type:device_code",
        scope: "userinfo openid offline_access charts",
      },
    ])
  })

  test("sends the code verifier that matches the PKCE challenge", async () => {
    const request = mockIdentityServer()
    const { auth } = await createAuth()

    await signIn(auth)

    const [{ code_challenge }] = requestBodies(request, DEVICE_AUTHORIZATION_URL)
    const [{ code_verifier }] = requestBodies(request, TOKEN_URL)
    expect(createHash("sha256").update(code_verifier).digest("base64url")).toBe(code_challenge)
  })

  test("waits the interval given by the server before each token request", async () => {
    const request = mockIdentityServer({ token: [() => oauthError("authorization_pending"), () => ok(tokens)] })
    const { auth } = await createAuth()
    const tokenRequests = () => requestBodies(request, TOKEN_URL).length

    void auth.signInWithDeviceFlow(() => undefined)

    await vi.advanceTimersByTimeAsync(4_999)
    expect(tokenRequests()).toBe(0)
    await vi.advanceTimersByTimeAsync(1)
    expect(tokenRequests()).toBe(1)
    await vi.advanceTimersByTimeAsync(4_999)
    expect(tokenRequests()).toBe(1)
    await vi.advanceTimersByTimeAsync(1)
    expect(tokenRequests()).toBe(2)
  })

  test("waits 5 seconds longer between token requests after the server asks it to slow down", async () => {
    const request = mockIdentityServer({ token: [() => oauthError("slow_down"), () => ok(tokens)] })
    const { auth } = await createAuth()
    const tokenRequests = () => requestBodies(request, TOKEN_URL).length

    void auth.signInWithDeviceFlow(() => undefined)

    await vi.advanceTimersByTimeAsync(5_000)
    expect(tokenRequests()).toBe(1)
    await vi.advanceTimersByTimeAsync(9_999)
    expect(tokenRequests()).toBe(1)
    await vi.advanceTimersByTimeAsync(1)
    expect(tokenRequests()).toBe(2)
  })

  test.for([
    { error: "access_denied", expected: "UserDeniedAccessError" },
    { error: "expired_token", expected: "DeviceFlowTokenExpiredError" },
    { error: "invalid_scope", expected: "InvalidScopeError" },
  ] as const)("rejects with $expected when the token request fails with $error", async ({ error, expected }) => {
    mockIdentityServer({ token: [() => oauthError(error)] })
    const { auth, errors } = await createAuth()

    await expect(signIn(auth)).rejects.toBeInstanceOf(errors[expected])
  })

  test("rejects with InvalidClientError when the client credentials are refused", async () => {
    mockIdentityServer({
      deviceAuthorizationResponse: () =>
        Promise.reject({ isAxiosError: true, response: { status: 401, data: { error: "invalid_client" } } }),
    })
    const { auth, errors } = await createAuth()

    await expect(signIn(auth)).rejects.toBeInstanceOf(errors.InvalidClientError)
  })
})
