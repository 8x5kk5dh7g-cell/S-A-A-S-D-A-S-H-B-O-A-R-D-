import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  const { data, error } = await supabase
    .from("bot_configs")
    .select("data")
    .eq("id", 1)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, data: data?.data ?? {} });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const payload = {
      id: 1,
      data: {
        evolution_url: (body.evolution_url ?? "").trim(),
        n8n_webhook: (body.n8n_webhook ?? "").trim(),
      },
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("bot_configs")
      .upsert(payload, { onConflict: "id" })
      .select("data")
      .single();

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, data: data.data });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message ?? "Erro desconhecido" },
      { status: 400 }
    );
  }
}
