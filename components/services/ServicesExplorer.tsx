"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import {
  serviceCategories,
  services,
  type ServiceCategory,
} from "@/data/services";

import { ServiceEntry } from "./ServiceEntry";

type ServiceFilter = "All" | ServiceCategory;

const filterOptions: readonly { value: ServiceFilter; label: string }[] = [
  { value: "All", label: "All services" },
  ...serviceCategories.map((category) => ({
    value: category,
    label: category,
  })),
];

export function ServicesExplorer() {
  const [activeFilter, setActiveFilter] = useState<ServiceFilter>("All");
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requestedService = params.get("service");
    const requestedCategory = params.get("category");
    const matchedService = requestedService
      ? services.find((service) => service.slug === requestedService)
      : undefined;

    if (matchedService) {
      setActiveFilter(matchedService.category);
      window.setTimeout(() => {
        document
          .getElementById(matchedService.slug)
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 120);
      return;
    }

    if (requestedCategory === "indoor") {
      setActiveFilter("Indoor Flooring");
    } else if (requestedCategory === "outdoor") {
      setActiveFilter("Outdoor Living");
    }
  }, []);

  const handleFilterChange = (filter: ServiceFilter) => {
    setActiveFilter(filter);
    const url = new URL(window.location.href);
    url.searchParams.delete("service");
    if (filter === "Indoor Flooring") {
      url.searchParams.set("category", "indoor");
    } else if (filter === "Outdoor Living") {
      url.searchParams.set("category", "outdoor");
    } else {
      url.searchParams.delete("category");
    }
    window.history.replaceState({}, "", url);
  };

  const filteredServices = useMemo(
    () =>
      activeFilter === "All"
        ? services
        : services.filter((service) => service.category === activeFilter),
    [activeFilter],
  );

  const countFor = (filter: ServiceFilter) =>
    filter === "All"
      ? services.length
      : services.filter((service) => service.category === filter).length;

  return (
    <section
      id="service-directory"
      aria-labelledby="service-directory-title"
      className="bg-canvas py-20 sm:py-24 lg:py-32"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-5">
            <h2
              id="service-directory-title"
              className="max-w-lg text-balance font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.02] tracking-[-0.03em] text-ink"
            >
              Start with the surface. We’ll resolve the system.
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="max-w-[62ch] text-pretty text-base leading-7 text-muted sm:text-lg sm:leading-8">
              Filter by where the work lives. Every service can be tailored to the
              project, from substrate assessment and material selection through
              supply, detailing, and professional installation.
            </p>

            <div
              className="mt-7 flex max-w-full gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              aria-label="Filter services by category"
            >
              {filterOptions.map((option) => {
                const isActive = activeFilter === option.value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    aria-pressed={isActive}
                    aria-controls="services-results"
                    onClick={() => handleFilterChange(option.value)}
                    className={`inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full px-4 text-sm font-semibold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-bronze focus-visible:ring-offset-2 focus-visible:ring-offset-canvas ${
                      isActive
                        ? "bg-ink text-canvas"
                        : "border border-line bg-canvas text-muted hover:border-bronze hover:text-ink"
                    }`}
                  >
                    <span>{option.label}</span>
                    <span
                      className={isActive ? "text-canvas/80" : "text-muted"}
                      aria-hidden="true"
                    >
                      {countFor(option.value)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">
          Showing {filteredServices.length} {activeFilter === "All" ? "services" : activeFilter.toLowerCase() + " services"}.
        </p>

        <div id="services-results" className="mt-14 sm:mt-18 lg:mt-24">
          <AnimatePresence initial={false} mode="popLayout">
            {filteredServices.map((service, index) => (
              <motion.div
                key={service.slug}
                layout={!shouldReduceMotion}
                initial={
                  shouldReduceMotion ? false : { opacity: 0, y: 18, scale: 0.995 }
                }
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={
                  shouldReduceMotion
                    ? { opacity: 1 }
                    : { opacity: 0, y: -10, scale: 0.995 }
                }
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.38,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <ServiceEntry service={service} index={index} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
