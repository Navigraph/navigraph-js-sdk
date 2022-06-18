import { DeviceFlowParams } from "navigraph/auth";
import { useState } from "react";
import { useNavigraphAuth } from "src/hooks/useNavigraphAuth";
import { weather } from "../lib/navigraph";
import { requestChartsIndex } from "navigraph/charts";

export default function LoginScreen() {
  const [params, setParams] = useState<DeviceFlowParams | null>(null);
  const [data, setData] = useState<string | null>(null);

  const { user, isInitialized, signin } = useNavigraphAuth();

  const fetchMetar = () => weather.getMetar({ icao: "KJFK" }).then(({ metar }) => setData(metar.rawText));

  const fetchChartsIndex = () => requestChartsIndex("KJFK").then(console.log);

  const handleSignIn = () => signin((p) => setParams(p)).catch(() => setParams(null));

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
          <img src={params.qr.imgSrc} alt="" />
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
          <button onClick={fetchMetar} className="bg-white text-black py-2 px-4 font-semibold rounded-md">
            Fetch METAR report
          </button>
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
