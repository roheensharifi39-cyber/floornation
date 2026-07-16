import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, CheckCircle2, ImageUp, MessageCircle } from "lucide-react";
import { FurnitureBuilder } from "@/components/furniture";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Custom Furniture Dubai",
  description:
    "Shape a made-to-requirement furniture brief for your home, workplace or hospitality project in Dubai and across the UAE.",
  alternates: { canonical: "/custom-furniture" },
  openGraph: {
    title: "Custom Furniture Dubai | Floor Nation",
    description:
      "Share your space, design direction and inspiration to begin a custom furniture proposal with Floor Nation.",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=82",
        width: 1600,
        height: 1067,
        alt: "Tailored furniture in a warm contemporary living room",
      },
    ],
  },
};

export default function CustomFurniturePage() {
  return (
    <main id="main-content" className="bg-canvas">
      <section className="bg-ink relative min-h-[640px] overflow-hidden text-white sm:min-h-[700px] lg:min-h-[760px]">
        <Image
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2000&q=86"
          alt="Warm contemporary living room arranged with bespoke timber and upholstered furniture"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[60%_center]"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/10" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/50 to-transparent" />

        <div className="site-shell relative flex min-h-[640px] flex-col justify-end pb-9 pt-36 sm:min-h-[700px] sm:pb-12 lg:min-h-[760px] lg:pb-14">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-white/75">
              Floor Nation custom furniture
            </p>
            <h1 className="font-display mt-4 text-[clamp(3.25rem,7.2vw,6rem)] leading-[0.96] tracking-[-0.035em] text-balance">
              Your room is the starting point.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-white/78 sm:text-lg sm:leading-8">
              Have a picture or rough idea? That’s enough. Share a photo,
              screenshot, sketch, or floor plan and we’ll help turn it into a
              clear custom proposal—no fixed catalogue and no technical brief needed.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#quick-start"
                className="focus-ring bg-bronze hover:bg-bronze-dark inline-flex min-h-14 items-center justify-center gap-3 rounded-xl px-6 py-4 font-bold text-white transition-colors"
              >
                <ImageUp className="size-5" aria-hidden="true" />
                Upload a Picture or Idea
              </a>
              <a
                href={`${siteConfig.whatsapp}?text=${encodeURIComponent("Hello Floor Nation, I’d like to discuss a custom furniture project.")}`}
                target="_blank"
                rel="noreferrer"
                className="focus-ring inline-flex min-h-14 items-center justify-center gap-2 rounded-xl border border-white/45 px-6 py-4 font-bold text-white transition-colors hover:bg-white/10"
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                Talk to the team
              </a>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-3 border-t border-white/25 pt-5 text-sm text-white/70 sm:grid-cols-3 sm:gap-6">
            <p>Homes, offices & hospitality</p>
            <p>Outdoor and one-off pieces</p>
            <p>Custom proposal, not checkout</p>
          </div>
        </div>
      </section>

      <section id="quick-start" className="scroll-mt-28 bg-canvas py-12 sm:py-16 lg:py-20">
        <div className="site-shell soft-panel overflow-hidden bg-surface px-5 py-9 sm:px-9 sm:py-11 lg:px-12 lg:py-14">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p className="text-bronze-dark text-sm font-bold">Quick start</p>
              <h2 className="font-display text-ink mt-3 max-w-3xl text-[clamp(2.6rem,5vw,4.75rem)] leading-[1.02] tracking-[-0.025em]">
                Have a picture or rough idea? You’re ready.
              </h2>
            </div>
            <p className="text-muted max-w-xl text-base leading-8">
              Start with what you know. You can attach inspiration before review,
              skip optional details, and let our team guide measurements,
              materials, and finishes later.
            </p>
          </div>

          <ol className="border-line mt-9 grid border-y sm:grid-cols-3">
            {[
              "Upload a picture",
              "Tell us what you need",
              "Get a custom proposal",
            ].map((label, index) => (
              <li
                key={label}
                className={`flex min-h-20 items-center gap-3 py-4 font-bold text-ink sm:px-5 ${
                  index > 0 ? "border-t border-line sm:border-l sm:border-t-0" : ""
                }`}
              >
                <CheckCircle2 className="text-bronze size-5 shrink-0" aria-hidden="true" />
                {label}
              </li>
            ))}
          </ol>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#request-builder"
              className="link-arrow inline-flex min-h-14 items-center justify-center gap-3 rounded-xl bg-bronze px-6 py-4 font-bold text-white transition-colors hover:bg-bronze-dark"
            >
              Start My Furniture Request
              <ArrowRight className="size-5" aria-hidden="true" />
            </a>
            <a
              href={`${siteConfig.whatsapp}?text=${encodeURIComponent("Hello Floor Nation, I only have a picture or rough furniture idea and would like some guidance.")}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-14 items-center justify-center gap-3 rounded-xl border border-line bg-canvas px-6 py-4 font-bold text-ink transition-colors hover:border-bronze"
            >
              <MessageCircle className="size-5" aria-hidden="true" />
              Ask for Help on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <FurnitureBuilder />

      <section className="border-y border-line bg-surface py-16 sm:py-20 lg:py-28">
        <div className="site-shell">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <h2 className="font-display text-ink text-[clamp(2.6rem,5.5vw,5rem)] leading-[0.98] tracking-[-0.03em] lg:col-span-7">
              Start from the requirement, not the inventory.
            </h2>
            <p className="text-muted max-w-2xl text-base leading-7 sm:text-lg sm:leading-8 lg:col-span-4 lg:col-start-9">
              Every inquiry is reviewed by the Floor Nation team. We clarify the
              brief, assess sourcing or creation options, and prepare a proposal
              shaped around the project.
            </p>
          </div>

          <div className="border-line mt-12 grid border-y sm:grid-cols-3 lg:mt-16">
            <div className="border-line py-7 sm:pr-6">
              <p className="text-bronze text-sm font-semibold">Bring any reference</p>
              <p className="text-muted mt-3 text-sm leading-6">
                Photos, screenshots, sketches, drawings, mood boards, PDFs and
                floor plans can guide something similar or, where materials and
                feasibility allow, a close interpretation of the reference.
              </p>
            </div>
            <div className="border-line border-t py-7 sm:border-l sm:border-t-0 sm:px-6">
              <p className="text-bronze text-sm font-semibold">Request almost anything</p>
              <p className="text-muted mt-3 text-sm leading-6">
                Individual pieces or full settings for residential, office,
                commercial, hospitality and outdoor environments.
              </p>
            </div>
            <div className="border-line border-t py-7 sm:border-l sm:border-t-0 sm:pl-6">
              <p className="text-bronze text-sm font-semibold">Use themes as direction</p>
              <p className="text-muted mt-3 text-sm leading-6">
                Contemporary, classic, Japandi and other themes are inspiration
                cues—not fixed products, stock or inventory.
              </p>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
