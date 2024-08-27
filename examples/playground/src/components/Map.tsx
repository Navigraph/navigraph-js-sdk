import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css"
import { useRef } from "react";
import { Map } from "leaflet";

export default function MapPane() {
    const mapRef = useRef<Map>(null);

    return (
        <div className='w-full'>
            <MapContainer center={[51.505, -0.09]} zoom={13} className='h-screen' zoomControl={false} ref={mapRef} whenReady={() => {
                setInterval(() => mapRef.current?.invalidateSize(), 1000)
            }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </MapContainer>
        </div>
    )
}
