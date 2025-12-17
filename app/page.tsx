"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import SessionCard from "@/components/SessionCard";
import DemoMapClient from "@/components/DemoMapClient";
import Header from "@/components/Header";

type Session = {
  id: string;
  sport: string;
  level: string;
  date: string;
  time: string;
  location: string;
  description: string;
  lat: number;
  lng: number;
};

export default function DemoPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const today = new Date().toISOString().split("T")[0];

        const { data, error } = await supabase
          .from("sessions")
          .select(
            "id, sport, level, date, time, location, description, lat, lng"
          )
          .gte("date", today)
          .order("date", { ascending: true });

        if (error) throw error;

        const now = new Date();
        const upcoming = (data ?? []).filter((s) => {
          if (!s.time) return true;
          const sessionDate = new Date(`${s.date}T${s.time}`);
          return sessionDate >= now;
        });

        setSessions(upcoming);
      } catch (err: any) {
        setError(err.message || "Erreur lors du chargement");
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

  return (
    <>
      <Header />

      <main
        style={{
          padding: "32px 16px 64px",
          maxWidth: 1100,
          margin: "0 auto",
          background: "#F6F7FA",
          minHeight: "100vh",
        }}
      >
        {/* -------- HERO -------- */}
        <section
          style={{
            marginBottom: 40,
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h1
            style={{
              fontSize: 40,
              fontWeight: 900,
              lineHeight: "46px",
              marginBottom: 14,
              maxWidth: 640,
              background:
                "linear-gradient(135deg, #FF375E 0%, #FF6C4A 45%, #FF9D3C 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Unite · Le sport, ça se partage
          </h1>

          <div
            style={{
              marginTop: 24,
              marginBottom: 28,
              padding: "26px 28px",
              maxWidth: 620,
              background:
                "linear-gradient(180deg, #FFFFFF 0%, #FAFAFA 100%)",
              borderRadius: 28,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 14,
            }}
          >
            <p
              style={{
                fontSize: 17,
                color: "#1E1E1E",
                maxWidth: 560,
                lineHeight: "28px",
                textAlign: "center",
                margin: 0,
                fontWeight: 600,
              }}
            >
              Trouve des personnes autour de toi pour pratiquer un sport,
              simplement, au bon moment.
            </p>

            <p
              style={{
                fontSize: 15.5,
                color: "#444",
                maxWidth: 560,
                lineHeight: "25px",
                textAlign: "center",
                margin: 0,
              }}
            >
              Cette démo te montre de vraies sessions actives, visibles sur la
              carte et accessibles en un clic.
            </p>

            <p
              style={{
                fontSize: 15,
                color: "#666",
                maxWidth: 560,
                lineHeight: "24px",
                textAlign: "center",
                margin: 0,
              }}
            >
              Pour créer, rejoindre et participer, télécharge l’application
              Unite.
            </p>

            <div
              style={{
                display: "flex",
                gap: 16,
                marginTop: 10,
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <a
                href="https://apps.apple.com/us/app/uniteapp/id6755112837"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: "12px 22px",
                  borderRadius: 18,
                  background: "#000",
                  color: "#fff",
                  fontSize: 14,
                  fontWeight: 800,
                  textDecoration: "none",
                }}
              >
                App Store
              </a>

              <a
                href="https://play.google.com/store/apps/details?id=com.uniteapp.collectif"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: "12px 22px",
                  borderRadius: 18,
                  background:
                    "linear-gradient(135deg, #FF6C4A 0%, #FF8A65 100%)",
                  color: "#fff",
                  fontSize: 14,
                  fontWeight: 800,
                  textDecoration: "none",
                }}
              >
                Play Store
              </a>
            </div>
          </div>
        </section>

        {/* -------- STATES -------- */}
        {loading && <p>Chargement des sessions…</p>}

        {error && (
          <p style={{ color: "red", marginBottom: 24 }}>
            Erreur : {error}
          </p>
        )}

        {/* -------- MAP -------- */}
        {!loading && sessions.length > 0 && (
          <section style={{ marginBottom: 32 }}>
            <h2
              style={{
                fontSize: 18,
                fontWeight: 800,
                marginBottom: 10,
              }}
            >
              Sessions autour de toi
            </h2>

            <div
              style={{
                borderRadius: 24,
                overflow: "hidden",
                height: 360,
              }}
            >
              <DemoMapClient
                sessions={sessions.map((s) => ({
                  id: s.id,
                  lat: s.lat,
                  lng: s.lng,
                  sport: s.sport,
                }))}
              />
            </div>
          </section>
        )}

        {/* -------- LISTE -------- */}
        <section>
          <h2
            style={{
              fontSize: 18,
              fontWeight: 800,
              marginBottom: 18,
            }}
          >
            Sessions à venir
          </h2>

          {sessions.length > 0 ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fill, minmax(320px, 1fr))",
                gap: 20,
              }}
            >
              {sessions.map((session) => (
                <SessionCard key={session.id} {...session} />
              ))}
            </div>
          ) : (
            !loading && <p>Aucune session disponible pour le moment.</p>
          )}
        </section>
      </main>
    </>
  );
}
