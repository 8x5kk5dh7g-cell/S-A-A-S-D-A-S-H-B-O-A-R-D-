"use client";

import React, { useEffect, useState } from "react";

type FormState = {
  greeting: string;
  evolution_url: string;
  n8n_webhook: string;
};

export default function Page() {
  const [form, setForm] = useState<FormState>({
    greeting: "Oi! Como posso te ajudar?",
    evolution_url: "",
    n8n_webhook: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string>("");

  async function safeJson(res: Response) {
    const text = await res.text();
    if (!text) return null;
    try {
      return JSON.parse(text);
    } catch {
      return null;
    }
  }

  useEffect(() => {
    (async () => {
      setLoading(true);
      setMsg("");
      try {
        const res = await fetch("/api/bot-settings", { cache: "no-store" });
        const json = await safeJson(res);

        if (!res.ok) {
          setMsg(json?.error || "Erro ao carregar.");
          return;
        }

        const data = json?.data || {};
        setForm({
          greeting: String(data.greeting ?? "Oi! Como posso te ajudar?"),
          evolution_url: String(data.evolution_url ?? ""),
          n8n_webhook: String(data.n8n_webhook ?? ""),
        });
      } catch {
        setMsg("Erro ao carregar (rede).");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function onSave() {
    setSaving(true);
    setMsg("");
    try {
      const res = await fetch("/api/bot-settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const json = await safeJson(res);

      if (!res.ok) {
        setMsg(json?.error || "Erro ao salvar.");
        return;
      }

      setMsg("Salvo ✅");
    } catch {
      setMsg("Erro ao salvar (rede).");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div style={{ padding: 24 }}>Carregando…</div>;

  return (
    <div style={{ padding: 24, display: "grid", gap: 16, maxWidth: 720 }}>
      <h1 style={{ margin: 0 }}>Bot</h1>

      <label style={{ display: "grid", gap: 6 }}>
        Mensagem de boas-vindas
        <input
          value={form.greeting}
          onChange={(e) => setForm((p) => ({ ...p, greeting: e.target.value }))}
          placeholder="Ex: Oi! Como posso te ajudar?"
          style={{ padding: 10, borderRadius: 8, border: "1px solid #ddd" }}
        />
      </label>

      <label style={{ display: "grid", gap: 6 }}>
        Instância Evolution (URL)
        <input
          value={form.evolution_url}
          onChange={(e) => setForm((p) => ({ ...p, evolution_url: e.target.value }))}
          placeholder="https://sua-instancia.com"
          style={{ padding: 10, borderRadius: 8, border: "1px solid #ddd" }}
        />
      </label>

      <label style={{ display: "grid", gap: 6 }}>
        Webhook do n8n
        <input
          value={form.n8n_webhook}
          onChange={(e) => setForm((p) => ({ ...p, n8n_webhook: e.target.value }))}
          placeholder="https://n8n.../webhook/..."
          style={{ padding: 10, borderRadius: 8, border: "1px solid #ddd" }}
        />
      </label>

      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <button
          onClick={onSave}
          disabled={saving}
          style={{ padding: "10px 14px", borderRadius: 8, border: "1px solid #111" }}
        >
          {saving ? "Salvando..." : "Salvar"}
        </button>

        {msg && <span>{msg}</span>}
      </div>
    </div>
  );
}
