import { ArrowLeft, MessageCircle } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main
      id="main-content"
      className="flex min-h-[78svh] items-center bg-canvas px-5 py-32 text-ink sm:px-8 lg:px-12"
    >
      <div className="mx-auto w-full max-w-[90rem] border-y border-line py-16 sm:py-24">
        <p className="text-sm font-semibold text-bronze">Page not found</p>
        <h1 className="mt-5 max-w-4xl font-display text-[clamp(3rem,7vw,5.75rem)] leading-[0.96] tracking-[-0.035em] text-balance">
          Let’s get you back to the right surface.
        </h1>
        <p className="mt-7 max-w-xl text-lg leading-8 text-muted">
          This address may have moved. Return home to explore flooring, outdoor
          living, projects, and custom furniture—or speak with the team directly.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex min-h-12 items-center justify-center gap-3 bg-ink px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-bronze focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bronze"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            Return home
          </Link>
          <a
            href={siteConfig.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-12 items-center justify-center gap-3 border border-line px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-bronze hover:text-bronze focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bronze"
          >
            <MessageCircle aria-hidden="true" className="size-4" />
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </main>
  );
}
