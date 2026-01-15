export const metadata = { title: "SaaS Dashboard" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body style={{ margin: 0, fontFamily: "system-ui, Arial" }}>{children}</body>
    </html>
  );
}
