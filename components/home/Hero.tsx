"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowRight, MapPin } from "lucide-react";
import { ConsultationTrigger } from "@/components/layout/ConsultationDrawer";

export function Hero() {
  const reduceMotion = useReducedMotion();
  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <section className="relative min-h-[46rem] overflow-hidden bg-ink text-white sm:min-h-[50rem] lg:min-h-[48rem] lg:h-[100svh]">
      <motion.div
        className="absolute inset-0"
        initial={false}
        animate={reduceMotion ? { scale: 1 } : { scale: [1.025, 1] }}
        transition={{ duration: reduceMotion ? 0 : 1.8, ease }}
      >
        <Image
          src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=2200&q=88"
          alt="Contemporary living room framed by warm timber walls and carefully finished flooring"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[62%_center]"
        />
      </motion.div>
      <div className="absolute inset-0 bg-ink/52" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,oklch(0.16_0.02_45/0.88)_0%,oklch(0.16_0.02_45/0.56)_42%,transparent_78%)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(to_top,oklch(0.16_0.02_45/0.55),transparent)]" />

      <div className="site-shell relative flex min-h-[46rem] flex-col justify-end pb-12 pt-32 sm:min-h-[50rem] sm:pb-16 lg:min-h-full lg:pb-16">
        <div className="max-w-4xl">
          <motion.p
            initial={false}
            animate={reduceMotion ? undefined : { opacity: [0.92, 1], y: [8, 0] }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
            className="mb-6 text-[0.72rem] font-bold uppercase tracking-[0.19em] text-white/78 sm:text-xs"
          >
            Flooring <span className="px-1 text-bronze">•</span> Decking <span className="px-1 text-bronze">•</span> Custom Interiors
          </motion.p>
          <motion.h1
            initial={false}
            animate={reduceMotion ? undefined : { opacity: [0.92, 1], y: [14, 0] }}
            transition={{ duration: 0.95, delay: 0.28, ease }}
            className="max-w-4xl font-display text-[clamp(3.35rem,8.2vw,6rem)] leading-[0.94] tracking-[-0.035em] text-white"
          >
            Surfaces and Spaces,
            <br />
            <span className="text-bronze">Made Exceptional.</span>
          </motion.h1>
          <motion.p
            initial={false}
            animate={reduceMotion ? undefined : { opacity: [0.92, 1], y: [10, 0] }}
            transition={{ duration: 0.8, delay: 0.48, ease }}
            className="mt-7 max-w-2xl text-base leading-7 text-white/78 sm:text-lg sm:leading-8"
          >
            Premium flooring, decking, outdoor structures, and custom furniture solutions for residential and commercial spaces across the UAE.
          </motion.p>
          <motion.div
            initial={false}
            animate={reduceMotion ? undefined : { opacity: [0.94, 1], y: [8, 0] }}
            transition={{ duration: 0.75, delay: 0.6, ease }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <Link
              href="/projects"
              className="link-arrow inline-flex min-h-13 items-center justify-center gap-3 bg-bronze px-6 py-3.5 font-bold text-white transition-colors hover:bg-bronze-dark"
            >
              Explore Our Work
              <ArrowRight className="size-5" aria-hidden="true" />
            </Link>
            <ConsultationTrigger className="inline-flex min-h-13 items-center justify-center border border-white/45 px-6 py-3.5 font-bold text-white transition-colors hover:border-white hover:bg-white/10">
              Request a Consultation
            </ConsultationTrigger>
          </motion.div>
        </div>

        <motion.div
          initial={false}
          animate={reduceMotion ? undefined : { opacity: [0.9, 1] }}
          transition={{ delay: 0.85, duration: 0.8 }}
          className="mt-12 flex flex-col gap-5 border-t border-white/22 pt-5 text-xs font-semibold text-white/68 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <span>20+ Years of Combined Experience</span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="size-3.5 text-bronze" aria-hidden="true" />
              Dubai, United Arab Emirates
            </span>
          </div>
          <a href="#expertise" className="hidden items-center gap-2 transition-colors hover:text-white md:inline-flex">
            Discover our expertise
            <motion.span
              animate={reduceMotion ? undefined : { y: [0, 5, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowDown className="size-4" aria-hidden="true" />
            </motion.span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
