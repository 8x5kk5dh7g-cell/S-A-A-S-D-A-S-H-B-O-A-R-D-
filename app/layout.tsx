import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "SaaS Dashboard",
};

const nav = [
  { href: "/", label: "Visão Geral" },
  { href: "/clientes", label: "Clientes" },
  { href: "/pipeline", label: "Pipeline" },
  { href: "/settings", label: "Settings" },
  { href: "/login", label: "Login" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body style={{ margin: 0, fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial" }}>
        <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", minHeight: "100vh" }}>
          {/* Sidebar */}
          <aside
            style={{
              borderRight: "1px solid rgba(0,0,0,0.08)",
              padding: 16,
              background: "#fff",
            }}
          >
            <div style={{ fontWeight: 900, fontSize: 18, marginBottom: 16 }}>SaaS</div>

            <nav style={{ display: "grid", gap: 8 }}>
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    textDecoration: "none",
                    color: "#111",
                    padding: "10px 12px",
                    borderRadius: 10,
                    border: "1px solid rgba(0,0,0,0.06)",
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div style={{ marginTop: 16, fontSize: 12, opacity: 0.7 }}>
              Próximo: Supabase + Auth
            </div>
          </aside>

          {/* Content */}
          <main style={{ padding: 24, background: "#f6f7f9" }}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
