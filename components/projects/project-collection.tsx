"use client";

import {
  AnimatePresence,
  LayoutGroup,
  motion,
} from "framer-motion";
import { useMemo, useState } from "react";

import { ProjectCard } from "@/components/projects/project-card";
import { ProjectFilter } from "@/components/projects/project-filter";
import type { Project, ProjectFilter as ProjectFilterValue } from "@/data/projects";
import { useHydratedReducedMotion } from "@/lib/use-hydrated-reduced-motion";

type ProjectCollectionProps = {
  readonly projects: readonly Project[];
};

export function ProjectCollection({ projects }: ProjectCollectionProps) {
  const reduceMotion = useHydratedReducedMotion();
  const [activeFilter, setActiveFilter] =
    useState<ProjectFilterValue>("All");

  const visibleProjects = useMemo(() => {
    if (activeFilter === "All") {
      return projects;
    }

    return projects.filter((project) =>
      project.categories.includes(activeFilter),
    );
  }, [activeFilter, projects]);

  return (
    <LayoutGroup id="project-portfolio">
      <div className="flex flex-col gap-7 sm:gap-9">
        <ProjectFilter
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
        <div className="flex min-h-6 items-center justify-between gap-4 text-sm text-muted">
          <motion.p
            aria-atomic="true"
            aria-live="polite"
            key={`${activeFilter}-${visibleProjects.length}`}
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {visibleProjects.length}{" "}
            {visibleProjects.length === 1 ? "project" : "projects"}
            {activeFilter === "All" ? "" : ` in ${activeFilter}`}
          </motion.p>
          <p className="hidden text-right sm:block">Dubai &amp; across the UAE</p>
        </div>
      </div>

      <motion.div
        className="mt-10 grid grid-cols-1 gap-x-6 gap-y-14 md:grid-cols-2 md:gap-y-20 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-28"
        layout
      >
        <AnimatePresence initial={false}>
          {visibleProjects.map((project, index) => (
            <ProjectCard index={index} key={project.slug} project={project} />
          ))}
        </AnimatePresence>
      </motion.div>

      {visibleProjects.length === 0 ? (
        <div className="mt-16 border-y border-line py-12 text-center">
          <p className="font-display text-3xl text-ink">
            No projects match this view yet.
          </p>
          <button
            className="mt-5 min-h-11 text-sm font-semibold text-bronze underline decoration-bronze/40 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bronze"
            onClick={() => setActiveFilter("All")}
            type="button"
          >
            View the full portfolio
          </button>
        </div>
      ) : null}
    </LayoutGroup>
  );
}
