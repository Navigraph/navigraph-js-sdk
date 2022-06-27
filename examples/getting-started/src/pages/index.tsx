import React from "react";
import { DeviceFlowParams } from "navigraph/auth";
import { useState } from "react";
import { useNavigraphAuth } from "../hooks/useNavigraphAuth";
import { charts } from "../lib/navigraph";

function App() {
  const [params, setParams] = useState<DeviceFlowParams | null>(null);
  const [data, setData] = useState<string | undefined>(undefined);

  const { user, isInitialized, signIn } = useNavigraphAuth();

  // eslint-disable-next-line no-console
  const fetchChartsIndex = () =>
    charts.getChartsIndex({ icao: "KJFK" }).then((d) => setData(JSON.stringify(d, null, 2)));

  const handleSignIn = () => signIn((p) => setParams(p));
  return (
    <main className="flex flex-col space-y-10 items-center justify-center min-h-screen">
      {!isInitialized && <div>Loading...</div>}
      <h1 className="text-6xl text-black dark:text-white font-bold">Navigraph SDK Demo</h1>
      {!params && !user && (
        <button className="bg-white text-black py-2 px-4 font-semibold rounded-md" onClick={handleSignIn}>
          Sign in
        </button>
      )}
      {params?.verification_uri_complete && !user && (
        <>
          <a
            href={params.verification_uri_complete}
            className="text-blue-600"
            target="_blank"
            rel="noreferrer"
          >
            Open sign in page
          </a>
        </>
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
      {data && <pre className="text-sm">{data}</pre>}
    </main>
  );
}

export default App;
