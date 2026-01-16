export default function Page() {
  return (
    <div style={{ display: "grid", gap: 16 }}>
      <div>
        <h1 style={{ margin: 0 }}>Bot</h1>
        <div style={{ opacity: 0.7 }}>Atendimento e IA</div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 12 }}>
        <div style={panelStyle}>
          <h3 style={{ marginTop: 0 }}>Configuração do atendimento</h3>

          <div style={{ display: "grid", gap: 10 }}>
            <Field label="Nome do bot" placeholder="Ex: Laura" />
            <Field label="Empresa" placeholder="Ex: Sua Empresa" />
            <Field label="Tom de voz" placeholder="Ex: humano, direto, educado" />
            <Field label="Horário de atendimento" placeholder="Ex: Seg–Sex 09:00–18:00" />
            <Field label="Mensagem de boas-vindas" placeholder="Ex: Olá! Como posso ajudar?" />
          </div>

          <div style={{ marginTop: 12, display: "flex", gap: 10 }}>
            <button style={btnPrimary}>Salvar</button>
            <button style={btnGhost}>Testar</button>
          </div>
        </div>

        <div style={panelStyle}>
          <h3 style={{ marginTop: 0 }}>Checklist</h3>
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            <li>Conectar WhatsApp</li>
            <li>Definir regras e limites</li>
            <li>Transferência para humano</li>
            <li>Logs e auditoria</li>
          </ul>

          <div style={{ marginTop: 12 }}>
            <h3 style={{ marginTop: 0 }}>Status</h3>
            <div style={{ display: "grid", gap: 8 }}>
              <StatusLine label="WhatsApp" value="Não conectado" />
              <StatusLine label="Automação" value="Não conectada" />
              <StatusLine label="Base de dados" value="Não conectada" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <label style={{ display: "grid", gap: 6 }}>
      <div style={{ fontSize: 12, opacity: 0.7, fontWeight: 800 }}>{label}</div>
      <input
        placeholder={placeholder}
        style={{
          padding: 12,
          borderRadius: 14,
          border: "1px solid rgba(0,0,0,0.10)",
          outline: "none",
        }}
      />
    </label>
  );
}

function StatusLine({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
      <div style={{ fontWeight: 800 }}>{label}</div>
      <div style={{ opacity: 0.7 }}>{value}</div>
    </div>
  );
}

const panelStyle: React.CSSProperties = {
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

const btnGhost: React.CSSProperties = {
  padding: "10px 14px",
  borderRadius: 14,
  border: "1px solid rgba(0,0,0,0.10)",
  background: "rgba(0,0,0,0.02)",
  fontWeight: 900,
  cursor: "pointer",
};
