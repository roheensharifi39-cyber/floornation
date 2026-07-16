"use client";

import { ArrowRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { ConsultationTrigger } from "@/components/layout/ConsultationDrawer";
import { siteConfig } from "@/lib/site";

export function ContactCTA() {
  return (
    <section id="contact" className="bg-bronze text-white">
      <div className="site-shell grid gap-12 py-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:py-24">
        <div>
          <h2 className="font-display text-[clamp(3rem,7vw,5.7rem)] leading-[0.98] tracking-[-0.035em] text-white">
            Planning a New Space?
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-7 text-white/94 sm:text-lg sm:leading-8">
            Speak with our team about flooring, decking, outdoor structures, or custom furniture.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ConsultationTrigger className="link-arrow inline-flex min-h-13 items-center justify-center gap-3 bg-ink px-6 py-3.5 font-bold text-white transition-colors hover:bg-moss focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
              Request a Consultation <ArrowRight className="size-5" />
            </ConsultationTrigger>
            <a
              href={siteConfig.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-13 items-center justify-center gap-3 border border-white/55 px-6 py-3.5 font-bold text-white transition-colors hover:border-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              <MessageCircle className="size-5" /> Chat on WhatsApp
            </a>
          </div>
        </div>

        <address className="grid gap-5 border-t border-white/45 pt-7 text-sm not-italic text-white sm:grid-cols-2 lg:grid-cols-1">
          <div className="flex gap-3">
            <Phone className="mt-0.5 size-4 shrink-0 text-white" aria-hidden="true" />
            <div className="space-y-1">
              <a href="tel:+971569178686" className="block hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">{siteConfig.phoneMobile}</a>
              <a href="tel:+97142387786" className="block hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">{siteConfig.phoneOffice}</a>
            </div>
          </div>
          <a href={`mailto:${siteConfig.email}`} className="flex gap-3 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
            <Mail className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            {siteConfig.email}
          </a>
          <div className="flex gap-3 sm:col-span-2 lg:col-span-1">
            <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            <span>{siteConfig.address.join(", ")}</span>
          </div>
        </address>
      </div>
    </section>
  );
}
