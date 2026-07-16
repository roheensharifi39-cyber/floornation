"use client";

import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import type { Project } from "@/data/projects";

const cardLayouts = [
  "lg:col-span-7",
  "lg:col-span-4 lg:col-start-9 lg:mt-24",
  "lg:col-span-5 lg:mt-4",
  "lg:col-span-6 lg:col-start-7 lg:mt-20",
  "lg:col-span-4 lg:col-start-2 lg:mt-2",
  "lg:col-span-6 lg:col-start-7 lg:-mt-8",
] as const;

const imageRatios = [
  "aspect-[4/3] md:aspect-[7/5]",
  "aspect-[4/3] md:aspect-[4/5]",
  "aspect-[4/3] md:aspect-[5/6]",
  "aspect-[4/3] md:aspect-[3/2]",
  "aspect-[4/3] md:aspect-[4/5]",
  "aspect-[4/3] md:aspect-[8/5]",
] as const;

type ProjectCardProps = {
  readonly project: Project;
  readonly index: number;
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  const reduceMotion = useReducedMotion();
  const layoutClass = cardLayouts[index % cardLayouts.length];
  const imageRatio = imageRatios[index % imageRatios.length];

  return (
    <motion.article
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      className={`min-w-0 md:col-span-1 ${layoutClass}`}
      exit={
        reduceMotion
          ? { opacity: 0 }
          : { opacity: 0, y: -10, filter: "blur(4px)" }
      }
      initial={
        reduceMotion
          ? { opacity: 1 }
          : { opacity: 0, y: 18, filter: "blur(6px)" }
      }
      layout
      transition={{
        duration: reduceMotion ? 0 : 0.46,
        ease: [0.22, 1, 0.36, 1],
        layout: {
          duration: reduceMotion ? 0 : 0.46,
          ease: [0.22, 1, 0.36, 1],
        },
      }}
    >
      <Link
        aria-label={`View case study: ${project.title}`}
        className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bronze"
        href={`/projects/${project.slug}`}
      >
        <div
          className={`relative overflow-hidden bg-surface ${imageRatio}`}
        >
          <Image
            alt={project.coverAlt}
            className="object-cover transition-transform ease-out motion-safe:duration-700 motion-safe:group-hover:scale-[1.025] motion-reduce:transition-none"
            fill
            sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1023px) 46vw, 58vw"
            src={project.coverImage}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-ink/0 transition-colors duration-300 group-hover:bg-ink/10"
          />
        </div>

        <div className="grid grid-cols-[1fr_auto] gap-4 border-b border-line py-5">
          <div className="min-w-0">
            <h3 className="font-display text-[clamp(1.65rem,3vw,2.35rem)] leading-[1.05] tracking-[-0.025em] text-ink text-balance">
              {project.title}
            </h3>
            <p className="mt-3 text-sm leading-6 text-muted">
              {project.location} <span aria-hidden="true">·</span>{" "}
              {project.material}
            </p>
          </div>
          <ArrowUpRight
            aria-hidden="true"
            className="mt-1 size-5 text-bronze transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            strokeWidth={1.6}
          />
        </div>
      </Link>
    </motion.article>
  );
}
