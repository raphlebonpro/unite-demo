"use client";

import mapboxgl from "mapbox-gl";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

type Session = {
  id: string;
  lat: number;
  lng: number;
};

export default function Map({ sessions }: { sessions: Session[] }) {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!mapContainer.current) return;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [2.3522, 48.8566], // Paris par défaut
      zoom: 11,
    });

    sessions.forEach((session) => {
      // 🎯 Marqueur Unite-like
      const el = document.createElement("div");

      el.style.width = "14px";
      el.style.height = "14px";
      el.style.borderRadius = "50%";
      el.style.background = "#FF6C4A";
      el.style.boxShadow = "0 0 0 6px rgba(255,108,74,0.25)";
      el.style.cursor = "pointer";
      el.style.transition = "transform 0.15s ease";

      // Hover / feedback
      el.onmouseenter = () => {
        el.style.transform = "scale(1.2)";
      };
      el.onmouseleave = () => {
        el.style.transform = "scale(1)";
      };

      el.onclick = () => {
        router.push(`/demo/${session.id}`);
      };

      new mapboxgl.Marker(el)
        .setLngLat([session.lng, session.lat])
        .addTo(map);
    });

    return () => map.remove();
  }, [sessions, router]);

  return (
    <div
      ref={mapContainer}
      style={{
        width: "100%",
        height: 280,
        borderRadius: 24,
        overflow: "hidden",
        boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
      }}
    />
  );
}
