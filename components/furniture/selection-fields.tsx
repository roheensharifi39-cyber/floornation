"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import type { DirectionOption, IconOption } from "./options";

interface IconSelectionGridProps {
  options: IconOption[];
  selected: string[];
  onSelect: (label: string) => void;
  multiple?: boolean;
}

export function IconSelectionGrid({
  options,
  selected,
  onSelect,
  multiple = false,
}: IconSelectionGridProps) {
  return (
    <div
      className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3"
      role="group"
      aria-label={multiple ? "Select one or more options" : "Select one option"}
    >
      {options.map((option) => {
        const isSelected = selected.includes(option.label);
        const Icon = option.icon;

        return (
          <button
            key={option.label}
            type="button"
            aria-pressed={isSelected}
            onClick={() => onSelect(option.label)}
            className={`focus-ring group relative min-h-32 rounded-xl border p-4 text-left transition-colors duration-200 ${
              isSelected
                ? "border-ink bg-ink text-white"
                : "border-line bg-canvas text-ink hover:border-bronze"
            }`}
          >
            <span
              className={`mb-5 flex size-9 items-center justify-center rounded-lg border transition-colors ${
                isSelected
                  ? "border-white/20 bg-white/10 text-white"
                  : "border-line bg-surface text-bronze group-hover:border-bronze/50"
              }`}
              aria-hidden="true"
            >
              <Icon className="size-4.5" strokeWidth={1.8} />
            </span>
            <span className="block pr-7 text-base font-semibold leading-5">
              {option.label}
            </span>
            <span
              className={`mt-1.5 block text-sm leading-5 ${
                isSelected ? "text-white/70" : "text-muted"
              }`}
            >
              {option.description}
            </span>
            {isSelected && (
              <span
                className="absolute right-3.5 top-3.5 flex size-6 items-center justify-center rounded-full bg-white text-ink"
                aria-hidden="true"
              >
                <Check className="size-3.5" strokeWidth={2.5} />
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

interface DirectionGridProps {
  options: DirectionOption[];
  selected: string;
  onSelect: (label: string) => void;
}

export function DirectionGrid({
  options,
  selected,
  onSelect,
}: DirectionGridProps) {
  return (
    <div
      className="grid grid-cols-1 gap-4 sm:grid-cols-2"
      role="group"
      aria-label="Choose a design direction"
    >
      {options.map((option) => {
        const isSelected = selected === option.label;

        return (
          <button
            key={option.label}
            type="button"
            aria-pressed={isSelected}
            onClick={() => onSelect(option.label)}
            className={`focus-ring group overflow-hidden rounded-xl border text-left transition-colors duration-200 ${
              isSelected
                ? "border-bronze bg-surface"
                : "border-line bg-canvas hover:border-bronze"
            }`}
          >
            <span className="relative block aspect-[16/9] overflow-hidden bg-surface">
              <Image
                src={option.image}
                alt={option.imageAlt}
                fill
                sizes="(min-width: 1280px) 360px, (min-width: 640px) 40vw, 90vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.025]"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
              {isSelected && (
                <span className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-full bg-canvas text-ink">
                  <Check className="size-4" strokeWidth={2.5} />
                  <span className="sr-only">Selected</span>
                </span>
              )}
            </span>
            <span className="block p-4">
              <span className="text-ink block text-base font-semibold">
                {option.label}
              </span>
              <span className="text-muted mt-1 block text-sm leading-5">
                {option.description}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
