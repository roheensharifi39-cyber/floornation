"use client";

import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  Clock3,
  ShieldCheck,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import {
  type FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { useHydratedReducedMotion } from "@/lib/use-hydrated-reduced-motion";
import { BuilderProgress } from "./builder-progress";
import { ContactForm } from "./contact-form";
import {
  furnitureBuilderSteps,
  furnitureDirections,
  furnitureSpaces,
  furnitureTypes,
} from "@/data/furniture";
import { ProjectDetailsForm } from "./project-details-form";
import { ReviewPanel } from "./review-panel";
import { DirectionGrid, IconSelectionGrid } from "./selection-fields";
import { SuccessState } from "./success-state";
import type {
  ContactDetails,
  FurnitureBrief,
  ProjectDetails,
  UploadedFile,
} from "./types";
import { UploadField } from "./upload-field";

const STEP_COPY = [
  {
    question: "What space are you furnishing?",
    description:
      "Choose the closest setting. Homes, offices, hospitality properties, outdoor spaces and unusual environments are all welcome.",
  },
  {
    question: "What would you like us to create?",
    description:
      "Select one or more pieces, a complete room, or describe something else. This is a starting point—not a fixed product catalogue.",
  },
  {
    question: "Which direction feels closest?",
    description:
      "These themes are inspiration directions, not products or inventory. Materials, proportions and finishes will be tailored to your request.",
  },
  {
    question: "Tell us what the piece needs to do.",
    description:
      "Add whatever is useful and skip what you do not know. Our team can resolve dimensions, materials and specifications with you.",
  },
  {
    question: "Show us what caught your eye.",
    description:
      "Upload a photo, screenshot, sketch, mood board, or floor plan. We can use it as the starting point for your custom request.",
  },
  {
    question: "Where should we continue the conversation?",
    description:
      "Add your contact details, then check the brief before creating this demo request.",
  },
] as const;

function createInitialBrief(): FurnitureBrief {
  return {
    space: "",
    spaceOther: "",
    furnitureTypes: [],
    furnitureOther: "",
    direction: "",
    details: {
      dimensions: "",
      materials: "",
      colors: "",
      quantity: 1,
      projectKind: "",
      budget: "",
      completionDate: "",
      requirements: "",
    },
    contact: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      preferredMethod: "",
      message: "",
    },
  };
}

