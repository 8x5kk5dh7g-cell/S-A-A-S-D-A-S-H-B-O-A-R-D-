import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

// Tabela onde você salvou as configs do bot (a mesma do bot-settings)
const TABLE = "bot_configs";
const ID = 1;

export async function GET() {
  return NextResponse.json({ ok: true, route: "/api/send" });
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ ok: false, error: "JSON inválido" }, { status: 400 });
    }

    // Busca o n8n_webhook salvo no Supabase (bot-settings)
    const { data, error } = await supabase
      .from(TABLE)
      .select("data")
      .eq("id", ID)
      .maybeSingle();

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    const n8nWebhook = String((data?.data as any)?.n8n_webhook ?? "");
    if (!n8nWebhook.startsWith("http")) {
      return NextResponse.json(
        { ok: false, error: "n8n_webhook não configurado no Bot Settings" },
        { status: 400 }
      );
    }

    // Envia pro n8n (production URL)
    const res = await fetch(n8nWebhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const text = await res.text().catch(() => "");
    return NextResponse.json({
      ok: res.ok,
      status: res.status,
      n8n_response: text ? safeJson(text) : null,
    });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? "Erro" }, { status: 500 });
  }
}

function safeJson(text: string) {
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}
