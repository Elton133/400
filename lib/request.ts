// Shared by the form (instant feedback) and the API route (the real check).

export const FIELDS = [
  { key: "name", required: true, hint: "who's asking" },
  { key: "reply_to", required: true, hint: "email or WhatsApp number" },
  { key: "company", required: false, hint: "optional" },
  { key: "what_you_need", required: true, hint: "an app, a site, a fix, an idea…", long: true },
  { key: "budget_range", required: false, hint: "a range, or “let's talk”" },
  { key: "deadline", required: false, hint: "e.g. end of March" },
] as const;

export type FieldKey = (typeof FIELDS)[number]["key"];
export type RequestBody = Record<FieldKey, string>;

export function missingFields(body: Partial<Record<string, unknown>>): FieldKey[] {
  return FIELDS.filter((f) => f.required && !String(body[f.key] ?? "").trim()).map((f) => f.key);
}
