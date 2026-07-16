import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, Mail, PackageOpen } from "lucide-react";

import type { Service } from "@/data/services";

type ServiceEntryProps = {
  service: Service;
  index: number;
};

function buildMailto(service: Service, intent: "samples" | "quote") {
  const isSamples = intent === "samples";
  const subject = isSamples
    ? `Sample request — ${service.title}`
    : `Project quote — ${service.title}`;
  const body = isSamples
    ? `Hello Floor Nation,\n\nI would like to review samples for ${service.title}. Please contact me to discuss the available finishes and my project requirements.\n\nName:\nPhone / WhatsApp:\nProject location:\n`
    : `Hello Floor Nation,\n\nI would like to request a quote for ${service.title}.\n\nName:\nPhone / WhatsApp:\nProject location:\nApproximate area or dimensions:\nTarget completion date:\n`;

  return `mailto:info@floornation.ae?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function ServiceEntry({ service, index }: ServiceEntryProps) {
  const reverse = index % 2 === 1;

  return (
    <article
      id={service.slug}
      aria-labelledby={`${service.slug}-title`}
      className="group scroll-mt-32 border-b border-line py-12 first:border-t sm:py-16 lg:py-20"
    >
      <div className="grid items-start gap-9 lg:grid-cols-12 lg:gap-12 xl:gap-20">
        <div
          className={`relative aspect-[4/3] overflow-hidden rounded-xl bg-surface lg:col-span-7 ${
            reverse ? "lg:order-2" : ""
          }`}
        >
          <Image
            src={service.image}
            alt={service.imageAlt}
            fill
            sizes="(min-width: 1280px) 700px, (min-width: 1024px) 58vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out motion-reduce:transition-none group-hover:scale-[1.025]"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/5 motion-reduce:transition-none"
            aria-hidden="true"
          />
        </div>

        <div
          className={`flex h-full flex-col lg:col-span-5 ${
            reverse ? "lg:order-1" : ""
          }`}
        >
          <p className="mb-3 text-sm font-medium text-bronze-dark">
            {service.category}
          </p>
          <h2
            id={`${service.slug}-title`}
            className="max-w-xl text-balance font-display text-[clamp(2rem,4vw,3.75rem)] leading-[1.03] tracking-[-0.03em] text-ink"
          >
            {service.title}
          </h2>
          <p className="mt-5 max-w-[62ch] text-pretty text-base leading-7 text-muted sm:text-lg sm:leading-8">
            {service.shortDescription}
          </p>

          <div className="mt-8 grid gap-8 border-y border-line py-7 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <div>
              <h3 className="text-base font-semibold text-ink">What it brings</h3>
              <ul className="mt-4 space-y-3">
                {service.benefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex gap-3 text-sm leading-6 text-muted"
                  >
                    <Check
                      aria-hidden="true"
                      className="mt-1 size-4 shrink-0 text-bronze"
                      strokeWidth={1.8}
                    />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-base font-semibold text-ink">Best suited to</h3>
              <ul className="mt-3 divide-y divide-line">
                {service.applications.map((application) => (
                  <li
                    key={application}
                    className="py-2.5 text-sm leading-6 text-muted first:pt-1"
                  >
                    {application}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Link
            href={`/projects/${service.relatedProject.slug}`}
            className="group/link mt-6 flex min-h-11 items-center justify-between gap-4 text-left text-sm text-ink outline-none transition-colors hover:text-bronze-dark focus-visible:ring-2 focus-visible:ring-bronze focus-visible:ring-offset-4 focus-visible:ring-offset-canvas"
            aria-label={`View related project: ${service.relatedProject.name}`}
          >
            <span>
              <span className="block text-muted">See it in context</span>
              <span className="mt-0.5 block font-semibold">
                {service.relatedProject.name}
                <span className="font-normal text-muted">
                  {` · ${service.relatedProject.location}`}
                </span>
              </span>
            </span>
            <ArrowUpRight
              aria-hidden="true"
              className="size-5 shrink-0 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 motion-reduce:transition-none"
            />
          </Link>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={buildMailto(service, "samples")}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-line px-5 text-sm font-semibold text-ink outline-none transition-colors hover:border-bronze hover:bg-surface focus-visible:ring-2 focus-visible:ring-bronze focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
            >
              <PackageOpen aria-hidden="true" className="size-4" />
              Request samples
            </a>
            <a
              href={buildMailto(service, "quote")}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink px-5 text-sm font-semibold text-canvas outline-none transition-colors hover:bg-bronze focus-visible:ring-2 focus-visible:ring-bronze focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
            >
              <Mail aria-hidden="true" className="size-4" />
              Request a quote
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
