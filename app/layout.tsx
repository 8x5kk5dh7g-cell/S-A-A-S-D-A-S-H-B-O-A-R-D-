// app/layout.tsx
import "./globals.css";
import Link from "next/link";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body style={styles.body}>
        <aside style={styles.sidebar}>
          <div style={styles.brand}>
            <div style={styles.logo}>S</div>
            <div>
              <div style={{ fontWeight: 800, lineHeight: 1 }}>SaaS</div>
              <div style={{ fontSize: 12, opacity: 0.7 }}>Dashboard</div>
            </div>
          </div>

          <nav style={styles.nav}>
            <NavItem href="/" label="Visão Geral" icon="🏠" />
            <NavItem href="/clientes" label="Leads" icon="👥" />
            <NavItem href="/pipeline" label="Automação" icon="⚡" />
            <NavItem href="/settings" label="Configurações" icon="⚙️" />
            <NavItem href="/login" label="Login" icon="🔐" />
          </nav>

          <div style={styles.footer}>
            <div style={{ fontSize: 12, opacity: 0.7 }}>Status</div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <span style={styles.dot} />
              <span style={{ fontSize: 13 }}>Online</span>
            </div>
          </div>
        </aside>

        <main style={styles.main}>
          <div style={styles.topbar}>
            <div style={{ fontWeight: 700 }}>Visão Geral</div>
            <div style={{ display: "flex", gap: 8 }}>
              <button style={styles.btn}>Novo</button>
              <button style={{ ...styles.btn, background: "#111827", color: "#fff" }}>
                Conectar
              </button>
            </div>
          </div>

          <div style={styles.content}>{children}</div>
        </main>
      </body>
    </html>
  );
}

function NavItem({ href, label, icon }: { href: string; label: string; icon: string }) {
  return (
    <Link href={href} style={styles.navItem}>
      <span style={{ width: 22, display: "inline-flex", justifyContent: "center" }}>{icon}</span>
      <span>{label}</span>
    </Link>
  );
}

const styles: Record<string, React.CSSProperties> = {
  body: { margin: 0, display: "grid", gridTemplateColumns: "280px 1fr", minHeight: "100vh" },
  sidebar: {
    background: "#0b1220",
    color: "#e5e7eb",
    padding: 18,
    display: "grid",
    gridTemplateRows: "auto 1fr auto",
    gap: 18,
    borderRight: "1px solid rgba(255,255,255,0.08)",
  },
  brand: { display: "flex", gap: 12, alignItems: "center" },
  logo: {
    width: 38,
    height: 38,
    borderRadius: 12,
    background: "linear-gradient(135deg,#60a5fa,#a78bfa)",
    display: "grid",
    placeItems: "center",
    fontWeight: 900,
    color: "#0b1220",
  },
  nav: { display: "grid", gap: 8 },
  navItem: {
    textDecoration: "none",
    color: "inherit",
    padding: "10px 12px",
    borderRadius: 12,
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.06)",
    display: "flex",
    gap: 10,
    alignItems: "center",
  },
  footer: {
    padding: 12,
    borderRadius: 14,
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.06)",
    display: "grid",
    gap: 6,
  },
  dot: { width: 8, height: 8, borderRadius: 99, background: "#22c55e", display: "inline-block" },
  main: { background: "#f3f4f6", padding: 18 },
  topbar: {
    height: 54,
    background: "#fff",
    borderRadius: 16,
    border: "1px solid rgba(0,0,0,0.06)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 14px",
  },
  btn: {
    height: 36,
    padding: "0 12px",
    borderRadius: 12,
    border: "1px solid rgba(0,0,0,0.10)",
    background: "#fff",
    fontWeight: 700,
    cursor: "pointer",
  },
  content: { padding: "16px 2px" },
};
