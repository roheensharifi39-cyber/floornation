import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { projects } from "@/data/projects";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const layouts = [
  "md:col-span-7 md:row-span-2",
  "md:col-span-5",
  "md:col-span-5",
  "md:col-span-5",
  "md:col-span-7",
];

export function FeaturedProjects() {
  return (
    <section className="section-space bg-canvas">
      <div className="site-shell">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.75fr] lg:items-end">
          <Reveal>
            <SectionHeading title="Crafted for Remarkable Spaces" />
          </Reveal>
          <Reveal delay={0.08}>
            <div className="lg:justify-self-end">
              <p className="max-w-xl text-muted">
                A growing collection of private homes, hospitality terraces, workplaces, and tailored interiors across Dubai.
              </p>
              <Link href="/projects" className="link-arrow mt-5 inline-flex items-center gap-2 border-b border-ink pb-1 text-sm font-bold text-ink hover:border-bronze hover:text-bronze">
                Explore the portfolio <ArrowRight className="size-4" />
              </Link>
            </div>
          </Reveal>
        </div>

        <div className="-mx-4 mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:grid-cols-12 md:auto-rows-[17rem] md:gap-x-5 md:gap-y-10 md:overflow-visible md:px-0 md:pb-0 lg:mt-20 lg:auto-rows-[19rem]">
          {projects.slice(0, 5).map((project, index) => (
            <Reveal
              key={project.slug}
              className={`w-[82vw] max-w-[22rem] shrink-0 snap-start md:w-auto md:max-w-none ${layouts[index]}`}
              delay={(index % 2) * 0.06}
              amount={0.08}
            >
              <article className="group h-full">
                <Link
                  href={`/projects/${project.slug}`}
                  className="image-zoom block h-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bronze"
                >
                  <div className="relative h-[22rem] overflow-hidden md:h-full">
                    <Image
                      src={project.coverImage}
                      alt={project.coverAlt}
                      fill
                      sizes="(max-width: 767px) 100vw, 60vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(to_top,oklch(0.14_0.02_45/0.78),transparent_68%)]" />
                    <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                      <div className="mb-2 flex flex-wrap items-center gap-3 text-[0.68rem] font-bold text-white/70">
                        <span className="inline-flex items-center gap-1.5"><MapPin className="size-3 text-bronze" />{project.location}</span>
                        <span aria-hidden="true">·</span>
                        <span>{project.category}</span>
                      </div>
                      <div className="flex items-end justify-between gap-4">
                        <div>
                          <h3 className="font-display text-2xl leading-tight text-white sm:text-3xl">{project.title}</h3>
                          <p className="mt-1 line-clamp-1 text-xs text-white/66">{project.material}</p>
                        </div>
                        <span className="grid size-10 shrink-0 place-items-center border border-white/35 text-white transition-colors group-hover:border-bronze group-hover:bg-bronze">
                          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
