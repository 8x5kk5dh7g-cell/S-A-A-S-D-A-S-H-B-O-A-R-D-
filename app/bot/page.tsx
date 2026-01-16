export default function Page() {
  return (
    <div style={{ padding: 24, display: "grid", gap: 12 }}>
      <h1 style={{ margin: 0 }}>Bot de Atendimento</h1>

      <div style={{ border: "1px solid rgba(0,0,0,0.08)", borderRadius: 14, padding: 16 }}>
        <h3 style={{ marginTop: 0 }}>Status</h3>
        <p style={{ margin: 0, opacity: 0.75 }}>Ativo/Desativado (vamos ligar isso no Supabase depois)</p>
      </div>

      <div style={{ border: "1px solid rgba(0,0,0,0.08)", borderRadius: 14, padding: 16 }}>
        <h3 style={{ marginTop: 0 }}>Regras</h3>
        <ul style={{ margin: 0, paddingLeft: 18 }}>
          <li>Tom de voz</li>
          <li>Horário de atendimento</li>
          <li>Quando transferir pra humano</li>
          <li>Mensagens prontas</li>
        </ul>
      </div>

      <div style={{ border: "1px solid rgba(0,0,0,0.08)", borderRadius: 14, padding: 16 }}>
        <h3 style={{ marginTop: 0 }}>Integrações</h3>
        <p style={{ margin: 0, opacity: 0.75 }}>WhatsApp / n8n / Base de conhecimento</p>
      </div>
    </div>
  );
}
