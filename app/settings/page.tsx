export default function Page() {
  return (
    <div style={{ display: "grid", gap: 16 }}>
      <h1 style={{ margin: 0 }}>Configurações</h1>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div style={panel}>
          <div style={{ fontWeight: 800, marginBottom: 8 }}>Perfil</div>
          <div style={{ display: "grid", gap: 10 }}>
            <Field label="Nome" placeholder="Seu nome" />
            <Field label="Empresa" placeholder="Sua empresa" />
          </div>
        </div>

        <div style={panel}>
          <div style={{ fontWeight: 800, marginBottom: 8 }}>Preferências</div>
          <div style={{ display: "grid", gap: 10 }}>
            <Field label="Idioma" placeholder="Português (Brasil)" />
            <Field label="Fuso horário" placeholder="America/Sao_Paulo" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <label style={{ display: "grid", gap: 6 }}>
      <span style={{ fontSize: 12, opacity: 0.7, fontWeight: 800 }}>{label}</span>
      <input
        placeholder={placeholder}
        style={{
          padding: "10px 12px",
          borderRadius: 12,
          border: "1px solid rgba(0,0,0,0.10)",
          outline: "none",
        }}
      />
    </label>
  );
}

const panel: React.CSSProperties = {
  background: "#fff",
  borderRadius: 14,
  padding: 16,
  border: "1px solid rgba(0,0,0,0.06)",
};
