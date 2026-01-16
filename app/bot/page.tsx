"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type BotSettings = {
  id: string;
  org_id: string;
  client_id: string | null;

  bot_name: string;
  tone: string;
  welcome_message: string;
  handoff_rule: string;
  business_hours: string;

  pix_key: string | null;
  calendar_link: string | null;

  prompt_override: string | null;
  is_enabled: boolean;

  created_at: string;
  updated_at: string;
};

const ORG_ID_DEV = "00000000-0000-0000-0000-000000000001";

export default function Page() {
  const [orgId, setOrgId] = useState(ORG_ID_DEV);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string>("");

  const [settings, setSettings] = useState<BotSettings | null>(null);

  // campos editáveis
  const [isEnabled, setIsEnabled] = useState(true);
  const [botName, setBotName] = useState("Atendimento");
  const [tone, setTone] = useState("humano, direto e educado");
  const [welcomeMessage, setWelcomeMessage] = useState("Olá! Como posso ajudar?");
  const [handoffRule, setHandoffRule] = useState("Se o cliente pedir humano, transferir.");
  const [businessHours, setBusinessHours] = useState("Seg–Sex 09:00–18:00");
  const [pixKey, setPixKey] = useState("");
  const [calendarLink, setCalendarLink] = useState("");
  const [promptOverride, setPromptOverride] = useState("");

  async function load() {
    setMsg("");
    setLoading(true);

    const { data, error } = await supabase
      .from("bot_settings")
      .select("*")
      .eq("org_id", orgId)
      .is("client_id", null)
      .order("created_at", { ascending: false })
      .limit(1);

    if (error) {
      setLoading(false);
      setMsg(error.message);
      return;
    }

    // se não existir config, cria uma padrão
    if (!data || data.length === 0) {
      const { data: created, error: e2 } = await supabase
        .from("bot_settings")
        .insert({
          org_id: orgId,
          client_id: null,
          bot_name: "Atendimento",
          tone: "humano, direto e educado",
          welcome_message: "Olá! Como posso ajudar?",
          handoff_rule: "Se o cliente pedir humano, transferir.",
          business_hours: "Seg–Sex 09:00–18:00",
          pix_key: null,
          calendar_link: null,
          prompt_override: null,
          is_enabled: true,
        })
        .select("*")
        .single();

      setLoading(false);

      if (e2) {
        setMsg(e2.message);
        return;
      }

      applyToForm(created as BotSettings);
      setSettings(created as BotSettings);
      return;
    }

    const row = data[0] as BotSettings;
    applyToForm(row);
    setSettings(row);
    setLoading(false);
  }

  function applyToForm(row: BotSettings) {
    setIsEnabled(row.is_enabled);
    setBotName(row.bot_name ?? "");
    setTone(row.tone ?? "");
    setWelcomeMessage(row.welcome_message ?? "");
    setHandoffRule(row.handoff_rule ?? "");
    setBusinessHours(row.business_hours ?? "");
    setPixKey(row.pix_key ?? "");
    setCalendarLink(row.calendar_link ?? "");
    setPromptOverride(row.prompt_override ?? "");
  }

  async function save() {
    if (!settings?.id) return;
    setSaving(true);
    setMsg("");

    const payload = {
      bot_name: botName.trim(),
      tone: tone.trim(),
      welcome_message: welcomeMessage.trim(),
      handoff_rule: handoffRule.trim(),
      business_hours: businessHours.trim(),
      pix_key: pixKey.trim() ? pixKey.trim() : null,
      calendar_link: calendarLink.trim() ? calendarLink.trim() : null,
      prompt_override: promptOverride.trim() ? promptOverride.trim() : null,
      is_enabled: isEnabled,
    };

    const { error } = await supabase
      .from("bot_settings")
      .update(payload)
      .eq("id", settings.id);

    setSaving(false);

    if (error) {
      setMsg(error.message);
      return;
    }

    setMsg("Salvo com sucesso ✅");
    await load();
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 12 }}>
        <div>
          <h1 style={{ margin: 0 }}>Bot</h1>
          <div style={{ opacity: 0.7 }}>Configuração do atendimento e IA</div>
        </div>

        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <label style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 800 }}>
            <input
              type="checkbox"
              checked={isEnabled}
              onChange={(e) => setIsEnabled(e.target.checked)}
            />
            Ativo
          </label>

         <button onClick={() => console.log("CLICOU")} style={{ padding: 20, fontSize: 20 }}>
  TESTE CLIQUE AQUI
