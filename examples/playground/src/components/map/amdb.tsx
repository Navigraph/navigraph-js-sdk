import { useRecoilValue } from "recoil";
import { amdbLayersState } from "../../state/amdb";
import { AmdbLayerName, getAmdbAPI } from "@navigraph/amdb";
import { userState } from "../../state/user";
import { Scope } from "@navigraph/app";
import { memo } from "react";
import { useQuery } from "@tanstack/react-query";
import { GeoJSON, Popup } from "react-leaflet";

const AmdbLayer = memo(({ idarpt, layer, amdb }: { idarpt: string, layer: AmdbLayerName, amdb: ReturnType<typeof getAmdbAPI> }) => {
    const { data } = useQuery({
        queryKey: ['amdb-data', idarpt, layer],
        queryFn: async () => {
            return amdb.getAmdbLayer({ icao: idarpt, layer })
        }
    })

    if (!data) return null;

    return (
        <GeoJSON data={data}>
            <Popup>
                {layer}
            </Popup>
        </GeoJSON>
    )
});

export default function AmdbManager() {
    const amdbLayers = useRecoilValue(amdbLayersState);

    const user = useRecoilValue(userState);

    if (!user?.scope.includes(Scope.AMDB)) return;

    const amdb = getAmdbAPI();

    return amdbLayers.map(([idarpt, layers]) => <>
        <AmdbLayer key={`${idarpt}/aerodromereferencepoint`} amdb={amdb} idarpt={idarpt} layer="aerodromereferencepoint" />
        {layers.map((layer) => <AmdbLayer key={`${idarpt}/${layer}`} amdb={amdb} idarpt={idarpt} layer={layer} />)}
    </>)
}