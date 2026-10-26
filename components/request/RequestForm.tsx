"use client";

import { Mail01Icon, SentIcon, TickDouble02Icon, WhatsappIcon } from "@hugeicons/core-free-icons";
import { motion, MotionConfig } from "motion/react";
import { useState } from "react";
import { Icon } from "@/components/Icon";
import { contact } from "@/content/site";
import { FIELDS, type FieldKey, missingFields } from "@/lib/request";

type Result =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "bad"; missing: FieldKey[] }
  | { kind: "created" }
  | { kind: "error"; status: number; message: string };

const empty = Object.fromEntries(FIELDS.map((f) => [f.key, ""])) as Record<FieldKey, string>;

/** SEND US A REQUEST. The contact form is an API call. */
export function RequestForm() {
  const [values, setValues] = useState(empty);
  const [result, setResult] = useState<Result>({ kind: "idle" });
  const [shake, setShake] = useState(0);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const honeypot = (new FormData(e.currentTarget).get("website") as string) ?? "";
    const missing = missingFields(values);
    if (missing.length) {
      setResult({ kind: "bad", missing });
      setShake((n) => n + 1);
      document.getElementById(`f-${missing[0]}`)?.focus();
      return;
    }
    setResult({ kind: "sending" });
    try {
      const res = await fetch("/api/requests", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...values, website: honeypot }),
      });
      if (res.status === 201) {
        setResult({ kind: "created" });
        return;
      }
      const data = await res.json().catch(() => ({}));
      if (res.status === 400 && data.missing) {
        setResult({ kind: "bad", missing: data.missing });
        setShake((n) => n + 1);
      } else {
        setResult({ kind: "error", status: res.status, message: data.error ?? "something broke" });
      }
    } catch {
      setResult({ kind: "error", status: 0, message: "network error" });
    }
  }

  const bad = result.kind === "bad" ? result.missing : [];

  return (
    <MotionConfig reducedMotion="user">
      <div className="grid gap-6 lg:grid-cols-[1.25fr_1fr]">
        <form onSubmit={submit} noValidate className="relative overflow-hidden rounded-2xl border border-line bg-surface font-mono">
          <div className="flex flex-wrap items-center gap-3 border-b border-line px-5 py-4 text-[13px] sm:px-7">
            <span className="rounded-md bg-fg px-2 py-1 text-[11px] font-semibold tracking-wider text-bg">POST</span>
            <span>/400/requests</span>
            <span className="ml-auto text-[11px] text-muted">content-type: application/json</span>
          </div>
          <div className="p-5 text-[14px] sm:p-7">
            <p className="text-muted">{"{"}</p>
            <div className="flex flex-col gap-4 py-3 sm:pl-6">
              {FIELDS.map((f, i) => {
                const missing = bad.includes(f.key);
                const Input = "long" in f && f.long ? "textarea" : "input";
                return (
                  <div key={f.key} className="grid gap-1.5 sm:grid-cols-[15ch_1fr] sm:items-start sm:gap-3">
                    <label htmlFor={`f-${f.key}`} className={`pt-2 ${missing ? "text-orange-text" : "text-blue"}`}>
                      &quot;{f.key}&quot;:
                      {f.required && <span className="sr-only"> (required)</span>}
                    </label>
                    <div className="flex items-start gap-1">
                      <Input
                        id={`f-${f.key}`}
                        name={f.key}
                        value={values[f.key]}
                        onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
                        placeholder={f.hint}
                        required={f.required}
                        aria-invalid={missing || undefined}
                        rows={"long" in f && f.long ? 4 : undefined}
                        autoComplete={f.key === "name" ? "name" : f.key === "company" ? "organization" : "off"}
                        className={`min-h-12 w-full rounded-xl border bg-bg px-4 py-3 font-sans text-[16px] transition-colors placeholder:text-muted/70 focus:border-fg focus:outline-none ${
                          missing ? "border-orange" : "border-line"
                        }`}
                      />
                      <span className="pt-2 text-muted">{i < FIELDS.length - 1 ? "," : ""}</span>
                    </div>
                  </div>
                );
              })}
              <div aria-hidden className="absolute -left-[9999px]">
                <label>
                  website <input name="website" tabIndex={-1} autoComplete="off" />
                </label>
              </div>
            </div>
            <p className="text-muted">{"}"}</p>
          </div>
          <div className="border-t border-line p-5 sm:p-7">
            <button
              type="submit"
              disabled={result.kind === "sending"}
              className="flex w-full items-center justify-center gap-3 rounded-2xl bg-orange py-5 font-display text-2xl font-extrabold tracking-[-0.03em] text-ink shadow-[0_6px_0_#b33600] transition-all duration-75 active:translate-y-1.5 active:shadow-[0_0_0_#b33600] disabled:opacity-70 sm:text-3xl"
            >
              {result.kind === "sending" ? "Sending…" : "Send request"}
              <Icon icon={SentIcon} size={26} />
            </button>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-sans text-sm text-muted">
              <span>Not into the bit?</span>
              <a className="inline-flex items-center gap-1.5 hover:text-fg" href={`mailto:${contact.email}`}>
                <Icon icon={Mail01Icon} size={16} /> Just email us
              </a>
              {contact.whatsapp && (
                <a className="inline-flex items-center gap-1.5 hover:text-fg" href={`https://wa.me/${contact.whatsapp}`}>
                  <Icon icon={WhatsappIcon} size={16} /> WhatsApp
                </a>
              )}
            </div>
          </div>
        </form>

        <Response result={result} shake={shake} />
      </div>
    </MotionConfig>
  );
}

