import type { Metadata } from "next";
import Image from "next/image";
import { ArrowDown, MessageCircle } from "lucide-react";
import { FurnitureBuilder } from "@/components/furniture";

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
      <section className="bg-ink relative min-h-[680px] overflow-hidden text-white sm:min-h-[720px] lg:min-h-[780px]">
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

        <div className="site-shell relative flex min-h-[680px] flex-col justify-end pb-9 pt-36 sm:min-h-[720px] sm:pb-12 lg:min-h-[780px] lg:pb-14">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-white/75">
              Made-to-requirement furniture
            </p>
            <h1 className="font-display mt-4 text-[clamp(3.25rem,7.2vw,6rem)] leading-[0.96] tracking-[-0.035em] text-balance">
              Your room is the starting point.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-white/78 sm:text-lg sm:leading-8">
              Bring us a space, an approximate dimension or an image you saved.
              We’ll help source or create furniture around how it needs to look,
              feel and work.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#request-builder"
                className="focus-ring bg-bronze hover:bg-bronze-dark inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold text-white transition-colors"
              >
                Start your brief
                <ArrowDown className="size-4" aria-hidden="true" />
              </a>
              <a
                href="https://wa.me/971569178686?text=Hello%20Floor%20Nation%2C%20I%E2%80%99d%20like%20to%20discuss%20a%20custom%20furniture%20project."
                target="_blank"
                rel="noreferrer"
                className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/40 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                Talk to the team
              </a>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-3 border-t border-white/25 pt-5 text-sm text-white/70 sm:grid-cols-3 sm:gap-6">
            <p>One-off statement pieces</p>
            <p>Complete room schemes</p>
            <p>Residential and commercial</p>
          </div>
        </div>
      </section>

      <FurnitureBuilder />
    </main>
  );
}
