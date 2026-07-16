"use client";

import { ArrowUpRight, Check, RotateCcw } from "lucide-react";
import { forwardRef } from "react";
import type { FurnitureBrief } from "./types";
import { siteConfig } from "@/lib/site";

interface SuccessStateProps {
  reference: string;
  brief: FurnitureBrief;
  onReset: () => void;
}

export const SuccessState = forwardRef<HTMLElement, SuccessStateProps>(
  function SuccessState({ reference, brief, onReset }, ref) {
    const furnitureSummary = brief.furnitureTypes
      .map((type) =>
        type === "Other" && brief.furnitureOther
          ? brief.furnitureOther
          : type,
      )
      .join(", ");
    const spaceSummary =
      brief.space === "Other" && brief.spaceOther
        ? brief.spaceOther
        : brief.space;
    const whatsappMessage = [
      "Hello Floor Nation,",
      `I completed the custom furniture demo (reference ${reference}).`,
      `I’m interested in ${furnitureSummary} for ${spaceSummary.toLowerCase()}.`,
      `My starting design direction is ${brief.direction}.`,
      "I’d like your team to review the idea and discuss a custom proposal.",
    ].join("\n");
    const whatsappUrl = `${siteConfig.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`;

    return (
      <section
        ref={ref}
        tabIndex={-1}
        aria-labelledby="success-title"
        className="scroll-mt-24 outline-none"
      >
        <div className="bg-ink overflow-hidden rounded-xl text-white">
          <div className="px-6 py-9 sm:px-10 sm:py-12 lg:px-14 lg:py-14">
            <span className="bg-bronze flex size-11 items-center justify-center rounded-lg text-white">
              <Check className="size-5" strokeWidth={2.5} aria-hidden="true" />
            </span>
            <p className="mt-7 text-sm font-semibold text-white/65">
              Demo brief complete
            </p>
            <h2
              id="success-title"
              className="font-display mt-2 max-w-2xl text-4xl leading-[1.05] tracking-[-0.025em] text-balance sm:text-5xl"
            >
              Your idea is ready for a real conversation.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/72">
              We created a reference for this on-screen demo. No request, files
              or contact details were sent to a backend or stored permanently.
            </p>
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/72">
              In the live service, the Floor Nation team would review your
              reference, source or create the right furniture, clarify open
              details, and prepare a custom proposal—never an instant catalogue
              checkout.
            </p>

            <div className="mt-8 max-w-xl border-y border-white/15 py-5">
              <p className="text-xs font-semibold text-white/55">
                Demo reference
              </p>
              <p className="mt-1 font-mono text-xl font-semibold tracking-[0.08em] text-white sm:text-2xl">
                {reference}
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="focus-ring bg-bronze hover:bg-bronze-dark inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold text-white transition-colors"
              >
                Continue on WhatsApp
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
              <button
                type="button"
                onClick={onReset}
                className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/25 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                <RotateCcw className="size-4" aria-hidden="true" />
                Start another brief
              </button>
            </div>
          </div>

          <div className="border-t border-white/12 bg-white/[0.04] px-6 py-5 sm:px-10 lg:px-14">
            <p className="text-sm leading-6 text-white/60">
              In a production version, this reference would connect your brief,
              inspiration files and follow-up conversation securely.
            </p>
          </div>
        </div>
      </section>
    );
  },
);
