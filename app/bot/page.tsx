"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Page() {
  const [msg, setMsg] = useState("Carregando…");

  useEffect(() => {
    (async () => {
      try {
        const { data, error } = await supabase
          .from("bot_settings")
          .select("id")
          .limit(1);

        if (error) setMsg("ERRO SUPABASE: " + error.message);
        else setMsg("SUPABASE OK ✅ (rows: " + (data?.length ?? 0) + ")");
      } catch (e: any) {
        setMsg("ERRO RUNTIME: " + (e?.message ?? String(e)));
      }
    })();
  }, []);

  return (
    <div style={{ padding: 24, display: "grid", gap: 12 }}>
      <h1 style={{ margin: 0 }}>Bot</h1>
      <div style={{ padding: 12, border: "1px solid #ddd", borderRadius: 12 }}>
        {msg}
      </div>
    </div>
  );
}
