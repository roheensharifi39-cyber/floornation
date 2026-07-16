import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ImageUp, MessageSquareText, Palette, Ruler, Sofa } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const requestSteps = [
  { label: "Choose your space", icon: Ruler },
  { label: "Select a furniture type", icon: Sofa },
  { label: "Pick a design direction", icon: Palette },
  { label: "Upload inspiration", icon: ImageUp },
  { label: "Receive a custom proposal", icon: MessageSquareText },
];

export function FurnitureFeature() {
  return (
    <section className="bg-surface py-6 sm:py-8 lg:py-12">
      <div className="site-shell grid overflow-hidden bg-ink lg:grid-cols-[1.05fr_0.95fr]">
        <Reveal className="relative min-h-[28rem] lg:min-h-[47rem]" amount={0.08}>
          <Image
            src="https://images.unsplash.com/photo-1532588213355-52317771cce6?auto=format&fit=crop&w=1500&q=86"
            alt="Made-to-measure timber sideboard with precisely aligned doors and natural grain"
            fill
            sizes="(max-width: 1023px) 100vw, 55vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-ink/12" />
          <div className="absolute bottom-5 left-5 max-w-[16rem] bg-canvas p-4 sm:bottom-8 sm:left-8">
            <p className="text-xs font-bold text-ink">Not fixed inventory.</p>
            <p className="mt-1 text-xs leading-5 text-muted">Every request begins with your space, dimensions, and references.</p>
          </div>
        </Reveal>

        <div className="flex flex-col justify-center px-5 py-14 text-white sm:px-10 lg:px-12 xl:px-16">
          <Reveal>
            <h2 className="font-display text-[clamp(2.7rem,5vw,4.6rem)] leading-[1.02] tracking-[-0.025em]">
              Designed Around <span className="text-bronze">Your Vision</span>
            </h2>
            <p className="mt-6 max-w-xl text-base leading-7 text-white/70">
              Share an inspiration image, choose a design direction, and tell us about your space. Our team will help source or create furniture tailored to your requirements.
            </p>
          </Reveal>

          <ol className="mt-10 border-t border-white/16">
            {requestSteps.map(({ label, icon: Icon }, index) => (
              <Reveal key={label} delay={index * 0.04}>
                <li className="flex min-h-14 items-center gap-4 border-b border-white/16 py-3 text-sm">
                  <span className="w-6 text-xs font-bold text-bronze-light">{String(index + 1).padStart(2, "0")}</span>
                  <Icon className="size-4 text-white/50" strokeWidth={1.7} aria-hidden="true" />
                  <span className="font-semibold text-white/88">{label}</span>
                </li>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={0.16}>
            <Link href="/custom-furniture" className="link-arrow mt-9 inline-flex min-h-13 items-center justify-center gap-3 bg-bronze px-6 py-3.5 font-bold text-white transition-colors hover:bg-bronze-dark sm:justify-start sm:self-start">
              Start Your Custom Request <ArrowRight className="size-5" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
