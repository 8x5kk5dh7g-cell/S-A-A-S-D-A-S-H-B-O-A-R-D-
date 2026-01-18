import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

const TABLE = "bot_configs";

// use UUID (você já apanhou disso)
const ID = "00000000-0000-0000-0000-000000000001";

export async function GET() {
  // só pra você testar no navegador sem 404
  return NextResponse.json({ ok: true, route: "/api/send (use POST)" });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const phone = String(body?.phone ?? body?.to ?? "");
    const text = String(body?.text ?? body?.message ?? "");

    if (!phone || !text) {
      return NextResponse.json(
        { ok: false, error: "Campos obrigatórios: phone e text" },
        { status: 400 }
      );
    }

    // Busca config salva no Supabase
    const { data, error } = await supabase
      .from(TABLE)
      .select("data")
      .eq("id", ID)
      .maybeSingle();

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    const cfg = (data?.data ?? {}) as any;
    const n8nWebhook = String(cfg.n8n_webhook ?? "");

    if (!n8nWebhook.startsWith("http")) {
      return NextResponse.json(
        { ok: false, error: "n8n_webhook não configurado no painel do SaaS" },
        { status: 400 }
      );
    }

    // Dispara pro n8n
    const r = await fetch(n8nWebhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, text }),
    });

    const respText = await r.text().catch(() => "");
    if (!r.ok) {
      return NextResponse.json(
        { ok: false, error: n8n respondeu ${r.status}, details: respText },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message ?? "Erro inesperado" },
      { status: 500 }
    );
  }
}
