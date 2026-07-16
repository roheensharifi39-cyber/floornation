"use client";

import { Moon, Sun } from "lucide-react";

const THEME_KEY = "floor-nation-theme";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const toggleTheme = () => {
    const root = document.documentElement;
    const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = nextTheme;
    root.style.colorScheme = nextTheme;
    window.localStorage.setItem(THEME_KEY, nextTheme);
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle light and dark color theme"
      title="Toggle light and dark theme"
      className={`focus-ring grid size-12 shrink-0 place-items-center rounded-xl border transition-colors ${className}`}
    >
      <Moon className="theme-icon-moon size-5" aria-hidden="true" />
      <Sun className="theme-icon-sun hidden size-5" aria-hidden="true" />
    </button>
  );
}
