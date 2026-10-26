import type { Metadata } from "next";
import { PageShell } from "@/components/chrome/PageShell";
import { PageHead } from "@/components/PageHead";
import { RequestForm } from "@/components/request/RequestForm";
import { contact } from "@/content/site";

export const metadata: Metadata = {
  title: "Send a request",
  description: "Tell 400 what you need. A human (one of four) will reply.",
};

export default function RequestPage() {
  return (
    <PageShell>
      <section className="pb-28" aria-labelledby="request-title">
        <div className="wrap">
          <PageHead kicker="Request" title={<>Send us a request<span className="text-orange">.</span></>} id="request-title">
            Fill in the body and press send. If something&apos;s missing you&apos;ll get a 400. We&apos;re 400; we notice
            these things. Prefer plain email?{" "}
            <a className="link" href={`mailto:${contact.email}`}>
              {contact.email}
            </a>
          </PageHead>
          <RequestForm />
        </div>
      </section>
    </PageShell>
  );
}
