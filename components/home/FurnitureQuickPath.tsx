import Link from "next/link";
import { ArrowRight, CheckCircle2, ImageUp, MessageSquareText } from "lucide-react";

const quickSteps = [
  {
    title: "Upload a picture",
    text: "A photo, screenshot, sketch, or floor plan is enough.",
    icon: ImageUp,
  },
  {
    title: "Tell us what you need",
    text: "Answer a few simple questions about your space and idea.",
    icon: MessageSquareText,
  },
  {
    title: "Receive a custom proposal",
    text: "Our team reviews the request and guides the next steps.",
    icon: CheckCircle2,
  },
] as const;

export function FurnitureQuickPath() {
  return (
    <section aria-labelledby="furniture-quick-path-title" className="bg-canvas py-12 sm:py-16 lg:py-20">
      <div className="site-shell soft-panel overflow-hidden bg-surface lg:grid lg:grid-cols-[1.05fr_0.95fr]">
        <div className="px-5 py-10 sm:px-9 sm:py-12 lg:px-12 lg:py-16">
          <p className="text-bronze-dark text-sm font-bold">Custom furniture inquiry</p>
          <h2
            id="furniture-quick-path-title"
            className="font-display text-ink mt-3 max-w-2xl text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.02] tracking-[-0.025em]"
          >
            Start with a photo. We’ll help with the rest.
          </h2>
          <p className="text-muted mt-6 max-w-xl text-base leading-8">
            No exact measurements or technical details are needed. Share your
            idea and Floor Nation can help source or create furniture for homes,
            offices, hospitality, or outdoor spaces.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/custom-furniture#quick-start"
              className="link-arrow inline-flex min-h-14 items-center justify-center gap-3 rounded-xl bg-bronze px-6 py-4 font-bold text-white transition-colors hover:bg-bronze-dark"
            >
              <ImageUp className="size-5" aria-hidden="true" />
              Upload Your Furniture Idea
            </Link>
            <Link
              href="/services"
              className="link-arrow inline-flex min-h-14 items-center justify-center gap-3 rounded-xl border border-line bg-canvas px-6 py-4 font-bold text-ink transition-colors hover:border-bronze"
            >
              Flooring &amp; Decking
              <ArrowRight className="size-5" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <ol className="bg-surface-strong px-5 py-7 sm:px-9 lg:flex lg:flex-col lg:justify-center lg:px-10">
          {quickSteps.map(({ title, text, icon: Icon }, index) => (
            <li
              key={title}
              className={`flex gap-4 py-5 ${index > 0 ? "border-t border-ink/10" : ""}`}
            >
              <span className="bg-canvas text-bronze-dark flex size-11 shrink-0 items-center justify-center rounded-xl">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <span>
                <span className="text-ink block font-bold">{title}</span>
                <span className="text-muted mt-1 block text-sm leading-6">{text}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
