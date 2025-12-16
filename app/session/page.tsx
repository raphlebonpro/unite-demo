import { Suspense } from "react";
import SessionClient from "./SessionClient";

export default function SessionPage() {
  return (
    <Suspense fallback={<div style={{ padding: 40 }}>Chargement…</div>}>
      <SessionClient />
    </Suspense>
  );
}
