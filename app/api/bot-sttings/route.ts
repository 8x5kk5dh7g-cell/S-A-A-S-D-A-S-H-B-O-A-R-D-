import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const DEFAULT_DATA = {
  nome: "Atendente",
  mensagemBoasVindas: "Oi! Como posso te ajudar?",
  evolutionUrl: "",
  n8nWebhookUrl: "",
};

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("bot_configs")
      .select("id,data")
      .eq("id", 1)
      .maybeSingle();

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
    }

    return NextResponse.json({
      ok: true,
      data: data?.data ?? DEFAULT_DATA,
    });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? "Erro" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const payload = {
      nome: String(body?.nome ?? "Atendente"),
      mensagemBoasVindas: String(body?.mensagemBoasVindas ?? ""),
      evolutionUrl: String(body?.evolutionUrl ?? ""),
      n8nWebhookUrl: String(body?.n8nWebhookUrl ?? ""),
    };

    const { data, error } = await supabase
      .from("bot_configs")
      .upsert(
        { id: 1, data: payload, updated_at: new Date().toISOString() },
        { onConflict: "id" }
      )
      .select("id,data")
      .single();

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
    }

    return NextResponse.json({ ok: true, data: data.data });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? "Erro" }, { status: 500 });
  }
}
