
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

const panel: React.CSSProperties = {
  background: "#fff",
  borderRadius: 16,
  padding: 16,
  border: "1px solid rgba(0,0,0,0.06)",
};

const input: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 12,
  border: "1px solid rgba(0,0,0,0.12)",
  outline: "none",
};

const label: React.CSSProperties = { fontSize: 12, opacity: 0.7, fontWeight: 800 };
const row: React.CSSProperties = { display: "grid", gap: 8 };
const grid2: React.CSSProperties = { display: "grid", gap: 12, gridTemplateColumns: "1fr 1fr" };

export default function BotPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // config “normal”
  const [nome, setNome] = useState("Atendente");
  const [mensagemInicial, setMensagemInicial] = useState("Olá! Como posso te ajudar?");
  const [modo, setModo] = useState<"atendimento" | "vendas">("atendimento");
  const [handoffHumano, setHandoffHumano] = useState(true);

  // config “avançado” (JSON)
  const [jsonText, setJsonText] = useState<string>('{}');

  const [status, setStatus] = useState<{ type: "ok" | "err"; msg: string } | null>(null);

  // Carrega do Supabase
  useEffect(() => {
    (async () => {
      setStatus(null);
      setLoading(true);

      // Tenta ler da tabela bot_configs (id=1, coluna data jsonb)
      const { data, error } = await supabase
        .from("bot_configs")
        .select("data")
        .eq("id", 1)
        .maybeSingle();

      if (error) {
        setStatus({ type: "err", msg: Erro ao carregar: ${error.message} });
        setLoading(false);
        return;
      }

      if (data?.data) {
        const cfg = data.data as any;

        setNome(cfg.nome ?? "Atendente");
        setMensagemInicial(cfg.mensagemInicial ?? "Olá! Como posso te ajudar?");
        setModo(cfg.modo === "vendas" ? "vendas" : "atendimento");
        setHandoffHumano(cfg.handoffHumano ?? true);

        // mostra também no JSON avançado
        setJsonText(JSON.stringify(cfg, null, 2));
      }

      setLoading(false);
    })();
  }, []);

  async function salvar() {
    setStatus(null);
    setSaving(true);

    // monta config padrão
    const baseCfg = {
      nome,
      mensagemInicial,
      modo,
      handoffHumano,
    };

    // se usuário mexeu no JSON avançado, tenta usar ele
    let finalCfg = baseCfg;
    const trimmed = (jsonText ?? "").trim();

    if (trimmed.length > 0) {
      try {
        const parsed = JSON.parse(trimmed);
        // mistura o JSON avançado por cima (pra não perder campos)
        finalCfg = { ...baseCfg, ...parsed };
      } catch (e: any) {
        setStatus({ type: "err", msg: "JSON inválido no campo avançado. Corrige ou deixa {}." });
        setSaving(false);
        return;
      }
    } else {
      // se ficou vazio, não tenta parse (evita “Unexpected end of JSON input”)
      setJsonText("{}");
    }

    const { error } = await supabase
      .from("bot_configs")
      .upsert({ id: 1, data: finalCfg }, { onConflict: "id" });

    if (error) {
      setStatus({ type: "err", msg: Erro ao salvar: ${error.message} });
      setSaving(false);
      return;
    }

    setStatus({ type: "ok", msg: "Salvo com sucesso!" });
    setJsonText(JSON.stringify(finalCfg, null, 2));
    setSaving(false);
  }

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
        <div>
          <h1 style={{ margin: 0 }}>Bot</h1>
          <div style={{ fontSize: 12, opacity: 0.7 }}>Configuração do atendimento e IA</div>
        </div>

        <button
          onClick={salvar}
          disabled={saving || loading}
          style={{
            padding: "10px 14px",
            borderRadius: 12,
            border: "1px solid rgba(0,0,0,0.12)",
            background: saving ? "rgba(0,0,0,0.04)" : "#111",
            color: saving ? "#555" : "#fff",
            cursor: saving ? "not-allowed" : "pointer",
            fontWeight: 800,
          }}
        >
          {saving ? "Salvando..." : "Salvar"}
        </button>
      </div>

      {status && (
        <div
          style={{
            ...panel,
            border:
              status.type === "ok"
                ? "1px solid rgba(16,185,129,0.35)"
                : "1px solid rgba(239,68,68,0.35)",
            background:
              status.type === "ok" ? "rgba(16,185,129,0.06)" : "rgba(239,68,68,0.06)",
          }}
        >
          <b>{status.type === "ok" ? "OK" : "Erro"}</b> — {status.msg}
        </div>
      )}

      <div style={panel}>
        <h3 style={{ marginTop: 0 }}>Configuração rápida</h3>

        {loading ? (
          <div style={{ opacity: 0.7 }}>Carregando...</div>
        ) : (
          <div style={{ display: "grid", gap: 12 }}>
            <div style={grid2}>
              <div style={row}>
                <div style={label}>Nome do bot</div>
                <input style={input} value={nome} onChange={(e) => setNome(e.target.value)} />
              </div>

              <div style={row}>
                <div style={label}>Modo</div>
                <select style={input} value={modo} onChange={(e) => setModo(e.target.value as any)}>
                  <option value="atendimento">Atendimento</option>
                  <option value="vendas">Vendas</option>
                </select>
              </div>
            </div>

            <div style={row}>
              <div style={label}>Mensagem inicial</div>
              <textarea
                style={{ ...input, minHeight: 90, resize: "vertical" }}
                value={mensagemInicial}
                onChange={(e) => setMensagemInicial(e.target.value)}
              />
            </div>

            <label style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <input
                type="checkbox"
                checked={handoffHumano}
                onChange={(e) => setHandoffHumano(e.target.checked)}
              />
              <span style={{ fontWeight: 800 }}>Permitir transferir para humano</span>
            </label>
          </div>
        )}
      </div>

      <div style={panel}>
        <h3 style={{ marginTop: 0 }}>Configuração avançada (JSON)</h3>
        <div style={{ fontSize: 12, opacity: 0.7, marginBottom: 8 }}>
          Se não souber, deixa como {"{}"}. Se ficar vazio dá erro.
        </div>
        <textarea
          style={{ ...input, minHeight: 180, resize: "vertical", fontFamily: "monospace" }}
          value={jsonText}
          onChange={(e) => setJsonText(e.target.value)}
        />
      </div>
    </div>
  );
}
