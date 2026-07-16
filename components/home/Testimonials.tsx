import { Quote } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const testimonials = [
  {
    quote: "The team helped us compare finishes in the actual light of the villa, then delivered a floor that feels completely integrated with the architecture.",
    client: "Villa homeowner",
    context: "Residential flooring presentation",
  },
  {
    quote: "They understood that the detail mattered as much as the product—the thresholds, board direction, and sample coordination were handled with real care.",
    client: "Interior designer",
    context: "Private residence presentation",
  },
  {
    quote: "Floor Nation gave us one clear scope across supply, custom elements, and installation, which made a demanding commercial programme much easier to control.",
    client: "Commercial project manager",
    context: "Workplace fit-out presentation",
  },
];

export function Testimonials() {
  return (
    <section className="section-space bg-canvas">
      <div className="site-shell">
        <Reveal>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading title="Trusted in the Details" />
            <p className="max-w-sm text-xs leading-5 text-muted">
              Illustrative presentation content for this website demo; not published or independently verified reviews.
            </p>
          </div>
        </Reveal>
        <div className="mt-14 grid border-y border-line md:grid-cols-3 lg:mt-16">
          {testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.client} delay={index * 0.08}>
              <figure
                className={`flex min-h-[22rem] flex-col px-1 py-8 md:border-b-0 md:border-r md:px-7 md:py-10 lg:px-10 ${
                  index === testimonials.length - 1
                    ? "border-b-0 md:border-r-0"
                    : "border-b border-line"
                }`}
              >
                <Quote className="size-7 text-bronze" strokeWidth={1.5} aria-hidden="true" />
                <blockquote className="mt-8 font-display text-[1.45rem] leading-[1.35] text-ink">
                  “{testimonial.quote}”
                </blockquote>
                <figcaption className="mt-auto pt-8">
                  <p className="text-sm font-bold text-ink">{testimonial.client}</p>
                  <p className="mt-1 text-xs text-muted">{testimonial.context}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
