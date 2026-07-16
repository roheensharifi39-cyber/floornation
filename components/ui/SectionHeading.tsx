import type { ReactNode } from "react";

type SectionHeadingProps = {
  title: string;
  children?: ReactNode;
  align?: "left" | "center";
  inverse?: boolean;
  className?: string;
};

export function SectionHeading({
  title,
  children,
  align = "left",
  inverse = false,
  className = "",
}: SectionHeadingProps) {
  return (
    <div
      className={`${align === "center" ? "mx-auto text-center" : ""} ${className}`}
    >
      <h2 className={`section-title ${inverse ? "text-white" : "text-ink"}`}>
        {title}
      </h2>
      {children ? (
        <div
          className={`mt-6 max-w-2xl text-base leading-7 sm:text-lg sm:leading-8 ${
            align === "center" ? "mx-auto" : ""
          } ${inverse ? "text-white/72" : "text-muted"}`}
        >
          {children}
        </div>
      ) : null}
    </div>
  );
}
