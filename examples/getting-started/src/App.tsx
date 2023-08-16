import { DeviceFlowParams } from "navigraph/auth";
import { useCallback, useState } from "react";
import { useNavigraphAuth } from "./hooks/useNavigraphAuth";
import { charts } from "./lib/navigraph";

function App() {
  const [params, setParams] = useState<DeviceFlowParams | null>(null);
  const [chartsIndex, setChartsIndex] = useState<string | undefined>(undefined);

  const { user, isInitialized, signIn, signOut } = useNavigraphAuth();

  const fetchChartsIndex = () =>
    charts.getChartsIndex({ icao: "KJFK" }).then((d) => setChartsIndex(JSON.stringify(d, null, 2)));

  const handleSignIn = useCallback(
    () => signIn((p) => setParams(p)).finally(() => setParams(null)),
    [signIn]
  );

  const isLoginInProgress = !!params;

  return (
    <main className="dark:bg-black dark:text-white flex flex-col space-y-10 items-center justify-center min-h-screen ">
      {!isInitialized && <div>Loading...</div>}

      <h1 className="text-6xl text-black dark:text-white font-bold">Navigraph SDK Demo</h1>

      <button
        className="py-2 px-4 font-semibold rounded-md bg-black text-white dark:bg-white dark:text-black"
        onClick={() => !isLoginInProgress && (user ? signOut() : handleSignIn())}
      >
        {user ? "Sign out" : !isLoginInProgress ? "Sign in" : "Signing in..."}
      </button>

      {params?.verification_uri_complete && !user && (
        <div className="flex flex-col items-center gap-2">
          <a
            href={params.verification_uri_complete}
            className="text-blue-600 bg-gray-500/10 p-3 rounded-lg"
            target="_blank"
            rel="noreferrer"
          >
            Open sign in page
          </a>
          <span className="opacity-50">or scan this QR code:</span>
          <div className="p-2 rounded-lg bg-white mt-1">
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${params.verification_uri_complete}`}
            />
          </div>
        </div>
      )}

      {user && (
        <>
          <h2 className="text-2xl">
            Welcome, <span className="text-blue-400 font-bold">{user.preferred_username}</span>
          </h2>
          <button
            onClick={fetchChartsIndex}
            className="bg-white text-black py-2 px-4 font-semibold rounded-md"
          >
            Fetch charts index
          </button>
        </>
      )}

      {chartsIndex && <pre className="text-sm max-h-[40vh] overflow-auto">{chartsIndex}</pre>}
    </main>
  );
}

export default App;