function createReferenceNumber() {
  const now = new Date();
  const date = now.toISOString().slice(0, 10).replaceAll("-", "");
  const sequence = now.getTime().toString(36).slice(-5).toUpperCase();
  return `FN-CF-${date}-${sequence}`;
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function FurnitureBuilder() {
  const reduceMotion = useHydratedReducedMotion();
  const [currentStep, setCurrentStep] = useState(0);
  const [brief, setBrief] = useState<FurnitureBrief>(createInitialBrief);
  const [uploads, setUploads] = useState<UploadedFile[]>([]);
  const [slideDirection, setSlideDirection] = useState(1);
  const [stepError, setStepError] = useState("");
  const [attemptedStep, setAttemptedStep] = useState<number | null>(null);
  const [saveMessage, setSaveMessage] = useState("");
  const [reference, setReference] = useState<string | null>(null);

  const headingRef = useRef<HTMLHeadingElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLElement>(null);
  const hasNavigated = useRef(false);
  const uploadsRef = useRef<UploadedFile[]>([]);

  useEffect(() => {
    uploadsRef.current = uploads;
  }, [uploads]);

  useEffect(() => {
    const currentUploads = uploadsRef;
    return () => {
      currentUploads.current.forEach((upload) => {
        if (upload.previewUrl) URL.revokeObjectURL(upload.previewUrl);
      });
    };
  }, []);

  useEffect(() => {
    if (!hasNavigated.current || reference) return;
    const animationFrame = requestAnimationFrame(() => headingRef.current?.focus());
    return () => cancelAnimationFrame(animationFrame);
  }, [currentStep, reference]);

  useEffect(() => {
    if (!reference) return;
    const animationFrame = requestAnimationFrame(() => successRef.current?.focus());
    return () => cancelAnimationFrame(animationFrame);
  }, [reference]);

  const clearValidation = () => {
    if (stepError) setStepError("");
    if (attemptedStep === currentStep) setAttemptedStep(null);
  };

  const updateDetails = (next: Partial<ProjectDetails>) => {
    clearValidation();
    setBrief((current) => ({
      ...current,
      details: { ...current.details, ...next },
    }));
  };

  const updateContact = (next: Partial<ContactDetails>) => {
    clearValidation();
    setBrief((current) => ({
      ...current,
      contact: { ...current.contact, ...next },
    }));
  };

  const validateStep = (step: number) => {
    if (step === 0 && !brief.space) {
      return "Choose one space to continue.";
    }
    if (step === 0 && brief.space === "Other" && !brief.spaceOther.trim()) {
      return "Briefly describe the space so we can frame the request.";
    }
    if (step === 1 && brief.furnitureTypes.length === 0) {
      return "Select at least one furniture type to continue.";
    }
    if (
      step === 1 &&
      brief.furnitureTypes.includes("Other") &&
      !brief.furnitureOther.trim()
    ) {
      return "Tell us what other furniture you have in mind.";
    }
    if (step === 2 && !brief.direction) {
      return "Choose one design direction to continue.";
    }
    if (step === 3 && brief.details.quantity < 1) {
      return "Quantity must be at least 1.";
    }
    if (step === 5) {
      const phoneDigits = brief.contact.phone.replace(/\D/g, "");
      if (
        brief.contact.fullName.trim().length < 2 ||
        !emailPattern.test(brief.contact.email.trim()) ||
        phoneDigits.length < 7 ||
        !brief.contact.location.trim() ||
        !brief.contact.preferredMethod
      ) {
        return "Complete the required contact details to create your demo request.";
      }
    }
    return "";
  };

  const showValidationError = (message: string) => {
    setAttemptedStep(currentStep);
    setStepError(message);
    requestAnimationFrame(() => errorRef.current?.focus());
  };

  const goToStep = (nextStep: number) => {
    setSlideDirection(nextStep >= currentStep ? 1 : -1);
    setCurrentStep(nextStep);
    setStepError("");
    setAttemptedStep(null);
    setSaveMessage("");
    hasNavigated.current = true;
  };

  const handleNext = () => {
    const error = validateStep(currentStep);
    if (error) {
      showValidationError(error);
      return;
    }
    if (currentStep < furnitureBuilderSteps.length - 1) {
      goToStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) goToStep(currentStep - 1);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const error = validateStep(5);
    if (error) {
      showValidationError(error);
      return;
    }

    setReference(createReferenceNumber());
    setStepError("");
  };

  const resetBuilder = () => {
    uploads.forEach((upload) => {
      if (upload.previewUrl) URL.revokeObjectURL(upload.previewUrl);
    });
    setUploads([]);
    setBrief(createInitialBrief());
    setReference(null);
    setCurrentStep(0);
    setSlideDirection(-1);
    setAttemptedStep(null);
    setStepError("");
    setSaveMessage("");
    hasNavigated.current = true;
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div>
            <IconSelectionGrid
              options={furnitureSpaces}
              selected={brief.space ? [brief.space] : []}
              onSelect={(space) => {
                clearValidation();
                setBrief((current) => ({ ...current, space }));
              }}
            />
            {brief.space === "Other" && (
              <label className="mt-5 block max-w-2xl" htmlFor="other-space">
                <span className="text-ink text-sm font-semibold">
                  Describe the space <span className="text-bronze">*</span>
                </span>
                <textarea
                  id="other-space"
                  rows={3}
                  value={brief.spaceOther}
                  onChange={(event) => {
                    clearValidation();
                    setBrief((current) => ({
                      ...current,
                      spaceOther: event.target.value,
                    }));
                  }}
                  placeholder="For example: a clinic waiting area, rooftop lounge, or home cinema."
                  className="focus-ring border-line bg-canvas text-ink placeholder:text-muted mt-2 min-h-24 w-full resize-y rounded-lg border px-3.5 py-3 text-base"
                  aria-invalid={attemptedStep === 0 && !brief.spaceOther.trim()}
                />
              </label>
            )}
          </div>
        );
      case 1:
        return (
          <div>
            <IconSelectionGrid
              options={furnitureTypes}
              selected={brief.furnitureTypes}
              multiple
              onSelect={(furnitureType) => {
                clearValidation();
                setBrief((current) => ({
                  ...current,
                  furnitureTypes: current.furnitureTypes.includes(furnitureType)
                    ? current.furnitureTypes.filter((item) => item !== furnitureType)
                    : [...current.furnitureTypes, furnitureType],
                }));
              }}
            />
            {brief.furnitureTypes.includes("Other") && (
              <label className="mt-5 block max-w-2xl" htmlFor="other-furniture">
                <span className="text-ink text-sm font-semibold">
                  What should we source or create? <span className="text-bronze">*</span>
                </span>
                <textarea
                  id="other-furniture"
                  rows={3}
                  value={brief.furnitureOther}
                  onChange={(event) => {
                    clearValidation();
                    setBrief((current) => ({
                      ...current,
                      furnitureOther: event.target.value,
                    }));
                  }}
                  placeholder="Describe the piece, full setting, or reference you have in mind."
                  className="focus-ring border-line bg-canvas text-ink placeholder:text-muted mt-2 min-h-24 w-full resize-y rounded-lg border px-3.5 py-3 text-base"
                  aria-invalid={attemptedStep === 1 && !brief.furnitureOther.trim()}
                />
              </label>
            )}
          </div>
        );
      case 2:
        return (
          <DirectionGrid
            options={furnitureDirections}
            selected={brief.direction}
            onSelect={(direction) => {
              clearValidation();
              setBrief((current) => ({ ...current, direction }));
            }}
          />
        );
      case 3:
        return (
          <ProjectDetailsForm
            value={brief.details}
            onChange={updateDetails}
            showErrors={attemptedStep === 3}
          />
        );
      case 4:
        return (
          <UploadField
            uploads={uploads}
            onChange={(files) => {
              clearValidation();
              setUploads(files);
            }}
          />
        );
      case 5:
        return (
          <div className="grid grid-cols-1 gap-7 xl:grid-cols-[minmax(0,0.92fr)_minmax(22rem,1.08fr)] xl:items-start">
            <ContactForm
              value={brief.contact}
              onChange={updateContact}
              showErrors={attemptedStep === 5}
            />
            <ReviewPanel brief={brief} uploads={uploads} onEdit={goToStep} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section id="request-builder" className="bg-canvas scroll-mt-24 py-16 sm:py-20 lg:py-28">
      <div className="site-shell">
        <div className="mb-9 max-w-3xl sm:mb-12">
          <p className="text-bronze text-sm font-semibold">Your custom brief</p>
          <h2 className="font-display text-ink mt-3 text-4xl leading-[1.05] tracking-[-0.025em] text-balance sm:text-5xl lg:text-6xl">
            Start with what you know.
          </h2>
          <p className="text-muted mt-5 max-w-2xl text-base leading-7 sm:text-lg">
            Six focused steps turn an early idea into a useful starting brief.
            Nothing here limits the final design.
          </p>
          <p className="text-ink mt-4 max-w-2xl text-base font-semibold leading-7">
            Have only a picture or rough idea? That is enough to get started.
          </p>
          <div className="text-muted mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <span className="flex items-center gap-2">
              <Clock3 className="text-bronze size-4" aria-hidden="true" />
              About 4 minutes
            </span>
            <span className="flex items-center gap-2">
              <ShieldCheck className="text-bronze size-4" aria-hidden="true" />
              Demo—nothing is submitted
            </span>
          </div>
        </div>

        <div className="grid min-w-0 grid-cols-1 gap-5 lg:grid-cols-[15rem_minmax(0,1fr)] lg:items-start xl:gap-8">
          {!reference && <BuilderProgress currentStep={currentStep} />}

          <div className={reference ? "lg:col-span-2" : "min-w-0"}>
            {reference ? (
              <SuccessState
                ref={successRef}
                reference={reference}
                brief={brief}
                onReset={resetBuilder}
              />
            ) : (
              <form
                noValidate
                onSubmit={handleSubmit}
                className="soft-panel bg-canvas overflow-hidden"
              >
                <AnimatePresence mode="wait" initial={false} custom={slideDirection}>
                  <motion.div
                    key={currentStep}
                    custom={slideDirection}
                    initial={
                      reduceMotion
                        ? { opacity: 0 }
                        : { opacity: 0, x: slideDirection * 22 }
                    }
                    animate={{ opacity: 1, x: 0 }}
                    exit={
                      reduceMotion
                        ? { opacity: 0 }
                        : { opacity: 0, x: slideDirection * -16 }
                    }
                    transition={{
                      duration: reduceMotion ? 0.08 : 0.22,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="px-5 py-7 sm:px-8 sm:py-9 xl:px-10 xl:py-10"
                  >
                    <div className="mb-7 max-w-3xl">
                      <p className="text-bronze text-sm font-semibold">
                        {furnitureBuilderSteps[currentStep].title}
                      </p>
                      <h2
                        ref={headingRef}
                        tabIndex={-1}
                        className="font-display text-ink mt-2 text-3xl leading-[1.08] tracking-[-0.02em] text-balance outline-none sm:text-4xl"
                      >
                        {STEP_COPY[currentStep].question}
                      </h2>
                      <p className="text-muted mt-3 max-w-2xl text-sm leading-6 sm:text-base sm:leading-7">
                        {STEP_COPY[currentStep].description}
                      </p>
                    </div>

                    {stepError && (
                      <div
                        ref={errorRef}
                        tabIndex={-1}
                        role="alert"
                        className="mb-5 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm font-medium text-red-800 outline-none focus:ring-2 focus:ring-red-700 focus:ring-offset-2"
                      >
                        {stepError}
                      </div>
                    )}

                    {renderStepContent()}
                  </motion.div>
                </AnimatePresence>

                <div className="border-line bg-surface border-t px-5 py-4 sm:px-8 sm:py-5 xl:px-10">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <button
                      type="button"
                      onClick={() =>
                        setSaveMessage(
                          "Demo only—your answers remain in this tab, but are not saved for later.",
                        )
                      }
                      className="focus-ring text-muted hover:text-ink flex min-h-12 items-center gap-2 self-start rounded-xl px-2 text-left text-sm font-semibold transition-colors"
                    >
                      <Bookmark className="size-4 shrink-0" aria-hidden="true" />
                      <span>Save and continue later</span>
                      <span className="border-line bg-canvas text-muted rounded-md border px-1.5 py-0.5 text-[11px] font-semibold">
                        Demo only
                      </span>
                    </button>

                    <div className="flex w-full items-center gap-2 sm:w-auto">
                      <button
                        type="button"
                        onClick={handleBack}
                        disabled={currentStep === 0}
                        className="focus-ring border-line text-ink hover:border-ink disabled:text-muted inline-flex min-h-13 items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-45"
                      >
                        <ArrowLeft className="size-4" aria-hidden="true" />
                        Back
                      </button>
                      {currentStep === furnitureBuilderSteps.length - 1 ? (
                        <button
                          type="submit"
                          className="focus-ring bg-ink hover:bg-bronze inline-flex min-h-13 min-w-0 flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-center text-sm font-semibold text-white transition-colors sm:flex-none sm:px-5"
                        >
                          Request My Custom Proposal
                          <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={handleNext}
                          className="focus-ring bg-ink hover:bg-bronze inline-flex min-h-13 min-w-0 flex-1 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white transition-colors sm:flex-none"
                        >
                          {currentStep === 4 && uploads.length === 0
                            ? "Continue without upload"
                            : currentStep === 4
                              ? "Review request"
                              : "Continue"}
                          <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
                        </button>
                      )}
                    </div>
                  </div>
                  <p
                    aria-live="polite"
                    className={`text-muted text-sm leading-5 ${saveMessage ? "mt-3" : "sr-only"}`}
                  >
                    {saveMessage}
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
