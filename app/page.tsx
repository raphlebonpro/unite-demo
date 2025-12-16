"use client";

import { useEffect, useState } from "react";
import { getSupabase } from "@/lib/supabase";
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
        const supabase = getSupabase();

        // ✅ Supabase pas encore prêt → on stop proprement
        if (!supabase) {
          setLoading(false);
          return;
        }

        const today = new Date().toISOString().split("T")[0];

        const { data, error } = await supabase
          .from("sessions")
          .select(
            "id, sport, level, date, time, location, description, lat, lng"
          )
          .gte("date", today)
          .order("date", { ascending: true });

        if (error) throw error;

        setSessions(data || []);
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
            marginBottom: 56,
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h1
            style={{
              fontSize: 38,
              fontWeight: 900,
              lineHeight: "46px",
              marginBottom: 16,
              maxWidth: 640,
            }}
          >
            Le sport, ça se partage.
          </h1>

          <p
            style={{
              fontSize: 16,
              color: "#444",
              maxWidth: 560,
              lineHeight: "26px",
              marginBottom: 12,
            }}
          >
            Unite rassemble des personnes qui veulent pratiquer un sport
            ensemble, simplement et localement.
          </p>

          <p
            style={{
              fontSize: 15,
              color: "#555",
              maxWidth: 560,
              lineHeight: "24px",
              marginBottom: 12,
            }}
          >
            Cette page te montre un aperçu réel de l’application, avec des
            sessions actives près de chez toi.
          </p>
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
          <section style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 14 }}>
              Sessions autour de toi
            </h2>

            <div
              style={{
                borderRadius: 24,
                overflow: "hidden",
                boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
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
          <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 18 }}>
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
