"use client";

import { motion } from "framer-motion";

import {
  projectFilters,
  type ProjectFilter as ProjectFilterValue,
} from "@/data/projects";
import { useHydratedReducedMotion } from "@/lib/use-hydrated-reduced-motion";

type ProjectFilterProps = {
  readonly activeFilter: ProjectFilterValue;
  readonly onFilterChange: (filter: ProjectFilterValue) => void;
};

export function ProjectFilter({
  activeFilter,
  onFilterChange,
}: ProjectFilterProps) {
  const reduceMotion = useHydratedReducedMotion();

  return (
    <div
      aria-label="Filter projects by type"
      className="-mx-5 overflow-x-auto border-b border-line px-5 sm:mx-0 sm:px-0"
      role="toolbar"
    >
      <div className="flex min-w-max items-end gap-7 sm:gap-9">
        {projectFilters.map((filter) => {
          const isActive = filter === activeFilter;

          return (
            <button
              aria-pressed={isActive}
              className={`relative min-h-12 pb-3 text-sm font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bronze ${
                isActive
                  ? "text-ink"
                  : "text-muted hover:text-ink"
              }`}
              key={filter}
              onClick={() => onFilterChange(filter)}
              type="button"
            >
              {filter}
              {isActive ? (
                <motion.span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-0.5 bg-bronze"
                  layoutId="active-project-filter"
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : {
                          duration: 0.32,
                          ease: [0.22, 1, 0.36, 1],
                        }
                  }
                />
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
