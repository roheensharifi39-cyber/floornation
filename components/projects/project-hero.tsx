"use client";

import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import type { Project } from "@/data/projects";
import { useHydratedReducedMotion } from "@/lib/use-hydrated-reduced-motion";

type ProjectHeroProps = {
  readonly project: Project;
};

export function ProjectHero({ project }: ProjectHeroProps) {
  const reduceMotion = useHydratedReducedMotion();

  return (
    <section className="relative flex min-h-[82svh] items-end overflow-hidden bg-ink text-canvas md:min-h-[88svh]">
      <motion.div
        animate={{ scale: 1 }}
        className="absolute inset-0"
        initial={reduceMotion ? false : { scale: 1.035 }}
        transition={{
          duration: reduceMotion ? 0 : 1.25,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <Image
          alt={project.heroAlt}
          className="object-cover"
          fill
          priority
          sizes="100vw"
          src={project.heroImage}
        />
      </motion.div>
      <div className="absolute inset-0 bg-ink/55" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-ink/10" />

      <div className="relative mx-auto w-full max-w-[90rem] px-5 pb-12 pt-36 sm:px-8 sm:pb-16 lg:px-12 lg:pb-20">
        <motion.div
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          initial={
            reduceMotion
              ? false
              : { opacity: 0.82, y: 22, filter: "blur(5px)" }
          }
          transition={{
            delay: reduceMotion ? 0 : 0.14,
            duration: reduceMotion ? 0 : 0.72,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <Link
            className="mb-10 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-canvas/85 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bronze sm:mb-14"
            href="/projects"
          >
            <ArrowLeft aria-hidden="true" className="size-4" strokeWidth={1.7} />
            All projects
          </Link>
          <p className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm leading-6 text-canvas/85">
            <span>{project.location}</span>
            <span aria-hidden="true" className="text-bronze">
              / 
            </span>
            <span>{project.projectType}</span>
            <span aria-hidden="true" className="text-bronze">
              / 
            </span>
            <span>{project.completionYear}</span>
          </p>
          <h1 className="max-w-5xl font-display text-[clamp(3rem,7.5vw,5.75rem)] leading-[0.96] tracking-[-0.035em] text-white text-balance">
            {project.title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-canvas/85 sm:text-lg sm:leading-8">
            {project.material}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
