"use client";

import React, { useEffect, useState } from "react";

export default function Page() {
  const [evolutionUrl, setEvolutionUrl] = useState("");
  const [n8nWebhook, setN8nWebhook] = useState("");
  const [status, setStatus] = useState("");

  async function load() {
    setStatus("Carregando...");
    const res = await fetch("/api/bot-config", { cache: "no-store" });
    const text = await res.text();

    // isso aqui mata de vez o “Unexpected end of JSON input”
    let json: any = null;
    try { json = text ? JSON.parse(text) : null; } catch {}

    if (!res.ok || !json?.ok) {
      setStatus(ERRO GET (${res.status}): ${text || "resposta vazia"});
      return;
    }

    setEvolutionUrl(json.data?.evolution_url ?? "");
    setN8nWebhook(json.data?.n8n_webhook ?? "");
    setStatus("OK ✅");
  }

  async function save() {
    setStatus("Salvando...");
    const res = await fetch("/api/bot-config", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        evolution_url: evolutionUrl,
        n8n_webhook: n8nWebhook,
      }),
    });

    const text = await res.text();
    let json: any = null;
    try { json = text ? JSON.parse(text) : null; } catch {}

    if (!res.ok || !json?.ok) {
      setStatus(ERRO POST (${res.status}): ${text || "resposta vazia"});
      return;
    }

    setStatus("Salvo ✅");
  }

  useEffect(() => { load(); }, []);

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <h1 style={{ margin: 0 }}>Bot</h1>

      <label style={{ display: "grid", gap: 6 }}>
        <b>Instância Evolution (URL)</b>
        <input
          value={evolutionUrl}
          onChange={(e) => setEvolutionUrl(e.target.value)}
          placeholder="https://sua-instancia.com"
          style={inp}
        />
      </label>

      <label style={{ display: "grid", gap: 6 }}>
        <b>Webhook do n8n</b>
        <input
          value={n8nWebhook}
          onChange={(e) => setN8nWebhook(e.target.value)}
          placeholder="https://n8n.../webhook/..."
          style={inp}
        />
      </label>

      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <button onClick={save} style={btn}>Salvar</button>
        <button onClick={load} style={btn2}>Recarregar</button>
        <span style={{ fontSize: 13, opacity: 0.85 }}>{status}</span>
      </div>
    </div>
  );
}

const inp: React.CSSProperties = {
  padding: 12,
  borderRadius: 12,
  border: "1px solid rgba(0,0,0,0.12)",
  background: "#fff",
};

const btn: React.CSSProperties = {
  padding: "10px 14px",
  borderRadius: 12,
  border: "1px solid rgba(0,0,0,0.12)",
  background: "#111",
  color: "#fff",
  fontWeight: 800,
  cursor: "pointer",
};

const btn2: React.CSSProperties = {
  padding: "10px 14px",
  borderRadius: 12,
  border: "1px solid rgba(0,0,0,0.12)",
  background: "#fff",
  fontWeight: 800,
  cursor: "pointer",
};
