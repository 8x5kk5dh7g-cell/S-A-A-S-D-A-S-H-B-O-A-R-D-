export default function Page() {
  return (
    <div style={{ display: "grid", gap: 16 }}>
      <h1 style={{ margin: 0 }}>Clientes</h1>

      <div style={panel}>
        <div style={{ fontWeight: 800, marginBottom: 8 }}>Lista de clientes</div>
        <div style={{ fontSize: 12, opacity: 0.7, marginBottom: 12 }}>
          Aqui vai entrar busca, status, responsável e histórico.
        </div>

        <table style={table}>
          <thead>
            <tr>
              <th style={th}>Cliente</th>
              <th style={th}>Status</th>
              <th style={th}>Último contato</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Cliente Exemplo A", "Ativo", "Hoje"],
              ["Cliente Exemplo B", "Em negociação", "Ontem"],
              ["Cliente Exemplo C", "Pausado", "7 dias"],
            ].map((r, i) => (
              <tr key={i}>
                <td style={td}>{r[0]}</td>
                <td style={td}>{r[1]}</td>
                <td style={td}>{r[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
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

const table: React.CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
};

const th: React.CSSProperties = {
  textAlign: "left",
  fontSize: 12,
  opacity: 0.7,
  padding: "10px 8px",
  borderBottom: "1px solid rgba(0,0,0,0.06)",
};

const td: React.CSSProperties = {
  padding: "10px 8px",
  borderBottom: "1px solid rgba(0,0,0,0.06)",
};
