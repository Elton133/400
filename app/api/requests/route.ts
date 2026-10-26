import { contact } from "@/content/site";
import { FIELDS, missingFields } from "@/lib/request";

// POST /api/requests: the "Send us a request" form.
// Delivery: set REQUESTS_WEBHOOK_URL to any endpoint that accepts a JSON POST
// (Slack/Discord incoming webhook, Zapier, Make, your own inbox service).
// Without it, production answers 503 and tells the visitor to email instead,
// so nobody is told "received" for a message that went nowhere.

const MAX = 4000;

export async function POST(req: Request) {
  let raw: Record<string, unknown>;
  try {
    raw = await req.json();
  } catch {
    return Response.json({ error: "body must be JSON" }, { status: 400 });
  }

  // Honeypot: real people never fill this in.
  if (String(raw.website ?? "").trim()) return Response.json({ ok: true }, { status: 201 });

  const missing = missingFields(raw);
  if (missing.length) return Response.json({ error: "missing fields", missing }, { status: 400 });

  const body = Object.fromEntries(FIELDS.map((f) => [f.key, String(raw[f.key] ?? "").trim().slice(0, MAX)]));
  const hook = process.env.REQUESTS_WEBHOOK_URL;

  if (!hook) {
    if (process.env.NODE_ENV === "production") {
      return Response.json(
        { error: "inbox not connected yet", email: contact.email },
        { status: 503 },
      );
    }
    console.log("[400] new request (dev, not delivered):", body);
    return Response.json({ ok: true, dev: true }, { status: 201 });
  }

  const text = FIELDS.map((f) => `*${f.key}*: ${body[f.key] || "—"}`).join("\n");
  const res = await fetch(hook, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ text: `New request via 400 site\n${text}`, content: `New request via 400 site\n${text}`, request: body }),
  });
  if (!res.ok) return Response.json({ error: "delivery failed", email: contact.email }, { status: 502 });
  return Response.json({ ok: true }, { status: 201 });
}
