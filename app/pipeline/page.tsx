export default function Page() {
  const cols = [
    { title: "Novo", items: ["Lead 001", "Lead 002"] },
    { title: "Em contato", items: ["Lead 010"] },
    { title: "Proposta", items: ["Lead 021"] },
    { title: "Fechado", items: ["Lead 030"] },
  ];

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <h1 style={{ margin: 0 }}>Funil</h1>

      <div style={panel}>
        <div style={{ fontSize: 12, opacity: 0.7, marginBottom: 12 }}>
          Visual por etapas. Depois a gente coloca drag & drop e regras.
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
          {cols.map((c) => (
            <div key={c.title} style={col}>
              <div style={{ fontWeight: 800, marginBottom: 10 }}>{c.title}</div>
              <div style={{ display: "grid", gap: 8 }}>
                {c.items.map((x) => (
                  <div key={x} style={card}>{x}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const panel: React.CSSProperties = {
  background: "#fff",
  borderRadius: 14,
  padding: 16,
  border: "1px solid rgba(0,0,0,0.06)",
};

const col: React.CSSProperties = {
  background: "rgba(0,0,0,0.02)",
  border: "1px solid rgba(0,0,0,0.06)",
  borderRadius: 14,
  padding: 12,
  minHeight: 220,
};

const card: React.CSSProperties = {
  background: "#fff",
  border: "1px solid rgba(0,0,0,0.06)",
  borderRadius: 12,
  padding: 10,
  fontWeight: 700,
};
