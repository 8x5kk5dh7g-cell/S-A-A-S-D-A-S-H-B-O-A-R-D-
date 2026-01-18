import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// ajuste se sua tabela/coluna forem outras:
const TABLE = "bot_configs";
const ID = "00000000-0000-0000-0000-000000000001";

export async function POST(req: Request) {
  const payload = await req.json().catch(() => null);
  if (!payload) return NextResponse.json({ ok: false, error: "JSON inválido" }, { status: 400 });

  const { data, error } = await supabase
    .from(TABLE)
    .select("data")
    .eq("id", ID)
    .maybeSingle();

  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });

  const webhook = String((data as any)?.data?.n8n_webhook ?? "");
  if (!webhook) return NextResponse.json({ ok: false, error: "n8n_webhook vazio" }, { status: 400 });

  const r = await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const text = await r.text();
  return NextResponse.json({ ok: r.ok, status: r.status, n8n: text });
}
