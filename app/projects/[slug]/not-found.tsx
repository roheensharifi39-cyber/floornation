import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ProjectNotFound() {
  return (
    <main
      className="flex min-h-[75svh] items-center bg-canvas px-5 py-32 text-ink sm:px-8 lg:px-12"
      id="main-content"
    >
      <div className="mx-auto w-full max-w-[90rem] border-y border-line py-16 sm:py-24">
        <p className="text-sm font-semibold text-bronze">Project not found</p>
        <h1 className="mt-5 max-w-4xl font-display text-[clamp(3rem,7vw,5.75rem)] leading-[0.96] tracking-[-0.035em] text-balance">
          This case study is no longer at this address.
        </h1>
        <p className="mt-7 max-w-xl text-lg leading-8 text-muted">
          Return to the portfolio to explore current residential, commercial,
          flooring, decking, outdoor, and furniture work.
        </p>
        <Link
          className="mt-9 inline-flex min-h-12 items-center gap-3 bg-ink px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-bronze focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bronze"
          href="/projects"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          Browse all projects
        </Link>
      </div>
    </main>
  );
}
