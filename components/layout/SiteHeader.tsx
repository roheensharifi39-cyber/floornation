"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, MessageCircle, X } from "lucide-react";
import { useConsultation } from "@/components/layout/ConsultationDrawer";
import { Logo } from "@/components/ui/Logo";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { primaryNavigation, siteConfig } from "@/lib/site";
import { useHydratedReducedMotion } from "@/lib/use-hydrated-reduced-motion";

export function SiteHeader() {
  const pathname = usePathname();
  const { openConsultation } = useConsultation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobilePanelRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useHydratedReducedMotion();
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
      role={menuOpen ? "dialog" : undefined}
      aria-modal={menuOpen ? "true" : undefined}
      aria-label={menuOpen ? "Site navigation" : undefined}
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,box-shadow] duration-500 ${
        transparent
          ? "border-b border-transparent bg-transparent"
          : "border-b border-line bg-canvas/96 shadow-[0_2px_6px_oklch(0.2_0.02_45/0.05)] backdrop-blur-md"
      }`}
    >
      <div className="site-shell flex h-22 items-center justify-between gap-4 lg:gap-6">
        <div className="relative z-10 shrink-0">
          <Logo light={transparent} />
        </div>

        <nav aria-label="Primary navigation" className="hidden items-center gap-5 lg:flex xl:gap-7">
          {primaryNavigation.map((item) => {
            const active = !item.href.startsWith("/#") && pathname.startsWith(item.href);
            const itemText =
              item.href === "/custom-furniture"
                ? transparent
                  ? "text-bronze-light"
                  : "text-bronze-dark"
                : navText;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`relative flex min-h-11 items-center py-2 text-sm font-semibold transition-colors ${itemText} after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-bronze after:transition-transform after:duration-300 hover:after:origin-left hover:after:scale-x-100 ${
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
            className={`hidden size-12 place-items-center rounded-xl border transition-colors sm:grid ${
              transparent
                ? "border-white/35 text-white hover:border-white hover:bg-white/10"
                : "border-line text-ink hover:border-ink hover:bg-surface"
            }`}
          >
            <MessageCircle className="size-5" aria-hidden="true" />
          </a>
          <ThemeToggle
            className={
              transparent
                ? "border-white/35 text-white hover:border-white hover:bg-white/10"
                : "border-line text-ink hover:border-ink hover:bg-surface"
            }
          />
          <Link
            href="/custom-furniture#quick-start"
            className="hidden min-h-12 items-center rounded-xl bg-bronze px-4 text-sm font-bold text-white shadow-[0_4px_8px_oklch(0.235_0.032_42/0.12)] transition-colors hover:bg-bronze-dark sm:inline-flex xl:px-5"
          >
            Custom Furniture Inquiry
          </Link>
          <button
            ref={menuButtonRef}
            type="button"
            className={`grid size-12 place-items-center rounded-xl border lg:hidden ${
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
            initial={false}
            animate={reduceMotion ? { opacity: 1 } : { opacity: [0.96, 1] }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.3 }}
            className="absolute inset-x-0 top-full h-[calc(100dvh-5.5rem)] overflow-y-auto bg-ink text-white lg:hidden"
          >
            <div className="site-shell flex min-h-[calc(100dvh-5.5rem)] flex-col py-7">
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
                      className={`flex min-h-18 items-center justify-between border-b border-white/14 font-display text-[clamp(1.9rem,8vw,2.7rem)] leading-none transition-colors hover:text-bronze-light ${
                        item.href === "/custom-furniture" ? "text-bronze-light" : ""
                      }`}
                    >
                      {item.label}
                      <span aria-hidden="true" className="font-sans text-sm text-white/45">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="mt-auto grid gap-3 pt-8">
                <Link
                  href="/custom-furniture#quick-start"
                  onClick={() => setMenuOpen(false)}
                  className="flex min-h-14 items-center justify-center rounded-xl bg-bronze px-5 py-3.5 text-center font-bold text-white"
                >
                  Custom Furniture Inquiry
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    window.setTimeout(openConsultation, 0);
                  }}
                  className="min-h-13 rounded-xl border border-white/30 px-5 py-3.5 text-center font-bold text-white"
                >
                  Request a Consultation
                </button>
                <a
                  href={siteConfig.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="flex min-h-13 items-center justify-center gap-2 rounded-xl border border-white/30 px-5 py-3.5 font-bold text-white"
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
