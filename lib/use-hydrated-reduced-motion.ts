"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/** Keeps server and first-client animation props identical during hydration. */
export function useHydratedReducedMotion() {
  const prefersReducedMotion = useReducedMotion();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => setHydrated(true), []);

  return hydrated && Boolean(prefersReducedMotion);
}
