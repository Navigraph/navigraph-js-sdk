import {
  DeviceFlowTokenExpiredError,
  initializeApp,
  InvalidClientError,
  InvalidScopeError,
  Scope,
  UserDeniedAccessError,
} from "@navigraph/app";
import axios from "axios";
import getAuth from "../lib/getAuth";

const postSpy = jest.spyOn(axios, "post");
const ogTimeout = setTimeout;
const timeoutSpy = jest.spyOn(global, "setTimeout");

const generateJWT = () => {
  const header = {
    alg: "RS256",
    kid: "bjb1ivAdT1Vv5BBLgMG58skmpak",
  };
  const encodedHeader = Buffer.from(JSON.stringify(header)).toString("base64");
  const encodedPayload = Buffer.from(
    JSON.stringify({
      amr: ["urn:ietf:params:oauth:grant-type:device_code"],
      aud: "https://identity.api.devigraph.com/resources",
      auth_time: Date.now() / 1000,
      client_id: "test_client",
      exp: Date.now() / 1000 + 3600,
      idp: "idsrv",
      iss: "https://identity.api.devigraph.com",
      nbf: Date.now() / 1000 - 10,
      preferred_username: "test_user",
      scope: ["charts", "fmsdata", "offline_access", "openid", "userinfo"],
      sub: "test-sub",
      subscriptions: ["fmsdata", "charts"],
    })
  ).toString("base64");
  const signature = "test_signature";
  return `${encodedHeader}.${encodedPayload}.${signature}`;
};

const deviceAuthOKResponse = {
  device_code: "test_device_code",
  verification_uri: "https://navigraph.com/code",
  verification_uri_complete: "https://identity.api.navigraph.com/code/default.aspx?user_code=TESTCODE",
  user_code: "TESTCODE",
  expires_in: 1800,
  interval: 5,
};

const tokenOKResponse = {
  access_token: generateJWT(),
  expires_in: 3600,
  token_type: "Bearer",
  refresh_token: "e658ab3ee17d5063ba4ca236450d3750",
};

