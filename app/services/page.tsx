import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, MessageCircle } from "lucide-react";

import { ServicesExplorer } from "@/components/services/ServicesExplorer";
import { siteConfig } from "@/lib/site";

const pageTitle = "Flooring, Decking & Outdoor Services";
const socialTitle =
  "Flooring, Decking & Outdoor Services | Floor Nation Dubai";
const description =
  "Explore Floor Nation's indoor flooring, decking, pergola, gazebo, and fencing services, with material sourcing and professional installation across Dubai and the UAE.";

export const metadata: Metadata = {
  title: pageTitle,
  description,
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: socialTitle,
    description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: socialTitle,
    description,
  },
};

const deliveryCapabilities = [
  "Site and substrate assessment",
  "Material and finish sourcing",
  "Bespoke detailing",
  "Supply and professional installation",
] as const;

export default function ServicesPage() {
  return (
    <main id="main-content" className="overflow-x-clip bg-canvas">
      <section className="relative isolate flex min-h-[72svh] items-end overflow-hidden bg-ink text-canvas">
        <Image
          src="https://images.unsplash.com/photo-1619606897498-3c0e79a8b9ff?auto=format&fit=crop&w=2400&q=90"
          alt="Detailed timber flooring meeting a restrained contemporary interior"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-ink/70" aria-hidden="true" />

        <div className="relative mx-auto w-full max-w-[1440px] px-5 pb-12 pt-36 sm:px-8 sm:pb-16 sm:pt-44 lg:px-12 lg:pb-20">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-9">
              <p className="mb-5 text-base font-medium text-bronze-light">
                Flooring and outdoor expertise
              </p>
              <h1 className="max-w-5xl text-balance font-display text-[clamp(3rem,7.5vw,5.75rem)] leading-[0.98] tracking-[-0.035em] text-canvas">
                Every surface has a job to do.
              </h1>
            </div>

            <div className="lg:col-span-3">
              <p className="max-w-md text-pretty text-base leading-7 text-canvas/80">
                We source, tailor, supply, and install indoor flooring and outdoor
                systems for residential and commercial spaces across the UAE.
              </p>
              <a
                href="#service-directory"
                className="mt-7 inline-flex min-h-12 items-center gap-3 rounded-full border border-canvas/35 px-5 text-sm font-semibold text-canvas outline-none transition-colors hover:border-bronze-light hover:text-bronze-light focus-visible:ring-2 focus-visible:ring-bronze-light focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
              >
                Explore the services
                <ArrowDown aria-hidden="true" className="size-4" />
              </a>
            </div>
          </div>

          <p className="mt-12 border-t border-canvas/25 pt-5 text-sm leading-6 text-canvas/70 sm:mt-16">
            Seven indoor flooring systems · Five outdoor living specialties · One
            accountable delivery team
          </p>
        </div>
      </section>

      <section
        aria-labelledby="service-approach-title"
        className="border-b border-line bg-surface py-20 sm:py-24 lg:py-28"
      >
        <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
            <h2
              id="service-approach-title"
              className="max-w-xl text-balance font-display text-[clamp(2.25rem,4.6vw,4.25rem)] leading-[1.04] tracking-[-0.03em] text-ink lg:col-span-5"
            >
              Specification is where performance starts.
            </h2>
            <div className="lg:col-span-6 lg:col-start-7">
              <p className="max-w-[65ch] text-pretty text-base leading-7 text-muted sm:text-lg sm:leading-8">
                Appearance matters, but so do climate, traffic, moisture, substrate,
                maintenance, and installation detail. Floor Nation considers the
                whole system so the finish chosen for the space is also the finish
                suited to it.
              </p>
            </div>
          </div>

          <ul className="mt-14 grid border-y border-line sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
            {deliveryCapabilities.map((capability, index) => (
              <li
                key={capability}
                className={`flex min-h-20 items-center border-line py-5 text-sm font-semibold leading-6 text-ink sm:px-5 lg:min-h-24 lg:px-7 ${
                  index > 0 ? "border-t border-line sm:border-t-0" : ""
                } ${index % 2 === 1 ? "sm:border-l" : ""} ${
                  index > 1 ? "sm:border-t lg:border-t-0" : ""
                } ${index > 0 ? "lg:border-l" : ""}`}
              >
                {capability}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ServicesExplorer />

      <section className="bg-ink py-20 text-canvas sm:py-24 lg:py-32">
        <div className="mx-auto grid w-full max-w-[1440px] gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:items-end lg:px-12">
          <div className="lg:col-span-8">
            <h2 className="max-w-4xl text-balance font-display text-[clamp(2.5rem,5.7vw,5rem)] leading-[1] tracking-[-0.035em] text-canvas">
              Bring us the plan, the sample, or simply the problem.
            </h2>
          </div>
          <div className="lg:col-span-4">
            <p className="max-w-md text-pretty text-base leading-7 text-canvas/75">
              Share a photo or rough idea for custom furniture, or speak with us
              about materials and installation for your property.
            </p>
            <div className="mt-7 flex flex-col gap-3">
              <Link
                href="/custom-furniture#quick-start"
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-xl bg-bronze px-5 text-sm font-semibold text-white outline-none transition-colors hover:bg-bronze-dark focus-visible:ring-2 focus-visible:ring-canvas focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
              >
                Custom Furniture Inquiry
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
              <Link
                href="/#contact"
                className="inline-flex min-h-13 items-center justify-center gap-2 rounded-xl bg-logo-cream px-5 text-sm font-semibold text-[oklch(0.235_0.032_42)] outline-none transition-colors hover:bg-bronze hover:text-white focus-visible:ring-2 focus-visible:ring-canvas focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
              >
                Request a consultation
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
              <a
                href={`${siteConfig.whatsapp}?text=${encodeURIComponent("Hello Floor Nation, I’d like to discuss a flooring or outdoor project.")}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-13 items-center justify-center gap-2 rounded-xl border border-canvas/35 px-5 text-sm font-semibold text-canvas outline-none transition-colors hover:border-canvas hover:bg-canvas hover:text-ink focus-visible:ring-2 focus-visible:ring-canvas focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
              >
                <MessageCircle aria-hidden="true" className="size-4" />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
