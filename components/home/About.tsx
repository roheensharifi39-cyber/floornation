import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const capabilities = [
  "Dubai-based residential and commercial team",
  "Material sourcing and technical guidance",
  "Professional supply and installation",
  "Custom support for non-standard project needs",
];

export function About() {
  return (
    <section id="about" className="section-space bg-surface">
      <div className="site-shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20">
        <Reveal className="relative">
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=1300&q=84"
              alt="Flooring specialist assessing the finish and grain of a timber surface"
              fill
              sizes="(max-width: 1023px) 100vw, 45vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-6 right-0 w-[74%] bg-bronze p-5 text-white sm:-right-6 sm:w-64 sm:p-6">
            <p className="font-display text-3xl">Established 2021</p>
            <p className="mt-1 text-xs leading-5 text-white/82">Built on approximately 20 years of combined industry experience.</p>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="pt-8 lg:pt-0">
          <h2 className="section-title">Where Quality Meets Craftsmanship</h2>
          <div className="mt-7 max-w-2xl space-y-5 text-base leading-7 text-muted">
            <p>
              Floor Nation Timber Trading Co. L.L.C. brings material knowledge, sourcing capability, and site execution together under one Dubai-based team.
            </p>
            <p>
              Formed in 2021, the company draws on approximately two decades of combined experience across indoor flooring, outdoor decking, customization, and professional installation. That depth helps clients move from an early design direction to a buildable, carefully finished result.
            </p>
          </div>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {capabilities.map((capability) => (
              <li key={capability} className="flex gap-3 text-sm leading-6 text-ink">
                <Check className="mt-1 size-4 shrink-0 text-bronze" strokeWidth={2.3} aria-hidden="true" />
                <span>{capability}</span>
              </li>
            ))}
          </ul>
          <Link href="/#contact" className="link-arrow mt-9 inline-flex items-center gap-2 border-b border-ink pb-1 text-sm font-bold text-ink hover:border-bronze hover:text-bronze">
            Discover Floor Nation <ArrowRight className="size-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
