import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return res.status(200).json({ ok: true, route: "/api/send" });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  return res.status(200).json({ ok: true, received: req.body ?? null });
}
