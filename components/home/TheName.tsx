import { NameLedger } from "./NameLedger";

/** 04 / WHY "400". Quiet. Let it breathe. */
export function TheName() {
  return (
    <section className="section" aria-labelledby="name-title">
      <div className="wrap">
        <div className="grid gap-14 lg:grid-cols-[1fr_minmax(0,34rem)] lg:items-center lg:gap-24">
          <div>
            <p className="label">04 / Why &ldquo;400&rdquo;</p>
            <h2 id="name-title" className="display t-section mt-6">
              Why 400<span className="text-orange">?</span>
            </h2>
            <p className="sign mt-6 text-[clamp(2.5rem,4.5vw,3.75rem)] text-muted">everyone puts in a hundred.</p>
            <p className="lede mt-8 max-w-md text-fg/80">
              Four of us, 100 each. That&apos;s the whole story behind the name, and it&apos;s still the deal. There&apos;s
              no leader: whoever is closest to the problem takes the lead, and next time it&apos;s someone else.
            </p>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-muted">
              Elton renamed the chat on 5 September 2025, the first week of final year: Level 400. The logo came later:
              an interwoven 400, four vertical lines for the four of us, and <em>quadringenti</em>, Latin for 400, in
              quiet type underneath.
            </p>
          </div>
          <NameLedger />
        </div>

        <div className="mt-24 grid overflow-hidden rounded-2xl bg-ink text-paper md:mt-32 lg:grid-cols-[1.2fr_1fr]">
          <div className="p-8 sm:p-12">
            <p className="font-mono text-[11px] tracking-[0.16em] text-paper/50 uppercase">The other 400</p>
            <p className="display t-section mt-6">
              Other people see <span className="text-orange">400 Bad Request.</span> We see a brief.
            </p>
          </div>
          <div className="border-t border-paper/10 p-8 font-mono text-[13px] leading-relaxed sm:p-12 lg:border-t-0 lg:border-l">
            <p>
              <span className="text-paper/50">HTTP/1.1</span> <span className="text-orange">400 Bad Request</span>
            </p>
            <p className="text-paper/50">content-type: application/json</p>
            <p className="text-paper/50">x-crew: 4</p>
            <p className="mt-4 text-paper/80">{"{"}</p>
            <p className="pl-5">
              <span className="text-paper/50">&quot;error&quot;:</span> &quot;something&apos;s missing&quot;,
            </p>
            <p className="pl-5">
              <span className="text-paper/50">&quot;we_read_it_as&quot;:</span> &quot;tell us more&quot;
            </p>
            <p className="text-paper/80">{"}"}</p>
            <p className="mt-6 font-sans text-[14px] text-paper/50">
              The HTTP error every developer knows: the request was incomplete. For us, that&apos;s where the work
              starts.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
