import type { Metadata } from "next";
import Sidebar from "./_components/Sidebar";

export const metadata: Metadata = {
  title: "SaaS Dashboard",
  description: "Dashboard do SaaS",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body style={styles.body}>
        <div style={styles.shell}>
          <aside style={styles.aside}>
            <div style={styles.brand}>
              <div style={styles.logo}>S</div>
              <div>
                <div style={styles.brandTitle}>SaaS</div>
                <div style={styles.brandSub}>Dashboard</div>
              </div>
            </div>

            <Sidebar />

            <div style={styles.footer}>
              <div style={styles.footerBox}>
                <div style={{ fontWeight: 700 }}>Status</div>
                <div style={{ fontSize: 12, opacity: 0.75 }}>
                  Deploy ok • Próximo: conectar n8n/Supabase
                </div>
              </div>
            </div>
          </aside>

          <main style={styles.main}>
            <div style={styles.topbar}>
              <div style={styles.searchFake}>Pesquisar…</div>
              <div style={styles.userPill}>Conta</div>
            </div>

            <div style={styles.content}>{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}

const styles: Record<string, React.CSSProperties> = {
  body: {
    margin: 0,
    fontFamily:
      'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, "Apple Color Emoji","Segoe UI Emoji"',
    background: "#F6F7FB",
    color: "#0B1220",
  },
  shell: {
    display: "grid",
    gridTemplateColumns: "280px 1fr",
    minHeight: "100vh",
  },
  aside: {
    padding: 16,
    borderRight: "1px solid rgba(0,0,0,0.06)",
    background: "linear-gradient(180deg, #FFFFFF 0%, #FAFBFF 100%)",
  },
  brand: {
    display: "flex",
    gap: 12,
    alignItems: "center",
    padding: 12,
    borderRadius: 16,
    border: "1px solid rgba(0,0,0,0.06)",
    background: "#fff",
    boxShadow: "0 10px 30px rgba(16,24,40,0.06)",
    marginBottom: 14,
  },
  logo: {
    width: 36,
    height: 36,
    borderRadius: 12,
    display: "grid",
    placeItems: "center",
    fontWeight: 900,
    background: "linear-gradient(135deg,#2563EB,#7C3AED)",
    color: "#fff",
  },
  brandTitle: { fontWeight: 900, lineHeight: 1.1 },
  brandSub: { fontSize: 12, opacity: 0.7, marginTop: 2 },

  footer: { marginTop: 14 },
  footerBox: {
    padding: 12,
    borderRadius: 16,
    border: "1px solid rgba(0,0,0,0.06)",
    background: "#fff",
  },

  main: { padding: 18 },
  topbar: {
    height: 54,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 16,
  },
  searchFake: {
    flex: 1,
    maxWidth: 520,
    height: 44,
    display: "flex",
    alignItems: "center",
    padding: "0 14px",
    borderRadius: 14,
    border: "1px solid rgba(0,0,0,0.06)",
    background: "#fff",
    color: "rgba(0,0,0,0.45)",
  },
  userPill: {
    height: 44,
    padding: "0 14px",
    borderRadius: 14,
    border: "1px solid rgba(0,0,0,0.06)",
    background: "#fff",
    display: "flex",
    alignItems: "center",
    fontWeight: 700,
  },
  content: {
    borderRadius: 18,
    border: "1px solid rgba(0,0,0,0.06)",
    background: "#fff",
    padding: 18,
    boxShadow: "0 16px 40px rgba(16,24,40,0.08)",
    minHeight: "calc(100vh - 54px - 18px - 18px - 16px)",
  },
};
