"use client";

import { useEffect, useState } from "react";

export default function Page() {
  const [hydrated, setHydrated] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return (
    <div style={{ padding: 24, display: "grid", gap: 12 }}>
      <h1 style={{ margin: 0 }}>Bot</h1>

      <div style={{ padding: 12, border: "1px solid #ddd", borderRadius: 12 }}>
        <div><b>Hydrated:</b> {hydrated ? "SIM ✅" : "NÃO ❌"}</div>
        <div><b>Cliques:</b> {count}</div>
      </div>

      <button
        onClick={() => setCount((c) => c + 1)}
        style={{
          padding: 14,
          borderRadius: 12,
          border: "1px solid rgba(0,0,0,0.2)",
          background: "#fff",
          fontWeight: 900,
          fontSize: 16,
        }}
      >
        TESTE CLIQUE
      </button>
    </div>
  );
}
