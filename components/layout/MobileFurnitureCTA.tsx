"use client";

import Link from "next/link";
import { ImageUp, MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/site";

export function MobileFurnitureCTA() {
  const pathname = usePathname();
  const inquiryHref =
    pathname === "/custom-furniture"
      ? "#quick-start"
      : "/custom-furniture#quick-start";

  return (
    <aside
      aria-label="Quick custom furniture inquiry"
      className="fixed inset-x-2 bottom-2 z-30 flex gap-2 rounded-2xl bg-canvas p-1.5 shadow-[0_4px_8px_oklch(0.235_0.032_42/0.18)] lg:hidden"
    >
      <Link
        href={inquiryHref}
        className="focus-ring flex min-h-13 min-w-0 flex-1 items-center justify-center gap-2 rounded-xl bg-bronze px-4 text-center text-sm font-bold text-white transition-colors hover:bg-bronze-dark"
      >
        <ImageUp className="size-5 shrink-0" aria-hidden="true" />
        Upload Your Furniture Idea
      </Link>
      <a
        href={siteConfig.whatsapp}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with Floor Nation on WhatsApp"
        className="focus-ring grid size-13 shrink-0 place-items-center rounded-xl border border-line bg-surface text-ink"
      >
        <MessageCircle className="size-5" aria-hidden="true" />
      </a>
    </aside>
  );
}
