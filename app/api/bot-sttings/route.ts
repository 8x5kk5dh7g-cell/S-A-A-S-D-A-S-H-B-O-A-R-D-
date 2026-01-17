import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  // se você NÃO tiver service role, deixa anon mesmo (vai funcionar se a tabela estiver UNRESTRICTED / sem RLS travando)
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET() {
  const { data, error } = await supabase
    .from("bot_configs")
    .select("data")
    .eq("id", 1)
    .maybeSingle();

  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, data: data?.data ?? {} });
}

export async function POST(req: Request) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    // IMPORTANTÍSSIMO: evita “Unexpected end…”
    return NextResponse.json({ ok: false, error: "Body JSON vazio ou inválido" }, { status: 400 });
  }

  const payload = {
    id: 1,
    data: body ?? {},
  };

  const { error } = await supabase
    .from("bot_configs")
    .upsert(payload, { onConflict: "id" });

  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}
