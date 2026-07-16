"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, MessageCircle, X } from "lucide-react";
import { ConsultationTrigger, useConsultation } from "@/components/layout/ConsultationDrawer";
import { Logo } from "@/components/ui/Logo";
import { primaryNavigation, siteConfig } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();
  const { openConsultation } = useConsultation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobilePanelRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();
  const transparent = pathname === "/" && !scrolled && !menuOpen;

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 32);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    previousFocusRef.current = document.activeElement as HTMLElement;
    document.body.dataset.menuOpen = "true";
    window.requestAnimationFrame(() => {
      mobilePanelRef.current
        ?.querySelector<HTMLElement>('[data-mobile-menu-initial-focus="true"]')
        ?.focus();
    });
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        return;
      }
      if (event.key !== "Tab" || !mobilePanelRef.current) return;
      const panelFocusable = mobilePanelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      const focusable = [
        ...(menuButtonRef.current ? [menuButtonRef.current] : []),
        ...Array.from(panelFocusable),
      ];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;
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
      delete document.body.dataset.menuOpen;
      document.removeEventListener("keydown", handleKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [menuOpen]);

  const navText = transparent ? "text-white" : "text-ink";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,box-shadow] duration-500 ${
        transparent
          ? "border-b border-transparent bg-transparent"
          : "border-b border-line bg-canvas/96 shadow-[0_2px_6px_oklch(0.2_0.02_45/0.05)] backdrop-blur-md"
      }`}
    >
      <div className="site-shell flex h-20 items-center justify-between gap-6">
        <div className="relative z-10 shrink-0">
          <Logo light={transparent} />
        </div>

        <nav aria-label="Primary navigation" className="hidden items-center gap-6 lg:flex xl:gap-8">
          {primaryNavigation.map((item) => {
            const active = !item.href.startsWith("/#") && pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`relative py-2 text-[0.83rem] font-semibold transition-colors ${navText} after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-bronze after:transition-transform after:duration-300 hover:after:origin-left hover:after:scale-x-100 ${
                  active ? "after:scale-x-100" : ""
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="relative z-10 flex items-center gap-2 sm:gap-3">
          <a
            href={siteConfig.whatsapp}
            target="_blank"
            rel="noreferrer"
            aria-label="Chat with Floor Nation on WhatsApp"
            className={`grid size-11 place-items-center border transition-colors ${
              transparent
                ? "border-white/35 text-white hover:border-white hover:bg-white/10"
                : "border-line text-ink hover:border-ink hover:bg-surface"
            }`}
          >
            <MessageCircle className="size-5" aria-hidden="true" />
          </a>
          <ConsultationTrigger className="hidden min-h-11 items-center bg-bronze px-4 text-sm font-bold text-white transition-colors hover:bg-bronze-dark sm:inline-flex xl:px-5">
            Request a Consultation
          </ConsultationTrigger>
          <button
            ref={menuButtonRef}
            type="button"
            className={`grid size-11 place-items-center border lg:hidden ${
              transparent
                ? "border-white/35 text-white"
                : "border-line text-ink"
            }`}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            ref={mobilePanelRef}
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={false}
            animate={reduceMotion ? { opacity: 1 } : { opacity: [0.96, 1] }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.3 }}
            className="absolute inset-x-0 top-full h-[calc(100dvh-5rem)] overflow-y-auto bg-ink text-white lg:hidden"
          >
            <div className="site-shell flex min-h-[calc(100dvh-5rem)] flex-col py-8">
              <nav aria-label="Mobile navigation" className="flex flex-col">
                {primaryNavigation.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={false}
                    animate={
                      reduceMotion
                        ? { opacity: 1, y: 0 }
                        : { opacity: [0.94, 1], y: [8, 0] }
                    }
                    transition={{ delay: reduceMotion ? 0 : index * 0.045, duration: 0.35 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      data-mobile-menu-initial-focus={index === 0 ? "true" : undefined}
                      className="flex min-h-16 items-center justify-between border-b border-white/14 font-display text-[clamp(1.8rem,8vw,2.7rem)] leading-none transition-colors hover:text-bronze-light"
                    >
                      {item.label}
                      <span aria-hidden="true" className="font-sans text-sm text-white/45">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="mt-auto grid gap-3 pt-10 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    window.setTimeout(openConsultation, 0);
                  }}
                  className="min-h-13 bg-bronze px-5 py-3.5 text-center font-bold text-white"
                >
                  Request a Consultation
                </button>
                <a
                  href={siteConfig.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="flex min-h-13 items-center justify-center gap-2 border border-white/30 px-5 py-3.5 font-bold text-white"
                >
                  <MessageCircle className="size-5" /> Chat on WhatsApp
                </a>
              </div>
              <p className="mt-8 text-sm text-white/50">Dubai · United Arab Emirates</p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
