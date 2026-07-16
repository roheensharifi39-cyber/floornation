import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const steps = [
  {
    title: "Consultation",
    copy: "We understand the property, usage, style, and technical requirements.",
  },
  {
    title: "Material Selection",
    copy: "Choose the right flooring, decking, finish, or furniture direction with practical guidance.",
  },
  {
    title: "Proposal",
    copy: "Floor Nation prepares recommendations, pricing, and a clear project scope.",
  },
  {
    title: "Delivery & Installation",
    copy: "Our team coordinates sourcing, customization, delivery, and professional execution.",
  },
];

export function Process() {
  return (
    <section className="section-space bg-canvas">
      <div className="site-shell">
        <Reveal>
          <div className="grid gap-7 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <SectionHeading title="One Team, From Idea to Installation" />
            <p className="max-w-xl text-muted lg:justify-self-end">
              A clear, collaborative process keeps design intent and technical delivery aligned from the first conversation.
            </p>
          </div>
        </Reveal>

        <ol className="relative ml-3 mt-14 border-l border-line pl-8 lg:ml-0 lg:mt-20 lg:grid lg:grid-cols-4 lg:border-l-0 lg:border-t lg:pl-0">
          {steps.map((step, index) => (
            <Reveal key={step.title} delay={index * 0.07}>
              <li
                className={`relative pr-2 pt-1 lg:min-h-56 lg:border-r lg:pt-8 ${
                  index === 0 ? "lg:pl-0 lg:pr-6" : "lg:px-6"
                } ${index === steps.length - 1 ? "pb-0 lg:border-r-0 lg:pr-0" : "pb-10"}`}
              >
                <span
                  className={`absolute -left-[2.45rem] top-0 grid size-5 place-items-center rounded-full bg-bronze text-[0.62rem] font-extrabold text-white lg:-top-3 lg:left-6 lg:h-6 lg:w-auto lg:min-w-9 lg:rounded-none lg:bg-canvas lg:pr-2 lg:text-xs lg:text-bronze ${
                    index === 0 ? "lg:left-0" : ""
                  }`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-[1.72rem] leading-tight text-ink">{step.title}</h3>
                <p className="mt-4 text-sm leading-6 text-muted">{step.copy}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
