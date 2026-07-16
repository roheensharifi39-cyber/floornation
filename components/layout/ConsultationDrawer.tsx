"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, MessageCircle, X } from "lucide-react";
import { siteConfig } from "@/lib/site";

type ConsultationContextValue = {
  openConsultation: () => void;
  closeConsultation: () => void;
};

const ConsultationContext = createContext<ConsultationContextValue | null>(null);

export function useConsultation() {
  const value = useContext(ConsultationContext);
  if (!value) {
    throw new Error("useConsultation must be used inside ConsultationProvider");
  }
  return value;
}

export function ConsultationProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const closeConsultation = useCallback(() => setOpen(false), []);
  const openConsultation = useCallback(() => setOpen(true), []);

  return (
    <ConsultationContext.Provider value={{ openConsultation, closeConsultation }}>
      {children}
      <ConsultationDrawer open={open} onClose={closeConsultation} />
    </ConsultationContext.Provider>
  );
}

export function ConsultationTrigger({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const { openConsultation } = useConsultation();
  return (
    <button type="button" onClick={openConsultation} className={className}>
      {children}
    </button>
  );
}

function ConsultationDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const reduceMotion = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const successHeadingRef = useRef<HTMLHeadingElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const titleId = useId();
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!open) return;
    previousFocusRef.current = document.activeElement as HTMLElement;
    document.body.dataset.drawerOpen = "true";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;
      if (!panelRef.current.contains(document.activeElement)) {
        event.preventDefault();
        first.focus();
        return;
      }
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      delete document.body.dataset.drawerOpen;
      document.removeEventListener("keydown", handleKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [onClose, open]);

  useEffect(() => {
    if (open && submitted) successHeadingRef.current?.focus();
  }, [open, submitted]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  const handleClose = () => {
    onClose();
    window.setTimeout(() => setSubmitted(false), 250);
  };

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-50" aria-hidden={false}>
          <motion.button
            type="button"
            aria-label="Close consultation form"
            className="absolute inset-0 h-full w-full bg-ink/65"
            onClick={handleClose}
            initial={false}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            initial={false}
            animate={reduceMotion ? { x: 0 } : { x: [24, 0] }}
            exit={{ x: reduceMotion ? 0 : "100%" }}
            transition={{ duration: reduceMotion ? 0 : 0.52, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-0 flex h-full w-full max-w-[38rem] flex-col overflow-y-auto bg-canvas shadow-[-8px_0_8px_oklch(0.2_0.02_45/0.12)]"
          >
            <div className="flex items-center justify-between border-b border-line px-5 py-5 sm:px-8">
              <p className="font-semibold text-ink">Project consultation</p>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={handleClose}
                className="grid size-11 place-items-center border border-line text-ink transition-colors hover:border-ink hover:bg-surface"
                aria-label="Close consultation form"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>

            <div className="flex flex-1 flex-col px-5 py-10 sm:px-8 sm:py-12">
              {submitted ? (
                <div className="my-auto" role="status">
                  <div className="mb-7 grid size-14 place-items-center bg-moss text-white">
                    <Check className="size-7" aria-hidden="true" />
                  </div>
                  <h2
                    ref={successHeadingRef}
                    id={titleId}
                    tabIndex={-1}
                    className="font-display text-4xl leading-tight text-ink sm:text-5xl"
                  >
                    Your brief is ready for a conversation.
                  </h2>
                  <p className="mt-5 max-w-lg text-muted">
                    This website is a presentation demo, so no data was sent. Continue on WhatsApp to share these details directly with Floor Nation.
                  </p>
                  <a
                    href={`${siteConfig.whatsapp}?text=${encodeURIComponent("Hello Floor Nation, I would like to discuss a project consultation.")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-8 inline-flex min-h-12 items-center gap-3 bg-bronze px-5 py-3 font-bold text-white transition-colors hover:bg-bronze-dark"
                  >
                    <MessageCircle className="size-5" aria-hidden="true" />
                    Continue on WhatsApp
                  </a>
                </div>
              ) : (
                <>
                  <h2 id={titleId} className="font-display text-4xl leading-[1.04] text-ink sm:text-5xl">
                    Tell us about the space you&apos;re planning.
                  </h2>
                  <p className="mt-5 max-w-xl text-muted">
                    Share a few essentials and the Floor Nation team can help shape the right flooring, outdoor, or furniture solution.
                  </p>

                  <form onSubmit={handleSubmit} className="mt-10 space-y-6">
                    <div className="grid gap-6 sm:grid-cols-2">
                      <Field label="Full name" name="name" autoComplete="name" required />
                      <Field label="Phone or WhatsApp" name="phone" type="tel" autoComplete="tel" required />
                    </div>
                    <Field label="Email address" name="email" type="email" autoComplete="email" required />
                    <label className="block">
                      <span className="mb-2 block text-sm font-semibold text-ink">What can we help with?</span>
                      <select
                        name="projectType"
                        required
                        defaultValue=""
                        className="min-h-12 w-full border border-line bg-white px-4 py-3 text-ink focus:border-bronze focus:outline-none"
                      >
                        <option value="" disabled>Select a service</option>
                        <option>Interior flooring</option>
                        <option>Decking or outdoor structure</option>
                        <option>Custom furniture</option>
                        <option>Multi-scope project</option>
                      </select>
                    </label>
                    <label className="block">
                      <span className="mb-2 block text-sm font-semibold text-ink">Project notes</span>
                      <textarea
                        name="message"
                        rows={4}
                        placeholder="Property type, location, approximate area, material ideas…"
                        className="w-full resize-y border border-line bg-white px-4 py-3 text-ink placeholder:text-muted focus:border-bronze focus:outline-none"
                      />
                    </label>
                    <p className="text-sm leading-6 text-muted">
                      Demo only — this form does not transmit or permanently store your information.
                    </p>
                    <button
                      type="submit"
                      className="link-arrow inline-flex min-h-13 w-full items-center justify-center gap-3 bg-bronze px-6 py-3.5 font-bold text-white transition-colors hover:bg-bronze-dark sm:w-auto"
                    >
                      Prepare my request
                      <ArrowRight className="size-5" aria-hidden="true" />
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}

function Field({
  label,
  name,
  type = "text",
  autoComplete,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-ink">{label}</span>
      <input
        name={name}
        type={type}
        inputMode={type === "tel" ? "tel" : type === "email" ? "email" : undefined}
        autoComplete={autoComplete}
        required={required}
        className="min-h-12 w-full border border-line bg-white px-4 py-3 text-ink focus:border-bronze focus:outline-none"
      />
    </label>
  );
}