</button>
  }}
  disabled={saving}
  style={btnPrimary}
>
  {saving ? "Salvando..." : "Salvar"}
</button>
        </div>
      </div>

      <div style={panel}>
        <div style={{ display: "grid", gap: 10 }}>
          <label style={labelStyle}>
            <span style={labelTitle}>Org ID (dev)</span>
            <input
              value={orgId}
              onChange={(e) => setOrgId(e.target.value)}
              style={inputStyle}
            />
            <span style={{ fontSize: 12, opacity: 0.65 }}>
              Por enquanto fixo. Depois vira org real do login.
            </span>
          </label>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Field label="Nome do bot" value={botName} setValue={setBotName} />
            <Field label="Horário de atendimento" value={businessHours} setValue={setBusinessHours} />
          </div>

          <Field label="Tom de voz" value={tone} setValue={setTone} />
          <Field label="Mensagem de boas-vindas" value={welcomeMessage} setValue={setWelcomeMessage} />
          <Field label="Regra de transferência (humano)" value={handoffRule} setValue={setHandoffRule} />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Field label="Chave Pix (opcional)" value={pixKey} setValue={setPixKey} />
            <Field label="Link de agenda (opcional)" value={calendarLink} setValue={setCalendarLink} />
          </div>

          <label style={labelStyle}>
            <span style={labelTitle}>Prompt do cliente (opcional)</span>
            <textarea
              value={promptOverride}
              onChange={(e) => setPromptOverride(e.target.value)}
              placeholder="Cole aqui o prompt que o seu cliente quer usar no atendimento..."
              style={{ ...inputStyle, minHeight: 120, resize: "vertical" }}
            />
          </label>
        </div>
      </div>

      <div style={{ display: "grid", gap: 10 }}>
        <div style={panel}>
          <div style={{ fontWeight: 900, marginBottom: 6 }}>Status</div>
          <div style={{ fontSize: 12, opacity: 0.75 }}>
            {loading ? "Carregando..." : settings ? Config carregada: ${settings.id} : "Sem config"}
          </div>
        </div>

        {msg ? (
          <div style={{ ...panel, borderColor: msg.includes("✅") ? "rgba(34,197,94,0.35)" : "rgba(239,68,68,0.35)" }}>
            <div style={{ fontWeight: 900 }}>{msg}</div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  setValue,
}: {
  label: string;
  value: string;
  setValue: (v: string) => void;
}) {
  return (
    <label style={labelStyle}>
      <span style={labelTitle}>{label}</span>
      <input value={value} onChange={(e) => setValue(e.target.value)} style={inputStyle} />
    </label>
  );
}

const panel: React.CSSProperties = {
  background: "#fff",
  borderRadius: 16,
  padding: 16,
  border: "1px solid rgba(0,0,0,0.06)",
};

const btnPrimary: React.CSSProperties = {
  padding: "10px 14px",
  borderRadius: 14,
  border: "1px solid rgba(37,99,235,0.35)",
  background: "linear-gradient(180deg, rgba(37,99,235,0.12), rgba(124,58,237,0.10))",
  fontWeight: 900,
  cursor: "pointer",
};

const labelStyle: React.CSSProperties = {
  display: "grid",
  gap: 6,
};

const labelTitle: React.CSSProperties = {
  fontSize: 12,
  opacity: 0.7,
  fontWeight: 900,
};

const inputStyle: React.CSSProperties = {
  padding: 12,
  borderRadius: 14,
  border: "1px solid rgba(0,0,0,0.10)",
  outline: "none",
};
