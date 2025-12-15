"use client";

import Map, { Marker } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { useRouter } from "next/navigation";
import { SPORT_COLORS } from "@/lib/sportColors";

type SessionPin = {
  id: string;
  lat: number;
  lng: number;
  sport: string;
};

export default function DemoMapClient({
  sessions,
}: {
  sessions: SessionPin[];
}) {
  const router = useRouter();

  if (!sessions || sessions.length === 0) return null;

  return (
    <Map
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      initialViewState={{
        latitude: 46.6,      // centre France
        longitude: 2.5,
        zoom: 5,
      }}
      minZoom={4}
      maxZoom={12}
      style={{ width: "100%", height: "100%" }}
      mapStyle="mapbox://styles/mapbox/streets-v12"
    >
      {sessions.map((s) => {
        const color = SPORT_COLORS[s.sport] || SPORT_COLORS.Autres;

        return (
          <Marker
            key={s.id}
            latitude={s.lat}
            longitude={s.lng}
            anchor="bottom"
          >
            <div
              onClick={() => router.push(`/demo/${s.id}`)}
              style={{
                width: 18,
                height: 18,
                borderRadius: "50%",
                background: color,
                border: "3px solid #fff",
                boxShadow: "0 6px 14px rgba(0,0,0,0.35)",
                cursor: "pointer",
              }}
              title={s.sport}
            />
          </Marker>
        );
      })}
    </Map>
  );
}
