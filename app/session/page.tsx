"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { getSportColor } from "@/lib/sportColors";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

// Format date FR lisible
function formatDate(dateStr: string, timeStr: string) {
  const date = new Date(`${dateStr}T${timeStr}`);
  const formattedDate = date.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
  const formattedTime = date.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${formattedDate} à ${formattedTime}`;
}

export default function SessionDetailPage() {
  const searchParams = useSearchParams();
  const data = searchParams.get("data");

  if (!data) {
    return (
      <main style={{ padding: 40 }}>
        <p>Session introuvable.</p>
        <Link href="/">Retour</Link>
      </main>
    );
  }

  const session = JSON.parse(decodeURIComponent(data));

  const {
    sport,
    level,
    date,
    time,
    location,
    description,
    lat,
    lng,
    participantsCount = 1,
    participantsMax = 10,
  } = session;

  const sportColor = getSportColor(sport);
  const formattedDate = formatDate(date, time);

  // 📍 Map avec pin centré
  const mapUrl =
    lat && lng && MAPBOX_TOKEN
      ? `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/pin-s+${sportColor.replace(
          "#",
          ""
        )}(${lng},${lat})/${lng},${lat},14/800x400?access_token=${MAPBOX_TOKEN}`
      : null;

  return (
    <main
      style={{
        padding: "48px 16px 96px",
        maxWidth: 800,
        margin: "0 auto",
      }}
    >
      {/* ===== SESSION CARD ===== */}
      <section
        style={{
          background: `linear-gradient(
            to bottom,
            ${sportColor}12 0%,
            ${sportColor}05 100%
          )`,
          borderRadius: 36,
          padding: "36px 32px",
          border: `1.5px solid ${sportColor}30`, // 👈 bords visibles
        }}
      >
        {/* ===== TITRE ===== */}
        <h1
          style={{
            textAlign: "center",
            fontSize: 36,
            fontWeight: 900,
            marginBottom: 22,
            letterSpacing: "-0.6px",
            background: `linear-gradient(90deg, ${sportColor}, #111)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {sport}
        </h1>

        {/* ===== DATE ===== */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 14 }}>
          <div
            style={{
              padding: "12px 22px",
              borderRadius: 999,
              fontSize: 15,
              fontWeight: 700,
              background: `${sportColor}18`,
              color: sportColor,
              border: `1px solid ${sportColor}30`,
            }}
          >
            {formattedDate}
          </div>
        </div>

        {/* ===== NIVEAU ===== */}
        {level && (
          <div style={{ textAlign: "center", marginBottom: 26 }}>
            <span
              style={{
                padding: "8px 18px",
                borderRadius: 999,
                background: `${sportColor}22`,
                color: sportColor,
                fontSize: 14,
                fontWeight: 700,
              }}
            >
              Niveau · {level}
            </span>
          </div>
        )}

        {/* ===== LIEU ===== */}
        <div
          style={{
            background: `${sportColor}10`,
            border: `1px solid ${sportColor}30`,
            borderRadius: 22,
            padding: "18px 20px",
            textAlign: "center",
            fontSize: 15,
            fontWeight: 600,
            marginBottom: 30,
          }}
        >
          {location}
        </div>

        {/* ===== MAP ===== */}
        {mapUrl && (
          <div style={{ marginBottom: 32 }}>
            <img
              src={mapUrl}
              alt="Carte de la session"
              style={{
                width: "100%",
                height: 280,
                objectFit: "cover",
                borderRadius: 22,
                border: `1.5px solid ${sportColor}30`,
                filter: "saturate(1.05) contrast(1.02)",
              }}
            />
          </div>
        )}

        {/* ===== PARTICIPANTS ===== */}
        <div
          style={{
            background: `${sportColor}08`,
            borderRadius: 22,
            padding: 20,
            marginBottom: 32,
            border: `1px solid ${sportColor}25`,
          }}
        >
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 10 }}>
            Participants
          </div>

          <div
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: sportColor,
              marginBottom: 12,
            }}
          >
            {participantsCount} / {participantsMax}
          </div>

          <div
            style={{
              height: 6,
              borderRadius: 999,
              background: `${sportColor}22`,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${(participantsCount / participantsMax) * 100}%`,
                height: "100%",
                background: sportColor,
                transition: "width 0.4s ease",
              }}
            />
          </div>
        </div>

        {/* ===== DESCRIPTION (TOUJOURS PRÉSENTE) ===== */}
        <div
          style={{
            background: `${sportColor}08`,
            borderRadius: 22,
            padding: 22,
            marginBottom: 36,
            border: `1px solid ${sportColor}25`,
            fontSize: 15,
            lineHeight: 1.7,
            color: description ? "#222" : "#666",
            fontStyle: description ? "normal" : "italic",
          }}
        >
          {description && description.trim().length > 0
            ? description
            : "Aucune description renseignée par l’organisateur."}
        </div>

        {/* ===== CTA ===== */}
        <div style={{ textAlign: "center" }}>
          <a
            href="https://uniteapp.fr"
            style={{
              display: "inline-block",
              padding: "14px 44px",
              borderRadius: 999,
              fontSize: 15,
              fontWeight: 800,
              color: "#fff",
              textDecoration: "none",
              background:
                "linear-gradient(135deg, #FF9D3C 0%, #FF6C4A 50%, #FF375E 100%)",
              boxShadow: "none",
            }}
          >
            Télécharger Unite
          </a>

          <Link
            href="/"
            style={{
              display: "block",
              marginTop: 22,
              fontSize: 14,
              fontWeight: 600,
              color: "#666",
              textDecoration: "none",
            }}
          >
            Retour aux sessions
          </Link>
        </div>
      </section>
    </main>
  );
}