function Response({ result, shake }: { result: Result; shake: number }) {
  const tone =
    result.kind === "bad" || result.kind === "error"
      ? "border-orange"
      : result.kind === "created"
        ? "border-green"
        : "border-ink";

  return (
    <div
      key={result.kind === "bad" ? `bad-${shake}` : result.kind}
      className={`self-start rounded-2xl border bg-ink p-6 font-mono text-[13px] text-paper sm:p-7 lg:sticky lg:top-24 ${tone} ${result.kind === "bad" ? "shake" : ""}`}
      role="status"
      aria-live="polite"
    >
      <p className="mb-4 text-[11px] tracking-[0.16em] text-paper/40">RESPONSE</p>
      {result.kind === "idle" && <p className="text-paper/60">Waiting for your request…</p>}
      {result.kind === "sending" && (
        <p className="typing-dots text-paper/70">
          <span />
          <span />
          <span />
        </p>
      )}
      {result.kind === "bad" && (
        <>
          <p className="text-lg font-bold text-orange">400 BAD REQUEST</p>
          <p className="mt-2">
            you forgot {result.missing.map((m) => `"${m}"`).join(" and ")} · we&apos;re 400, we notice these things
          </p>
        </>
      )}
      {result.kind === "error" && (
        <>
          <p className="text-lg font-bold text-orange">{result.status || "ERR"} · {result.message}</p>
          <p className="mt-2">
            That one&apos;s on us. Email{" "}
            <a className="underline" href={`mailto:${contact.email}`}>
              {contact.email}
            </a>{" "}
            and a human will pick it up.
          </p>
        </>
      )}
      {result.kind === "created" && (
        <>
          <p className="text-lg font-bold text-green">201 CREATED</p>
          <p className="mt-2">request received · a human (one of four) will reply within {contact.replyWithin}</p>
          <Reply />
        </>
      )}
    </div>
  );
}

/** "seen" … typing … "chale, let's talk." */
function Reply() {
  return (
    <div className="mt-6 flex flex-col gap-2 font-chat">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex items-center justify-end gap-1.5 text-[11px] text-green"
      >
        seen <Icon icon={TickDouble02Icon} size={14} />
      </motion.p>
      <motion.p
          key="typing"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: [0, 1, 1, 0], y: 0 }}
          transition={{ delay: 0.9, duration: 1.4, times: [0, 0.1, 0.9, 1] }}
          className="typing-dots w-fit rounded-2xl rounded-bl-md bg-paper/10 px-3 py-2.5 text-[10px]"
        >
          <span />
          <span />
          <span />
        </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 8, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 2.3, type: "spring", stiffness: 500, damping: 26 }}
        className="w-fit rounded-2xl rounded-bl-md bg-paper/10 px-4 py-2.5 text-[16px]"
      >
        chale, let&apos;s talk.
      </motion.p>
    </div>
  );
}
