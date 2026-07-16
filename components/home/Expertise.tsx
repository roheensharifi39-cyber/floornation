import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const pillars = [
  {
    title: "Interior Flooring",
    number: "01",
    description: "Natural timber, parquet, SPC, vinyl, and laminate specified around the space—not simply selected from a catalogue.",
    services: ["Engineered timber", "Parquet", "SPC & LVT"],
    href: "/services?category=indoor",
    image: "https://images.unsplash.com/photo-1585128792020-803d29415281?auto=format&fit=crop&w=1200&q=84",
    alt: "Minimal living room with rich natural timber flooring",
  },
  {
    title: "Outdoor Living",
    number: "02",
    description: "Decks, pergolas, gazebos, and fencing designed as durable architectural extensions of the property.",
    services: ["WPC decking", "Natural timber", "Shade structures"],
    href: "/services?category=outdoor",
    image: "https://images.unsplash.com/photo-1716904519810-349244919824?auto=format&fit=crop&w=1200&q=84",
    alt: "Outdoor timber deck with dining furniture and planted edges",
  },
  {
    title: "Custom Furniture",
    number: "03",
    description: "Furniture sourced or made around your references, dimensions, material preferences, and practical requirements.",
    services: ["Made to measure", "Material sourcing", "Full-room packages"],
    href: "/custom-furniture",
    image: "https://images.unsplash.com/photo-1591944173662-85fbc5a495a1?auto=format&fit=crop&w=1200&q=84",
    alt: "Crafted timber dining table and chairs in a refined interior",
  },
];

export function Expertise() {
  return (
    <section id="expertise" className="section-space bg-canvas">
      <div className="site-shell">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <Reveal>
            <SectionHeading title="Expertise Across Every Surface" />
          </Reveal>
          <Reveal delay={0.08}>
            <p className="max-w-2xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
              From the first sample to the final fitting, Floor Nation coordinates material sourcing, customization, supply, and professional installation as one considered scope.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-10 md:grid-cols-3 lg:mt-20 lg:gap-6 xl:gap-9">
          {pillars.map((pillar, index) => (
            <Reveal key={pillar.title} delay={index * 0.08}>
              <article className="group">
                <Link href={pillar.href} className="image-zoom focus-ring block overflow-hidden">
                  <div className={`relative overflow-hidden ${index === 1 ? "aspect-[4/5] md:mt-14" : "aspect-[4/5]"}`}>
                    <Image
                      src={pillar.image}
                      alt={pillar.alt}
                      fill
                      sizes="(max-width: 767px) 100vw, 33vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-ink/8 transition-colors duration-500 group-hover:bg-transparent" />
                    <span className="absolute left-4 top-4 grid size-10 place-items-center bg-canvas text-xs font-bold text-ink">
                      {pillar.number}
                    </span>
                  </div>
                </Link>
                <div className="mt-6">
                  <h3 className="font-display text-[2rem] leading-tight text-ink">{pillar.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted">{pillar.description}</p>
                  <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-xs font-semibold text-muted" aria-label={`${pillar.title} services`}>
                    {pillar.services.map((service) => (
                      <li key={service} className="before:mr-2 before:text-bronze before:content-['—']">{service}</li>
                    ))}
                  </ul>
                  <Link
                    href={pillar.href}
                    className="link-arrow mt-6 inline-flex items-center gap-2 border-b border-ink pb-1 text-sm font-bold text-ink transition-colors hover:border-bronze hover:text-bronze"
                  >
                    Explore {pillar.title.toLowerCase()}
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
