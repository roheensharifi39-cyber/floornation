import { ArrowRight, MessageCircle } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ConsultationTrigger } from "@/components/layout/ConsultationDrawer";
import { ProjectGallery } from "@/components/projects/project-gallery";
import { ProjectHero } from "@/components/projects/project-hero";
import { ProjectNavigation } from "@/components/projects/project-navigation";
import { getProjectBySlug, projects } from "@/data/projects";
import { siteConfig } from "@/lib/site";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found | Floor Nation",
    };
  }

  const title = project.title;

  return {
    title,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title,
      description: project.summary,
      type: "article",
      images: [
        {
          url: project.heroImage,
          alt: project.heroAlt,
        },
      ],
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const projectIndex = projects.findIndex((item) => item.slug === project.slug);
  const previousProject =
    projects[(projectIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(projectIndex + 1) % projects.length];
  const whatsappHref = `${siteConfig.whatsapp}?text=${encodeURIComponent(
    `Hello Floor Nation, I would like to discuss a project similar to ${project.title}.`,
  )}`;

  return (
    <main className="bg-canvas text-ink" id="main-content">
      <ProjectHero project={project} />

      <section className="px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
        <div className="mx-auto max-w-[90rem]">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-7">
              <p className="mb-5 text-sm font-semibold text-bronze">
                Project perspective
              </p>
              <h2 className="font-display text-[clamp(2.5rem,5vw,4.75rem)] leading-[1.02] tracking-[-0.03em] text-ink text-balance">
                {project.statement}
              </h2>
            </div>
            <div className="lg:col-span-4 lg:col-start-9 lg:pt-12">
              <p className="text-lg leading-8 text-muted">{project.summary}</p>
            </div>
          </div>

          <dl className="mt-16 grid grid-cols-2 border-y border-line sm:mt-24 sm:grid-cols-5">
            {project.facts.map((fact, index) => (
              <div
                className={`min-w-0 px-0 py-6 sm:px-5 sm:py-7 ${
                  index % 2 === 0 ? "pr-4" : "pl-4"
                } ${index > 1 ? "border-t border-line sm:border-t-0" : ""} ${
                  index > 0 ? "sm:border-l sm:border-line" : ""
                }`}
                key={fact.label}
              >
                <dt className="text-xs font-medium uppercase tracking-[0.08em] text-muted">
                  {fact.label}
                </dt>
                <dd className="mt-2 text-base font-semibold leading-6 text-ink">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-surface px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
        <div className="mx-auto grid max-w-[90rem] grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-8">
          <article className="lg:col-span-5">
            <h2 className="border-b border-line pb-6 font-display text-4xl leading-none tracking-[-0.025em] text-ink sm:text-5xl">
              The challenge
            </h2>
            <div className="mt-7 space-y-5 text-base leading-7 text-muted">
              {project.challenge.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </article>

          <article className="lg:col-span-6 lg:col-start-7 lg:mt-24">
            <h2 className="border-b border-line pb-6 font-display text-4xl leading-none tracking-[-0.025em] text-ink sm:text-5xl">
              Floor Nation&apos;s response
            </h2>
            <div className="mt-7 space-y-5 text-base leading-7 text-muted">
              {project.solution.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </article>
        </div>
      </section>

      <ProjectGallery
        images={project.gallery}
        projectTitle={project.title}
      />

      <section className="bg-ink px-5 py-20 text-canvas sm:px-8 sm:py-28 lg:px-12 lg:py-36">
        <div className="mx-auto grid max-w-[90rem] grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <h2 className="font-display text-[clamp(2.6rem,5vw,4.75rem)] leading-[0.98] tracking-[-0.03em] text-white text-balance">
              A system designed as carefully as the surface.
            </h2>
            <p className="mt-6 max-w-sm text-sm leading-6 text-canvas/65">
              Three coordinated materials form the core specification for this
              project.
            </p>
          </div>
          <ol className="border-t border-white/15 lg:col-span-7 lg:col-start-6">
            {project.materials.map((material) => (
              <li
                className="grid grid-cols-1 gap-3 border-b border-white/15 py-7 sm:grid-cols-[0.85fr_1.15fr] sm:items-start sm:gap-6"
                key={material.name}
              >
                <h3 className="font-display text-2xl leading-tight text-white sm:text-3xl">
                  {material.name}
                </h3>
                <p className="text-sm leading-6 text-canvas/70 sm:pt-1">
                  {material.detail}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-surface px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-[90rem] grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="font-display text-[clamp(2.5rem,5vw,4.6rem)] leading-none tracking-[-0.03em] text-ink">
              Related services
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-6 text-muted">
              Explore the capabilities connected to this project’s material and
              delivery approach.
            </p>
          </div>
          <div className="border-t border-line lg:col-span-7 lg:col-start-6">
            {project.relatedServices.map((service) => (
              <article
                key={service.href}
                className="grid gap-5 border-b border-line py-7 sm:grid-cols-[1fr_auto] sm:items-end"
              >
                <div>
                  <h3 className="font-display text-3xl leading-tight text-ink sm:text-4xl">
                    {service.title}
                  </h3>
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
                    {service.description}
                  </p>
                </div>
                <Link
                  className="group inline-flex min-h-12 items-center gap-3 border-b border-ink py-3 text-sm font-semibold text-ink transition-colors hover:border-bronze hover:text-bronze focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bronze"
                  href={service.href}
                >
                  Explore service
                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-1"
                    strokeWidth={1.7}
                  />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-32">
        <div className="mx-auto grid max-w-[90rem] grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <h2 className="font-display text-[clamp(3rem,6.5vw,5.5rem)] leading-[0.96] tracking-[-0.035em] text-ink text-balance">
              Have a space with similar demands?
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
              Share the property, intended use, and finish you have in mind. Our
              team can help define the right material and delivery approach.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:flex-col lg:items-stretch">
            <Link
              className="inline-flex min-h-14 items-center justify-center gap-3 rounded-xl bg-bronze px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-bronze-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bronze"
              href="/custom-furniture#quick-start"
            >
              Custom Furniture Inquiry
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
            <ConsultationTrigger
              className="inline-flex min-h-13 items-center justify-center gap-3 rounded-xl bg-ink px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-bronze focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bronze"
            >
              Request something similar
              <ArrowRight aria-hidden="true" className="size-4" />
            </ConsultationTrigger>
            <a
              className="inline-flex min-h-13 items-center justify-center gap-3 rounded-xl border border-line px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-bronze hover:text-bronze focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bronze"
              href={whatsappHref}
              rel="noreferrer"
              target="_blank"
            >
              <MessageCircle aria-hidden="true" className="size-4" />
              Continue on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <ProjectNavigation next={nextProject} previous={previousProject} />
    </main>
  );
}
