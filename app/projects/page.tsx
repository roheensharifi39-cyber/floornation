import type { Metadata } from "next";

import { ProjectCollection } from "@/components/projects/project-collection";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore selected Floor Nation flooring, decking, outdoor living, and custom furniture projects across Dubai and the UAE.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Selected Projects | Floor Nation Dubai",
    description:
      "Residential and commercial spaces shaped through considered materials, custom detailing, and professional installation.",
    images: [
      {
        url: projects[0].coverImage,
        alt: projects[0].coverAlt,
      },
    ],
  },
};

export default function ProjectsPage() {
  return (
    <main className="bg-canvas text-ink" id="main-content">
      <header className="bg-ink px-5 pb-20 pt-36 text-canvas sm:px-8 sm:pb-24 sm:pt-44 lg:px-12 lg:pb-32">
        <div className="mx-auto grid max-w-[90rem] grid-cols-1 gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="mb-6 text-sm font-medium text-bronze-light">
              Selected portfolio
            </p>
            <h1 className="max-w-5xl font-display text-[clamp(3.6rem,8vw,6rem)] leading-[0.94] tracking-[-0.035em] text-white text-balance">
              Crafted for remarkable spaces.
            </h1>
          </div>
          <div className="max-w-xl lg:col-span-4 lg:pb-2">
            <p className="text-base leading-7 text-canvas/80 sm:text-lg sm:leading-8">
              From precise parquet layouts to climate-ready terraces, each
              project begins with how the space needs to feel, perform, and
              endure.
            </p>
            <p className="mt-6 border-t border-white/15 pt-5 text-sm leading-6 text-canvas/65">
              Residential and commercial work across Dubai and the UAE
            </p>
          </div>
        </div>
      </header>

      <section
        aria-labelledby="portfolio-heading"
        className="px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36"
      >
        <div className="mx-auto max-w-[90rem]">
          <div className="mb-14 grid grid-cols-1 gap-7 border-b border-line pb-10 lg:mb-20 lg:grid-cols-12 lg:items-end lg:pb-12">
            <h2
              className="max-w-3xl font-display text-[clamp(2.5rem,5vw,4.75rem)] leading-[0.98] tracking-[-0.03em] text-ink text-balance lg:col-span-7"
              id="portfolio-heading"
            >
              Material decisions, made visible.
            </h2>
            <p className="max-w-xl text-base leading-7 text-muted lg:col-span-4 lg:col-start-9">
              Browse the portfolio by setting or craft. Every case study covers
              the brief, technical response, materials, and finished result.
            </p>
          </div>

          <ProjectCollection projects={projects} />
        </div>
      </section>
    </main>
  );
}
