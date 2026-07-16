import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

import type { Project } from "@/data/projects";

type ProjectNavigationProps = {
  readonly previous: Project;
  readonly next: Project;
};

export function ProjectNavigation({
  previous,
  next,
}: ProjectNavigationProps) {
  return (
    <nav aria-label="Browse adjacent projects" className="border-t border-line">
      <div className="mx-auto grid max-w-[90rem] grid-cols-1 sm:grid-cols-2">
        <Link
          className="group flex min-h-44 items-center gap-5 border-b border-line px-5 py-8 transition-colors hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-bronze sm:border-b-0 sm:border-r sm:px-8 lg:px-12"
          href={`/projects/${previous.slug}`}
        >
          <ArrowLeft
            aria-hidden="true"
            className="size-5 shrink-0 text-bronze transition-transform duration-300 ease-out group-hover:-translate-x-1"
            strokeWidth={1.5}
          />
          <span>
            <span className="block text-sm text-muted">Previous project</span>
            <span className="mt-2 block font-display text-2xl leading-tight text-ink sm:text-3xl">
              {previous.title}
            </span>
          </span>
        </Link>
        <Link
          className="group flex min-h-44 items-center justify-between gap-5 px-5 py-8 text-right transition-colors hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-bronze sm:px-8 lg:px-12"
          href={`/projects/${next.slug}`}
        >
          <span className="ml-auto">
            <span className="block text-sm text-muted">Next project</span>
            <span className="mt-2 block font-display text-2xl leading-tight text-ink sm:text-3xl">
              {next.title}
            </span>
          </span>
          <ArrowRight
            aria-hidden="true"
            className="size-5 shrink-0 text-bronze transition-transform duration-300 ease-out group-hover:translate-x-1"
            strokeWidth={1.5}
          />
        </Link>
      </div>
    </nav>
  );
}

