import { useRecoilValue } from "recoil";
import { amdbLayersState } from "../../state/amdb";
import { AmdbLayerName, getAmdbAPI } from "@navigraph/amdb";
import { userState } from "../../state/user";
import { Scope } from "@navigraph/app";
import { forwardRef, memo, useCallback, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { GeoJSON } from "react-leaflet";
import { circleMarker, GeoJSON as LeafletGeoJson } from 'leaflet';
import { renderToString } from "react-dom/server";
import JsonView from "../JsonView";
import amdbStyle, { layerOrder } from "./amdb_styles";

const AmdbLayer = memo(forwardRef<LeafletGeoJson, { idarpt: string, layer: AmdbLayerName, onClick?: (e: LeafletGeoJson) => void }>(({ idarpt, layer, onClick }, ref) => {
    const { data } = useQuery({
        queryKey: ['amdb-data', idarpt, layer],
        queryFn: async () => {
            return amdb.getAmdbLayer({ icao: idarpt, layer })
        }
    })

    const amdb = getAmdbAPI();

    if (!data) return null;

    return (
        <GeoJSON
            ref={ref}
            data={data ?? {}}
            style={amdbStyle(layer)}
            pointToLayer={(feature, latlng) => {
                const marker = circleMarker(latlng, amdbStyle(layer)(feature));

                marker.feature = feature;

                return marker;
            }}
            onEachFeature={(feature, _layer) => {
                _layer.on('click', (e) => {
                    onClick?.(e.target);
                });

                if (feature.properties) {
                    _layer.bindPopup(renderToString(
                        <div className="flex flex-col items-center gap-2">
                            <span className="text-ng-background-200">{layer}</span>
                            <JsonView content={feature.properties} />
                        </div>
                    ))
                }
            }}
        />

    )
}));

export default function AmdbManager() {
    const amdbLayers = useRecoilValue(amdbLayersState);

    const user = useRecoilValue(userState);

    const refs = useRef<Record<string, Partial<Record<AmdbLayerName, LeafletGeoJson>>>>({});

    const updateOrder = useCallback(() => {
        Object.values(refs.current).forEach((layer) => {
            [...Object.entries(layer)].sort((a, b) => layerOrder[b[0] as AmdbLayerName] - layerOrder[a[0] as AmdbLayerName]).forEach((layer) => layer[1]?.bringToFront())
        });
    }, [refs.current]);

    if (!user?.scope.includes(Scope.AMDB)) return;

    return amdbLayers.flatMap(([idarpt, layers]) =>
        [...layers, 'aerodromereferencepoint' as const satisfies AmdbLayerName].map((layer) => (
            <AmdbLayer
                ref={(_layer) => {
                    if (!refs.current[idarpt]) {
                        refs.current[idarpt] = {};
                    }
                    refs.current[idarpt][layer] = _layer ?? undefined

                    updateOrder();
                }}
                key={`${idarpt}/${layer}`}
                onClick={(_layer) => {
                    const feature = _layer.feature;

                    if (feature?.type === 'Feature') {
                        const style = amdbStyle(layer)(feature);

                        style.stroke = true;
                        style.color = 'blue';

                        Object.values(refs.current).forEach((layer) => {
                            Object.values(layer).forEach((x) => {
                                x?.resetStyle();
                            });
                        })

                        _layer.setStyle(style);
                    }
                }}
                idarpt={idarpt}
                layer={layer}
            />
        ))
    )
}