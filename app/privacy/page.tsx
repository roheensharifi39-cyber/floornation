import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Privacy information for the Floor Nation website presentation demo.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <main id="main-content" className="min-h-[70vh] bg-canvas pb-24 pt-36">
      <article className="site-shell max-w-3xl">
        <Link href="/" className="link-arrow inline-flex items-center gap-2 text-sm font-bold text-muted hover:text-bronze">
          <ArrowLeft className="size-4" /> Back to home
        </Link>
        <h1 className="mt-10 font-display text-5xl leading-tight text-ink sm:text-6xl">Privacy</h1>
        <div className="mt-8 space-y-7 text-base leading-8 text-muted">
          <p>
            This website is a design presentation demo. Forms in this demo do not transmit information to a live Floor Nation backend or permanently store personal data.
          </p>
          <section>
            <h2 className="font-display text-2xl text-ink">Direct contact</h2>
            <p className="mt-2">
              Choosing a telephone, email, or WhatsApp link opens the relevant external service. Information you share there is handled by that service and the recipient according to their own policies.
            </p>
          </section>
          <section>
            <h2 className="font-display text-2xl text-ink">Production note</h2>
            <p className="mt-2">
              A production launch should replace this notice with the company&apos;s approved policy covering analytics, cookies, enquiry handling, retention, and data-subject requests.
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
