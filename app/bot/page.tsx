"use client";

import React, { useEffect, useState } from "react";

type BotData = {
  nome: string;
  mensagemBoasVindas: string;
  evolutionUrl: string;
  n8nWebhookUrl: string;
};

export default function Page() {
  const [data, setData] = useState<BotData>({
    nome: "Atendente",
    mensagemBoasVindas: "Oi! Como posso te ajudar?",
    evolutionUrl: "",
    n8nWebhookUrl: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string>("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/bot-config", { cache: "no-store" });
        const json = await res.json();
        if (json?.ok) setData(json.data);
        else setMsg(json?.error ?? "Erro ao carregar");
      } catch {
        setMsg("Erro ao carregar");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function onSave() {
    setMsg("");
    setSaving(true);

    try {
      const res = await fetch("/api/bot-config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json(); // agora SEMPRE vai vir JSON
      if (!res.ok || !json?.ok) throw new Error(json?.error ?? "Falhou");

      setMsg("Salvo ✅");
    } catch (e: any) {
      setMsg(Erro ao salvar: ${e?.message ?? "Falhou"});
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div>Carregando…</div>;

  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 720 }}>
      <h1 style={{ margin: 0 }}>Bot</h1>

      <div style={{ display: "grid", gap: 6 }}>
        <label>Nome do bot</label>
        <input
          value={data.nome}
          onChange={(e) => setData({ ...data, nome: e.target.value })}
          style={input}
        />
      </div>

      <div style={{ display: "grid", gap: 6 }}>
        <label>Mensagem de boas-vindas</label>
        <textarea
          value={data.mensagemBoasVindas}
          onChange={(e) => setData({ ...data, mensagemBoasVindas: e.target.value })}
          rows={3}
          style={input}
        />
      </div>

      <div style={{ display: "grid", gap: 6 }}>
        <label>Instância Evolution (URL)</label>
        <input
          value={data.evolutionUrl}
          onChange={(e) => setData({ ...data, evolutionUrl: e.target.value })}
          placeholder="https://sua-instancia.com"
          style={input}
        />
      </div>

      <div style={{ display: "grid", gap: 6 }}>
        <label>Webhook do n8n</label>
        <input
          value={data.n8nWebhookUrl}
          onChange={(e) => setData({ ...data, n8nWebhookUrl: e.target.value })}
          placeholder="https://n8n.../webhook/..."
          style={input}
        />
      </div>

      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <button onClick={onSave} disabled={saving} style={btn}>
          {saving ? "Salvando..." : "Salvar"}
        </button>

        <button
          onClick={() => location.reload()}
          style={{ ...btn, background: "#eee" }}
        >
          Recarregar
        </button>

        <div style={{ fontSize: 14 }}>{msg}</div>
      </div>

      <div style={{ fontSize: 12, opacity: 0.7 }}>
        Dica: aqui é só salvar a configuração. Conectar Evolution + n8n de verdade a gente faz depois.
      </div>
    </div>
  );
}

const input: React.CSSProperties = {
  width: "100%",
  padding: 12,
  borderRadius: 12,
  border: "1px solid rgba(0,0,0,0.12)",
  background: "#fff",
};

const btn: React.CSSProperties = {
  padding: "10px 14px",
  borderRadius: 12,
  border: "1px solid rgba(0,0,0,0.12)",
  background: "#fff",
  cursor: "pointer",
};