describe("Device Flow Authentication", () => {
  let auth: ReturnType<typeof getAuth>;

  beforeAll(async () => {
    initializeApp({
      clientId: "test_client",
      clientSecret: "secret",
      scopes: [Scope.CHARTS],
    });

    timeoutSpy.mockImplementation((cb) => ogTimeout(cb, 0));

    // Simulate an expired token request
    localStorage.setItem("refresh_token", "invalid_refresh_token");
    postSpy.mockImplementation(() =>
      Promise.reject({
        isAxiosError: true,
        response: {
          status: 400,
          data: "bad request",
        },
      })
    );

    auth = getAuth();

    // Wait for the lock to be established and released
    await new Promise((resolve) => ogTimeout(resolve, 50));
  });

  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it("given a valid client config, returns a valid user object", async () => {
    postSpy.mockImplementation((url) => {
      if (url.includes("deviceauthorization")) {
        return Promise.resolve({
          status: 200,
          data: deviceAuthOKResponse,
        });
      } else if (url.includes("token")) {
        // Pending on first token call, then success
        const isPending = postSpy.mock.calls.length <= 2;
        return isPending
          ? Promise.reject({
              isAxiosError: true,
              response: {
                status: 400,
                data: { error: "authorization_pending" },
              },
            })
          : Promise.resolve({
              status: 200,
              data: tokenOKResponse,
            });
      }
      return Promise.reject();
    });

    const callback = jest.fn();
    const catchHandler = jest.fn();
    const userChangedCallback = jest.fn();

    // Mock setTimeout for the two next calls (first and second token request)
    timeoutSpy.mockImplementation((cb) => ogTimeout(cb, 10));

    auth.onAuthStateChanged(userChangedCallback);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const user = await auth.signInWithDeviceFlow(callback).catch(catchHandler);

    // Verify that all the expected requests have been made,
    // and that the params/data are correct
    expect(
      postSpy.mock.calls.map(([url, data]) => [url, Object.fromEntries((data as URLSearchParams).entries())])
    ).toEqual([
      [
        "https://identity.api.navigraph.com/connect/deviceauthorization",
        expect.objectContaining({
          client_id: "test_client",
          client_secret: "secret",
          code_challenge: expect.any(String) as string,
          code_challenge_method: "S256",
        }),
      ],
      [
        "https://identity.api.navigraph.com/connect/token",
        expect.objectContaining({
          client_id: "test_client",
          client_secret: "secret",
          code_verifier: expect.any(String) as string,
          device_code: "test_device_code",
          grant_type: "urn:ietf:params:oauth:grant-type:device_code",
          scope: "userinfo openid offline_access charts",
        }),
      ],
      [
        "https://identity.api.navigraph.com/connect/token",
        expect.objectContaining({
          client_id: "test_client",
          client_secret: "secret",
          code_verifier: expect.any(String) as string,
          device_code: "test_device_code",
          grant_type: "urn:ietf:params:oauth:grant-type:device_code",
          scope: "userinfo openid offline_access charts",
        }),
      ],
    ]);

    // Verify that callback received correct parameters
    expect(callback).toHaveBeenCalledWith({
      user_code: deviceAuthOKResponse.user_code,
      verification_uri: deviceAuthOKResponse.verification_uri,
      verification_uri_complete: deviceAuthOKResponse.verification_uri_complete,
    });

    // Verify that signInWithDeviceFlow did not throw
    expect(catchHandler).not.toHaveBeenCalled();

    // Verify that the token is correctly decoded
    expect(user).toEqual({
      preferred_username: "test_user",
      scope: ["charts", "fmsdata", "offline_access", "openid", "userinfo"],
      sub: "test-sub",
      subscriptions: ["fmsdata", "charts"],
    });

    // Verify that the `onAuthStateChanged` callback was called
    expect(userChangedCallback).toHaveBeenCalledWith(user);
  });
  it("given a valid client config, when a user denies the acess, should throw", async () => {
    postSpy.mockImplementation((url) => {
      if (url.includes("deviceauthorization")) {
        return Promise.resolve({
          status: 200,
          data: deviceAuthOKResponse,
        });
      }
      return Promise.reject({
        isAxiosError: true,
        response: {
          status: 400,
          data: { error: "access_denied" },
        },
      });
    });

    // Mock setTimeout for the two next calls (first and second token request)
    timeoutSpy.mockImplementation((cb) => ogTimeout(cb, 10));

    await expect(auth.signInWithDeviceFlow(() => "")).rejects.toThrowError(UserDeniedAccessError);
  });

  it("given a valid client config, when the device token has expired, should throw", async () => {
    postSpy.mockImplementation((url) => {
      if (url.includes("deviceauthorization")) {
        return Promise.resolve({
          status: 200,
          data: deviceAuthOKResponse,
        });
      }
      return Promise.reject({
        isAxiosError: true,
        response: {
          status: 400,
          data: { error: "expired_token" },
        },
      });
    });

    // Mock setTimeout for the two next calls (first and second token request)
    timeoutSpy.mockImplementation((cb) => ogTimeout(cb, 10));

    await expect(auth.signInWithDeviceFlow(() => "")).rejects.toThrowError(DeviceFlowTokenExpiredError);
  });

  it("given a client config containing unauthorized scope(s), should throw", async () => {
    postSpy.mockImplementation((url) => {
      if (url.includes("deviceauthorization")) {
        return Promise.resolve({
          status: 200,
          data: deviceAuthOKResponse,
        });
      }
      return Promise.reject({
        isAxiosError: true,
        response: {
          status: 400,
          data: { error: "invalid_scope" },
        },
      });
    });

    // Mock setTimeout for the two next calls (first and second token request)
    timeoutSpy.mockImplementation((cb) => ogTimeout(cb, 10));

    await expect(auth.signInWithDeviceFlow(() => "")).rejects.toThrowError(InvalidScopeError);
  });

  it("given an invalid client configuration, should throw", async () => {
    postSpy.mockImplementation(() =>
      Promise.reject({
        isAxiosError: true,
        response: {
          status: 400,
          data: { message: "invalid client" },
        },
      })
    );

    // Mock setTimeout for the two next calls (first and second token request)
    timeoutSpy.mockImplementation((cb) => ogTimeout(cb, 10));

    await expect(auth.signInWithDeviceFlow(() => "")).rejects.toThrowError(InvalidClientError);
  });
});
