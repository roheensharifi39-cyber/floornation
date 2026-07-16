import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms information for the Floor Nation website presentation demo.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <main id="main-content" className="min-h-[70vh] bg-canvas pb-24 pt-36">
      <article className="site-shell max-w-3xl">
        <Link href="/" className="link-arrow inline-flex items-center gap-2 text-sm font-bold text-muted hover:text-bronze">
          <ArrowLeft className="size-4" /> Back to home
        </Link>
        <h1 className="mt-10 font-display text-5xl leading-tight text-ink sm:text-6xl">Terms</h1>
        <div className="mt-8 space-y-7 text-base leading-8 text-muted">
          <p>
            This website is a non-transactional presentation demo. Project imagery, case-study details, testimonials, reference numbers, budgets, and form success states are illustrative unless Floor Nation confirms them separately.
          </p>
          <section>
            <h2 className="font-display text-2xl text-ink">No automatic quotation</h2>
            <p className="mt-2">
              Selections made in the custom furniture builder do not create an order, confirmed scope, or binding quotation. Final specifications, availability, pricing, timelines, and installation requirements need direct review by the Floor Nation team.
            </p>
          </section>
          <section>
            <h2 className="font-display text-2xl text-ink">Production note</h2>
            <p className="mt-2">
              Before launch, this page should be replaced with terms reviewed and approved for the company&apos;s actual services and jurisdiction.
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
