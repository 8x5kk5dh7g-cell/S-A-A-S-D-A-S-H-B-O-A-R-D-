"use client";

import { useEffect, useState } from "react";

const input: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 12,
  border: "1px solid rgba(0,0,0,0.15)",
  outline: "none",
};

const box: React.CSSProperties = {
  background: "#fff",
  border: "1px solid rgba(0,0,0,0.06)",
  borderRadius: 16,
  padding: 16,
};

export default function BotPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string>("");

  const [nome, setNome] = useState("Atendente");
  const [mensagemInicial, setMensagemInicial] = useState("Oi! Como posso te ajudar?");
  const [modo, setModo] = useState<"atendimento" | "vendas">("atendimento");

  async function carregar() {
    setMsg("");
    setLoading(true);

    const r = await fetch("/api/bot-config", { cache: "no-store" });
    const text = await r.text();

    let j: any;
    try {
      j = JSON.parse(text);
    } catch {
      setMsg("Erro: API não retornou JSON (deploy errado ou rota não criada).");
      setLoading(false);
      return;
    }

    if (!j.ok) {
      setMsg(Erro ao carregar: ${j.error});
      setLoading(false);
      return;
    }

    const data = j.data ?? {};
    setNome(data.nome ?? "Atendente");
    setMensagemInicial(data.mensagemInicial ?? "Oi! Como posso te ajudar?");
    setModo(data.modo === "vendas" ? "vendas" : "atendimento");

    setLoading(false);
  }

  async function salvar() {
    setMsg("");
    setSaving(true);

    const payload = { nome, mensagemInicial, modo };

    const r = await fetch("/api/bot-config", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const text = await r.text();

    let j: any;
    try {
      j = JSON.parse(text);
    } catch {
      setMsg("Erro ao salvar: resposta da API veio vazia/bugada (deploy).");
      setSaving(false);
      return;
    }

    if (!j.ok) {
      setMsg(Erro ao salvar: ${j.error});
      setSaving(false);
      return;
    }

    setMsg("Salvo com sucesso ✅");
    setSaving(false);
  }

  useEffect(() => {
    carregar();
  }, []);

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
        <div>
          <h1 style={{ margin: 0 }}>Bot</h1>
          <div style={{ fontSize: 12, opacity: 0.7 }}>Configuração do atendimento</div>
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={carregar} disabled={loading || saving} style={{ padding: "10px 14px", borderRadius: 12 }}>
            Recarregar
          </button>
          <button
            onClick={salvar}
            disabled={loading || saving}
            style={{ padding: "10px 14px", borderRadius: 12, background: "#111", color: "#fff" }}
          >
            {saving ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </div>

      {msg && <div style={{ ...box, background: "rgba(0,0,0,0.03)" }}>{msg}</div>}

      <div style={box}>
        <div style={{ display: "grid", gap: 10 }}>
          <label>
            <div style={{ fontSize: 12, opacity: 0.7, fontWeight: 800 }}>Nome do bot</div>
            <input style={input} value={nome} onChange={(e) => setNome(e.target.value)} />
          </label>

          <label>
            <div style={{ fontSize: 12, opacity: 0.7, fontWeight: 800 }}>Mensagem inicial</div>
            <input style={input} value={mensagemInicial} onChange={(e) => setMensagemInicial(e.target.value)} />
          </label>

          <label>
            <div style={{ fontSize: 12, opacity: 0.7, fontWeight: 800 }}>Modo</div>
            <select style={input} value={modo} onChange={(e) => setModo(e.target.value as any)}>
              <option value="atendimento">Atendimento</option>
              <option value="vendas">Vendas</option>
            </select>
          </label>
        </div>
      </div>
    </div>
  );
}
