"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function BotPage() {
  const [nome, setNome] = useState("");
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  // carrega o que já tem salvo
  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("bot_configs")
        .select("data")
        .eq("id", 1)
        .single();

      if (error) {
        console.error("ERRO LOAD:", error);
        return;
      }

      const cfg = (data?.data ?? {}) as any;
      setNome(cfg.nome ?? "");
      setPrompt(cfg.prompt ?? "");
    })();
  }, []);

  async function salvar() {
    setLoading(true);

    const payload = {
      nome,
      prompt,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from("bot_configs")
      .upsert({ id: 1, data: payload }, { onConflict: "id" });

    setLoading(false);

    if (error) {
      console.error("ERRO SAVE:", error);
      alert("Erro ao salvar: " + error.message);
      return;
    }

    alert("Salvou no Supabase ✅");
  }

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <h1>Bot</h1>

      <label style={{ display: "grid", gap: 6 }}>
        Nome do bot
        <input
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          style={{ padding: 10, borderRadius: 10, border: "1px solid #ddd" }}
        />
      </label>

      <label style={{ display: "grid", gap: 6 }}>
        Prompt
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={6}
          style={{ padding: 10, borderRadius: 10, border: "1px solid #ddd" }}
        />
      </label>

      <button
        onClick={salvar}
        disabled={loading}
        style={{
          padding: 12,
          borderRadius: 12,
          border: "1px solid #ddd",
          cursor: "pointer",
          fontWeight: 800,
        }}
      >
        {loading ? "Salvando..." : "Salvar"}
      </button>
    </div>
  );
}
