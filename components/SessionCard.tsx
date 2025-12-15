import Link from "next/link";
import { getSportColor } from "@/lib/sportColors";

type SessionCardProps = {
  id: string;
  sport: string;
  level: string;
  date: string;
  time: string;
  location: string;
  description?: string;
  lat?: number;
  lng?: number;
};

function encodeSession(data: object) {
  return encodeURIComponent(JSON.stringify(data));
}

export default function SessionCard(props: SessionCardProps) {
  const {
    sport,
    level,
    date,
    time,
    location,
    description,
    lat,
    lng,
  } = props;

  const payload = encodeSession({
    sport,
    level,
    date,
    time,
    location,
    description,
    lat,
    lng,
  });

  // 🎨 Couleur liée au sport
  const sportColor = getSportColor(sport);

  return (
    <Link
      href={`/session?data=${payload}`}
      style={{ textDecoration: "none" }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 24,
          padding: 20,
          marginBottom: 20,
          boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* 🔹 Barre couleur sport */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            background: sportColor,
          }}
        />

        <div
          style={{
            marginTop: 12,
            textAlign: "center",
            fontWeight: 800,
            fontSize: 16,
          }}
        >
          {sport}
        </div>

        <div
          style={{
            marginTop: 4,
            textAlign: "center",
            fontSize: 13,
            color: "#555",
          }}
        >
          {date} · {time}
        </div>

        {/* 🔘 Bouton aligné sur la couleur du sport */}
        <div
          style={{
            marginTop: 16,
            background: sportColor,
            color: "#fff",
            borderRadius: 999,
            padding: "12px 0",
            textAlign: "center",
            fontWeight: 700,
            boxShadow: `0 10px 24px ${sportColor}44`,
          }}
        >
          Voir la session
        </div>
      </div>
    </Link>
  );
}
