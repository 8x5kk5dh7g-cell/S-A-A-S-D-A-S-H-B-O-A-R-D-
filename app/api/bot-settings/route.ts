import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

const TABLE = "bot_configs";
const ID = 1;

export async function GET() {
  const { data, error } = await supabase
    .from(TABLE)
    .select("data")
    .eq("id", ID)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, data: data?.data ?? {} });
}

export async function POST(req: Request) {
  let body: any = null;
  try {
    body = await req.json();
  } catch {}

  if (!body || typeof body !== "object") {
    return NextResponse.json({ ok: false, error: "JSON inválido" }, { status: 400 });
  }

  const payload = {
    evolution_url: String(body.evolution_url ?? ""),
    n8n_webhook: String(body.n8n_webhook ?? ""),
    greeting: String(body.greeting ?? ""),
  };

  const { error } = await supabase
    .from(TABLE)
    .upsert(
      { id: ID, data: payload, updated_at: new Date().toISOString() },
      { onConflict: "id" }
    );

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
