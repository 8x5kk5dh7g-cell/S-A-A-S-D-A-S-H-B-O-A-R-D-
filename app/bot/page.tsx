"use client";

import { useEffect, useState } from "react";

type BotData = {
  nome_bot?: string;
  mensagem_boas_vindas?: string;
  instancia_evolution?: string;
  webhook_n8n?: string;
};

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string>("");
  const [form, setForm] = useState<BotData>({
    nome_bot: "",
    mensagem_boas_vindas: "",
    instancia_evolution: "",
    webhook_n8n: "",
  });

  async function carregar() {
    setLoading(true);
    setMsg("");
    try {
      const res = await fetch("/api/bot-settings", { cache: "no-store" });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Falha ao carregar");
      setForm((prev) => ({ ...prev, ...(json?.data || {}) }));
    } catch (e: any) {
      setMsg("Erro ao carregar: " + e.message);
    } finally {
      setLoading(false);
    }
  }

  async function salvar() {
    setSaving(true);
    setMsg("");
    try {
      const res = await fetch("/api/bot-settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Falha ao salvar");
      setMsg("Salvo ✅");
    } catch (e: any) {
      setMsg("Erro ao salvar: " + e.message);
    } finally {
      setSaving(false);
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  return (
    <div style={{ display: "grid", gap: 14 }}>
      <div>
        <h1 style={{ margin: 0 }}>Bot</h1>
        <div style={{ fontSize: 13, opacity: 0.7 }}>
          Configurações de atendimento e integração
        </div>
      </div>

      <div style={panel}>
        {loading ? (
          <div>Carregando…</div>
        ) : (
          <div style={{ display: "grid", gap: 12 }}>
            <Field
              label="Nome do bot"
              value={form.nome_bot || ""}
              onChange={(v) => setForm({ ...form, nome_bot: v })}
              placeholder="Ex: Laura"
            />

            <Field
              label="Mensagem de boas-vindas"
              value={form.mensagem_boas_vindas || ""}
              onChange={(v) => setForm({ ...form, mensagem_boas_vindas: v })}
              placeholder="Ex: Oi! Como posso te ajudar?"
            />

            <Field
              label="Instância Evolution (URL)"
              value={form.instancia_evolution || ""}
              onChange={(v) => setForm({ ...form, instancia_evolution: v })}
              placeholder="https://sua-instancia.com"
            />

            <Field
              label="Webhook do n8n"
              value={form.webhook_n8n || ""}
              onChange={(v) => setForm({ ...form, webhook_n8n: v })}
              placeholder="https://n8n.../webhook/..."
            />

            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <button onClick={salvar} disabled={saving} style={btnPrimary}>
                {saving ? "Salvando…" : "Salvar"}
              </button>
              <button onClick={carregar} disabled={loading} style={btnGhost}>
                Recarregar
              </button>
              {msg ? <span style={{ fontSize: 13 }}>{msg}</span> : null}
            </div>
          </div>
        )}
      </div>

      <div style={{ fontSize: 12, opacity: 0.7 }}>
        Dica: depois a gente conecta Evolution + n8n de verdade. Aqui é só salvar config.
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label style={{ display: "grid", gap: 6 }}>
      <div style={{ fontSize: 12, fontWeight: 800, opacity: 0.75 }}>
        {label}
      </div>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={input}
      />
    </label>
  );
}

const panel: React.CSSProperties = {
  background: "#fff",
  borderRadius: 16,
  padding: 16,
  border: "1px solid rgba(0,0,0,0.06)",
};

const input: React.CSSProperties = {
  height: 42,
  borderRadius: 12,
  border: "1px solid rgba(0,0,0,0.10)",
  padding: "0 12px",
  outline: "none",
};

const btnPrimary: React.CSSProperties = {
  height: 40,
  padding: "0 14px",
  borderRadius: 12,
  border: "1px solid rgba(0,0,0,0.08)",
  background: "linear-gradient(180deg, rgba(37,99,235,0.16), rgba(124,58,237,0.12))",
  fontWeight: 900,
  cursor: "pointer",
};

const btnGhost: React.CSSProperties = {
  height: 40,
  padding: "0 14px",
  borderRadius: 12,
  border: "1px solid rgba(0,0,0,0.08)",
  background: "rgba(0,0,0,0.02)",
  fontWeight: 800,
  cursor: "pointer",
};
