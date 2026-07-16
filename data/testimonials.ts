export interface Testimonial {
  readonly quote: string;
  readonly client: string;
  readonly context: string;
}

export const testimonials: readonly Testimonial[] = [
  {
    quote:
      "The team helped us compare finishes in the actual light of the villa, then delivered a floor that feels completely integrated with the architecture.",
    client: "Villa homeowner",
    context: "Residential flooring presentation",
  },
  {
    quote:
      "They understood that the detail mattered as much as the product—the thresholds, board direction, and sample coordination were handled with real care.",
    client: "Interior designer",
    context: "Private residence presentation",
  },
  {
    quote:
      "Floor Nation gave us one clear scope across supply, custom elements, and installation, which made a demanding commercial programme much easier to control.",
    client: "Commercial project manager",
    context: "Workplace fit-out presentation",
  },
];
