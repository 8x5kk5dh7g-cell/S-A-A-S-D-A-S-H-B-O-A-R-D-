import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error("Missing SUPABASE envs (NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY)");
  }

  return createClient(url, key, {
    auth: { persistSession: false },
  });
}

// GET: só pra testar se rota está viva
export async function GET() {
  return NextResponse.json({ ok: true, route: "/api/bot-settings" });
}

// POST: salva configs no Supabase
export async function POST(req: Request) {
  const supabase = getSupabase();
  const body = await req.json().catch(() => ({}));

  // Ajuste pro nome real da sua tabela/colunas
  // Exemplo: tabela bot_configs com colunas: id (uuid), data (jsonb)
  const id = body?.id ?? "00000000-0000-0000-0000-000000000001";

  const { error } = await supabase
    .from("bot_configs")
    .upsert({ id, data: body }, { onConflict: "id" });

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
