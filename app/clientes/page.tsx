"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type ClientRow = {
  id: string;
  org_id: string;
  name: string;
  status: string;
  created_at: string;
};

export default function Page() {
  const [orgId, setOrgId] = useState("00000000-0000-0000-0000-000000000001");
  const [name, setName] = useState("");
  const [rows, setRows] = useState<ClientRow[]>([]);
  const [msg, setMsg] = useState("");

  async function load() {
    setMsg("");
    const { data, error } = await supabase
      .from("clients")
      .select("*")
      .eq("org_id", orgId)
      .order("created_at", { ascending: false });

    if (error) return setMsg(error.message);
    setRows((data ?? []) as ClientRow[]);
  }

  async function createClient() {
    setMsg("");
    if (!name.trim()) return;
    const { error } = await supabase.from("clients").insert({
      org_id: orgId,
      name: name.trim(),
      status: "ativo",
    });
    if (error) return setMsg(error.message);
    setName("");
    await load();
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orgId]);

  return (
    <div style={{ display: "grid", gap: 14 }}>
      <div>
        <h1 style={{ margin: 0 }}>Clientes</h1>
        <p style={{ margin: "6px 0 0", opacity: 0.75 }}>
          Primeiro CRUD real no Supabase (modo dev).
        </p>
      </div>

      <div style={{ display: "grid", gap: 10, padding: 12, border: "1px solid rgba(0,0,0,0.06)", borderRadius: 16 }}>
        <label style={{ fontSize: 12, opacity: 0.75 }}>
          Org ID (por enquanto fixo)
        </label>
        <input
          value={orgId}
          onChange={(e) => setOrgId(e.target.value)}
          style={{ padding: 10, borderRadius: 12, border: "1px solid rgba(0,0,0,0.10)" }}
        />

        <div style={{ display: "flex", gap: 10 }}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nome do cliente"
            style={{ flex: 1, padding: 10, borderRadius: 12, border: "1px solid rgba(0,0,0,0.10)" }}
          />
          <button
            onClick={createClient}
            style={{ padding: "10px 14px", borderRadius: 12, border: "1px solid rgba(0,0,0,0.10)", fontWeight: 800 }}
          >
            Criar
          </button>
        </div>

        {msg ? <div style={{ color: "#b91c1c", fontWeight: 700 }}>{msg}</div> : null}
      </div>

      <div style={{ display: "grid", gap: 8 }}>
        {rows.map((r) => (
          <div key={r.id} style={{ padding: 12, borderRadius: 16, border: "1px solid rgba(0,0,0,0.06)" }}>
            <div style={{ fontWeight: 900 }}>{r.name}</div>
            <div style={{ fontSize: 12, opacity: 0.75 }}>
              status: {r.status} • id: {r.id}
            </div>
          </div>
        ))}
        {!rows.length ? <div style={{ opacity: 0.6 }}>Nenhum cliente ainda.</div> : null}
      </div>
    </div>
  );
}
