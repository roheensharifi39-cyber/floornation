"use client";

import { Check } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { STEPS } from "./options";

interface BuilderProgressProps {
  currentStep: number;
}

export function BuilderProgress({ currentStep }: BuilderProgressProps) {
  const reduceMotion = useReducedMotion();
  const progress = ((currentStep + 1) / STEPS.length) * 100;

  return (
    <aside
      aria-label="Custom request progress"
      className="border-line bg-surface border-b px-5 py-5 sm:px-7 lg:sticky lg:top-28 lg:self-start lg:rounded-xl lg:border"
    >
      <div className="flex items-baseline justify-between gap-4">
        <p className="text-ink text-sm font-semibold">
          Step {currentStep + 1} of {STEPS.length}
        </p>
        <p className="text-muted truncate text-sm">
          {STEPS[currentStep].shortLabel}
        </p>
      </div>

      <div
        className="bg-line mt-3 h-1 overflow-hidden rounded-full"
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={STEPS.length}
        aria-valuenow={currentStep + 1}
        aria-label={`${STEPS[currentStep].shortLabel}, step ${currentStep + 1} of ${STEPS.length}`}
      >
        <motion.div
          className="bg-bronze h-full origin-left rounded-full"
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={{
            duration: reduceMotion ? 0 : 0.22,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      </div>

      <ol className="mt-6 hidden space-y-1 lg:block">
        {STEPS.map((step, index) => {
          const isCurrent = index === currentStep;
          const isComplete = index < currentStep;

          return (
            <li
              key={step.shortLabel}
              aria-current={isCurrent ? "step" : undefined}
              className={`flex min-h-12 items-center gap-3 rounded-lg px-2.5 py-2 transition-colors ${
                isCurrent ? "bg-canvas text-ink" : "text-muted"
              }`}
            >
              <span
                className={`flex size-7 shrink-0 items-center justify-center rounded-full border text-xs font-semibold ${
                  isCurrent
                    ? "border-ink bg-ink text-white"
                    : isComplete
                      ? "border-bronze bg-bronze text-white"
                      : "border-line bg-canvas"
                }`}
                aria-hidden="true"
              >
                {isComplete ? <Check className="size-3.5" /> : index + 1}
              </span>
              <span className={isCurrent ? "font-semibold" : undefined}>
                {step.shortLabel}
              </span>
            </li>
          );
        })}
      </ol>

      <p className="text-muted border-line mt-6 hidden border-t pt-5 text-sm leading-6 lg:block">
        Your answers shape a conversation with our team—not an off-the-shelf
        order.
      </p>
    </aside>
  );
}
