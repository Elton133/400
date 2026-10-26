import { ArrowLeft02Icon } from "@hugeicons/core-free-icons";
import Link from "next/link";
import { Icon } from "@/components/Icon";

export default function NotFound() {
  return (
    <main id="main" className="pt-24 pb-32">
      <div className="wrap">
        <p className="label text-orange-text">404 Not found</p>
        <h1 className="display t-page mt-8">
          Close. We&apos;re <span className="text-orange">400</span>.
        </h1>
        <p className="lede mt-8 max-w-md text-fg/80">This page isn&apos;t in the chat. Probably never was.</p>
        <Link href="/" className="btn btn-secondary mt-10">
          <Icon icon={ArrowLeft02Icon} size={18} />
          Back to the thread
        </Link>
      </div>
    </main>
  );
}
