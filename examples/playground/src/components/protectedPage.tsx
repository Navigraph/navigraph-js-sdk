import { useRecoilValue } from "recoil";
import { appState } from "../state/app";
import { userState } from "../state/user";
import { useNavigate } from "react-router-dom";
import { NavigraphAuth, User } from "@navigraph/auth";
import { Scope } from "@navigraph/app";
import { ReactNode } from "react";
import { getChartsAPI } from "@navigraph/charts";

interface PropsStruct {
    [Scope.CHARTS]: ReturnType<typeof getChartsAPI>
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


        return <Component user={user} auth={app.auth} charts={charts} {...props as unknown as any} />;
    };
}