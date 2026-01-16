"use client";

import React, { useEffect, useState } from "react";

type BotConfig = {
  nome: string;
  ativo: boolean;
  mensagemBoasVindas: string;

  evolutionUrl: string;
  evolutionApiKey: string;
  instanceName: string;

  n8nWebhookUrl: string;
};

const DEFAULT: BotConfig = {
  nome: "Atendimento",
  ativo: true,
  mensagemBoasVindas: "Olá! Como posso te ajudar?",

  evolutionUrl: "",
  evolutionApiKey: "",
  instanceName: "",

  n8nWebhookUrl: "",
};

export default function BotPage() {
  const [cfg, setCfg] = useState<BotConfig>(DEFAULT);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string>("");

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/bot-settings");
        const json = await res.json();
        if (json?.ok) setCfg({ ...DEFAULT, ...(json.data ?? {}) });
        else setMsg("Erro ao carregar: " + (json?.error ?? "—"));
      } catch (e: any) {
        setMsg("Erro ao carregar: " + (e?.message ?? "—"));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function salvar() {
    try {
      setSaving(true);
      setMsg("");

      const res = await fetch("/api/bot-settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cfg),
      });

      const json = await res.json();
      if (!json?.ok) {
        setMsg("Erro ao salvar: " + (json?.error ?? "—"));
        return;
      }
      setMsg("Salvo ✅");
    } catch (e: any) {
      setMsg("Erro ao salvar: " + (e?.message ?? "—"));
    } finally {
      setSaving(false);
    }
  }

  function set<K extends keyof BotConfig>(k: K, v: BotConfig[K]) {
    setCfg((s) => ({ ...s, [k]: v }));
  }

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div style={card}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
          <div>
            <h1 style={{ margin: 0 }}>Bot</h1>
            <div style={{ opacity: 0.7, fontSize: 13 }}>Configurar atendimento e integrações</div>
          </div>

          <button onClick={salvar} disabled={saving || loading} style={btn}>
            {saving ? "Salvando..." : "Salvar"}
          </button>
        </div>

        {msg ? <div style={notice}>{msg}</div> : null}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div style={card}>
          <h3 style={h3}>Geral</h3>

          <Label>Nome</Label>
          <input style={input} value={cfg.nome} onChange={(e) => set("nome", e.target.value)} />

          <div style={{ height: 8 }} />
          <Label>Ativo</Label>
          <label style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <input type="checkbox" checked={cfg.ativo} onChange={(e) => set("ativo", e.target.checked)} />
            <span style={{ opacity: 0.8 }}>{cfg.ativo ? "Ativo" : "Desativado"}</span>
          </label>

          <div style={{ height: 8 }} />
          <Label>Mensagem de boas-vindas</Label>
          <textarea
            style={{ ...input, minHeight: 90 }}
            value={cfg.mensagemBoasVindas}
            onChange={(e) => set("mensagemBoasVindas", e.target.value)}
          />
        </div>

        <div style={card}>
          <h3 style={h3}>WhatsApp (Evolution)</h3>

          <Label>Evolution URL</Label>
          <input
            style={input}
            value={cfg.evolutionUrl}
            onChange={(e) => set("evolutionUrl", e.target.value)}
            placeholder="https://sua-evolution..."
          />

          <div style={{ height: 8 }} />
          <Label>API Key</Label>
          <input
            style={input}
            value={cfg.evolutionApiKey}
            onChange={(e) => set("evolutionApiKey", e.target.value)}
            placeholder="cole a api key"
          />

          <div style={{ height: 8 }} />
          <Label>Instância</Label>
          <input
            style={input}
            value={cfg.instanceName}
            onChange={(e) => set("instanceName", e.target.value)}
            placeholder="ex: loja01"
          />

          <div style={{ height: 14 }} />
          <h3 style={h3}>n8n</h3>

          <Label>Webhook</Label>
          <input
            style={input}
            value={cfg.n8nWebhookUrl}
            onChange={(e) => set("n8nWebhookUrl", e.target.value)}
            placeholder="https://n8n.../webhook/..."
          />
        </div>
      </div>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <div style={{ fontSize: 12, opacity: 0.7, fontWeight: 800 }}>{children}</div>;
}

const card: React.CSSProperties = {
  background: "#fff",
  borderRadius: 16,
  border: "1px solid rgba(0,0,0,0.06)",
  padding: 16,
};

const h3: React.CSSProperties = { margin: 0, marginBottom: 8 };

const input: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 12,
  border: "1px solid rgba(0,0,0,0.12)",
  outline: "none",
};

const btn: React.CSSProperties = {
  padding: "10px 14px",
  borderRadius: 12,
  border: "1px solid rgba(0,0,0,0.12)",
  background: "linear-gradient(180deg, rgba(37,99,
