import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const featuredServices = [
  {
    title: "Engineered Wood Flooring",
    copy: "Stable natural timber with a finish selected for the space.",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=84",
    alt: "Light-filled room with wide engineered oak boards",
    href: "/services?service=engineered-wood-flooring",
    layout: "md:col-span-7 md:row-span-2",
  },
  {
    title: "Parquet Flooring",
    copy: "Measured patterns, clean borders, and carefully balanced tones.",
    image: "https://images.unsplash.com/photo-1598718544285-7180f670198b?auto=format&fit=crop&w=1100&q=84",
    alt: "Living room composed over patterned parquet timber flooring",
    href: "/services?service=parquet-flooring",
    layout: "md:col-span-5",
  },
  {
    title: "SPC Flooring",
    copy: "Resilient everyday surfaces with a refined timber character.",
    image: "https://images.unsplash.com/photo-1560185008-b033106af5c3?auto=format&fit=crop&w=1100&q=84",
    alt: "Contemporary residential interior with durable wood-look flooring",
    href: "/services?service=spc-flooring",
    layout: "md:col-span-5",
  },
  {
    title: "Luxury Vinyl Flooring",
    copy: "Practical commercial performance without visual compromise.",
    image: "https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=1100&q=84",
    alt: "Modern commercial interior with clean resilient flooring",
    href: "/services?service=luxury-vinyl-flooring",
    layout: "md:col-span-4",
  },
  {
    title: "WPC Decking",
    copy: "Low-maintenance warmth detailed for climate and drainage.",
    image: "https://images.unsplash.com/photo-1623195372782-57a1486af9a9?auto=format&fit=crop&w=1100&q=84",
    alt: "Outdoor seating arranged on timber-toned WPC decking",
    href: "/services?service=wpc-decking",
    layout: "md:col-span-8",
  },
  {
    title: "Natural Timber Decking",
    copy: "Tactile outdoor flooring built around real timber character.",
    image: "https://images.unsplash.com/photo-1600376709132-33584c8ddb17?auto=format&fit=crop&w=1100&q=84",
    alt: "Natural timber deck beside outdoor furniture and planting",
    href: "/services?service=natural-timber-decking",
    layout: "md:col-span-6",
  },
  {
    title: "Pergolas, Gazebos & Fencing",
    copy: "Shade, privacy, and structure resolved as one outdoor language.",
    image: "https://images.unsplash.com/photo-1580469322701-45b34d5e6e9b?auto=format&fit=crop&w=1100&q=84",
    alt: "Architectural timber pergola sheltering an outdoor terrace",
    href: "/services?service=pergolas",
    layout: "md:col-span-6",
  },
];

export function FeaturedServices() {
  return (
    <section className="section-space bg-ink text-white">
      <div className="site-shell">
        <div className="grid gap-7 lg:grid-cols-[1fr_auto] lg:items-end">
          <Reveal>
            <SectionHeading title="Materials with a Point of View" inverse>
              <p>Selected for visual character, specified for the realities of how each space will be used.</p>
            </SectionHeading>
          </Reveal>
          <Reveal delay={0.08}>
            <Link href="/services" className="link-arrow inline-flex items-center gap-2 border-b border-white/45 pb-1 text-sm font-bold text-white hover:border-bronze-light hover:text-bronze-light">
              View all services <ArrowUpRight className="size-4" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-12 md:auto-rows-[16rem] lg:mt-20 lg:auto-rows-[18rem]">
          {featuredServices.map((service, index) => (
            <Reveal key={service.title} className={service.layout} delay={(index % 3) * 0.05} amount={0.08}>
              <Link href={service.href} className="image-zoom group relative block h-full min-h-[21rem] overflow-hidden md:min-h-0">
                <Image src={service.image} alt={service.alt} fill sizes="(max-width: 767px) 100vw, 60vw" className="object-cover" />
                <div className="absolute inset-0 bg-[linear-gradient(to_top,oklch(0.14_0.02_45/0.88),transparent_66%)]" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-6">
                  <div>
                    <h3 className="font-display text-2xl leading-tight text-white sm:text-[1.75rem]">{service.title}</h3>
                    <p className="mt-2 max-w-md text-xs leading-5 text-white/70 sm:text-sm">{service.copy}</p>
                  </div>
                  <span className="grid size-10 shrink-0 place-items-center border border-white/35 text-white transition-colors group-hover:border-bronze group-hover:bg-bronze">
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
