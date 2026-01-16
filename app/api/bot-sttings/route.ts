import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function supabaseAdmin() {
  const url = process.env.SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  if (!url || !key) throw new Error("Faltou SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY na Vercel");
  return createClient(url, key);
}

export async function GET() {
  try {
    const supabase = supabaseAdmin();
    const { data, error } = await supabase
      .from("bot_settings")
      .select("data")
      .eq("id", 1)
      .single();

    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
    return NextResponse.json({ ok: true, data: data?.data ?? {} });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? "Erro" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const supabase = supabaseAdmin();

    const { error } = await supabase
      .from("bot_settings")
      .upsert({ id: 1, data: body, updated_at: new Date().toISOString() }, { onConflict: "id" });

    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? "Erro" }, { status: 500 });
  }
}
