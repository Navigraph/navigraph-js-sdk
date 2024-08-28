import { useRecoilValue } from "recoil";
import { appState } from "../state/app";
import { userState } from "../state/user";
import { useNavigate } from "react-router-dom";
import { NavigraphAuth, User } from "@navigraph/auth";
import { Scope } from "@navigraph/app";
import { ReactNode } from "react";
import { getChartsAPI } from "@navigraph/charts";
import { getAmdbAPI } from "@navigraph/amdb";

interface PropsStruct {
    [Scope.CHARTS]: ReturnType<typeof getChartsAPI>
    [Scope.AMDB]: ReturnType<typeof getAmdbAPI>
}

export function protectedPage<P extends {}, S extends Scope[]>(Component: (props: P & { auth: NavigraphAuth, user: User } & Pick<PropsStruct, Extract<S[number], keyof PropsStruct>>) => ReactNode, requiredScopes: S) {
    return (props: P) => {
        const navigate = useNavigate();

        const app = useRecoilValue(appState);

        const user = useRecoilValue(userState);

        if (!app || !user || !requiredScopes.every((scope) => user.scope.includes(scope))) {
            navigate('/');
            return null
        }

        const charts = user.scope.includes(Scope.CHARTS) ? getChartsAPI() : undefined;
        const amdb = user.scope.includes(Scope.AMDB) ? getAmdbAPI() : undefined;

        return <Component user={user} auth={app.auth} amdb={amdb} charts={charts} {...props as unknown as any} />;
    };
}