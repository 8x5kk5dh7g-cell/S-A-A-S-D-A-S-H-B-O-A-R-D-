import Link from "next/link";

export default function Page() {
  return (
    <div style={{ display: "grid", gap: 16, maxWidth: 420 }}>
      <h1 style={{ margin: 0 }}>Login</h1>

      <div style={panel}>
        <div style={{ display: "grid", gap: 10 }}>
          <Field label="E-mail" placeholder="voce@empresa.com" />
          <Field label="Senha" placeholder="••••••••" type="password" />

          <button style={button}>Entrar</button>

          <div style={{ fontSize: 12, opacity: 0.7 }}>
            Ainda não tem conta? <Link href="/settings">Configurar acesso</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <label style={{ display: "grid", gap: 6 }}>
      <span style={{ fontSize: 12, opacity: 0.7, fontWeight: 800 }}>{label}</span>
      <input
        type={type}
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

const button: React.CSSProperties = {
  padding: "10px 12px",
  borderRadius: 12,
  border: "1px solid rgba(0,0,0,0.10)",
  background: "linear-gradient(180deg, rgba(37,99,235,0.10), rgba(124,58,237,0.08))",
  fontWeight: 900,
  cursor: "pointer",
};
