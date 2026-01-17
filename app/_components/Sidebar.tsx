"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const items = [
  { href: "/", label: "Visão geral", desc: "KPIs e atividade" },
  { href: "/bot", label: "Bot", desc: "Atendimento e IA" },
  { href: "/clientes", label: "Clientes", desc: "Contas e histórico" },
  { href: "/pipeline", label: "Funil", desc: "Etapas e conversão" },
  { href: "/settings", label: "Configurações", desc: "Integrações e perfil" },
  { href: "/login", label: "Login", desc: "Acesso e segurança" },
];

export default function Sidebar() {
  const path = usePathname();

  return (
    <nav style={{ display: "grid", gap: 10 }}>
      <div style={sectionTitle}>Menu</div>

      <div style={{ display: "grid", gap: 8 }}>
        {items.map((it) => {
          const active = path === it.href;
          return (
            <Link key={it.href} href={it.href} style={{ textDecoration: "none" }}>
              <div style={{ ...item, ...(active ? itemActive : {}) }}>
                <div style={{ fontWeight: 800 }}>{it.label}</div>
                <div style={{ fontSize: 12, opacity: active ? 0.85 : 0.65 }}>
                  {it.desc}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

const sectionTitle: React.CSSProperties = {
  fontSize: 12,
  opacity: 0.6,
  fontWeight: 800,
  marginTop: 6,
  marginBottom: 4,
  textTransform: "uppercase",
  letterSpacing: 0.8,
};

const item: React.CSSProperties = {
  padding: 12,
  borderRadius: 16,
  border: "1px solid rgba(0,0,0,0.06)",
  background: "#fff",
};

const itemActive: React.CSSProperties = {
  border: "1px solid rgba(37,99,235,0.35)",
  boxShadow: "0 12px 30px rgba(37,99,235,0.12)",
  background:
    "linear-gradient(180deg, rgba(37,99,235,0.08), rgba(124,58,237,0.06))",
};
