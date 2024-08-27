import { useCallback, useState } from "react";
import { LargeButton } from "../components/Button";
import { useRecoilState, useRecoilValue } from "recoil";
import { appState } from "../state/app";
import { redirect } from "react-router-dom";
import { userState } from "../state/user";
import { authState } from "../state/auth";
import { DeviceFlowTokenExpiredError } from "@navigraph/app";

export default function Auth() {
    const [error, setError] = useState<Error | null>(null)
    const [params, setParams] = useRecoilState(authState)

    const app = useRecoilValue(appState);

    const user = useRecoilValue(userState);

    const handleSignIn = useCallback(
        () => {
            app?.auth.signInWithDeviceFlow((params) => {
                setParams(params)
                setError(null)
            })
                .catch(err => setError(err))
                .finally(() => setParams(null))
        },
        [app?.auth],
    )

    if (!app) redirect('/');

    return (
        <div className="page-container flex flex-col items-center gap-3 px-3">
            <h1>Auth</h1>

            {!params && !user && <LargeButton onClick={handleSignIn}>Sign In with device flow</LargeButton>}
            {params &&
                <>
                    <div className="bg-ng-background-400 p-2 rounded-lg shadow-md overflow-auto w-full no-scrollbar">
                        <pre className="text-white text-xs">{JSON.stringify(params, null, 2)}</pre>
                    </div>

                    <LargeButton onClick={() => window.open(params.verification_uri_complete, '_blank')}>Navigate to Sign In Page</LargeButton>
                </>
            }

            {error && (
                <div className="text-red-500">
                    {error instanceof DeviceFlowTokenExpiredError ? "Session expired, try again!" : error.message}
                </div>
            )}

            {user &&
                <>
                    <div className="bg-ng-background-400 p-2 rounded-lg shadow-md overflow-auto w-full no-scrollbar">
                        <pre className="text-white text-xs">{JSON.stringify(user, null, 2)}</pre>
                    </div>

                    <LargeButton onClick={() => app?.auth.signOut()}>Sign Out</LargeButton>
                </>
            }
        </div >
    )
}
