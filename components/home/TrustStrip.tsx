import { Building2, Hammer, Map, Ruler, ShieldCheck } from "lucide-react";

const trustPoints = [
  { label: "20+ years combined experience", icon: ShieldCheck },
  { label: "Residential and commercial", icon: Building2 },
  { label: "Supply and installation", icon: Hammer },
  { label: "Custom-made solutions", icon: Ruler },
  { label: "UAE-wide project support", icon: Map },
];

export function TrustStrip() {
  return (
    <section aria-label="Floor Nation capabilities" className="border-b border-line bg-canvas">
      <div className="site-shell grid grid-cols-2 py-2 sm:grid-cols-3 lg:grid-cols-5 lg:py-0">
        {trustPoints.map(({ label, icon: Icon }, index) => (
          <div
            key={label}
            className={`flex min-h-24 items-center gap-3 px-2 py-4 text-[0.72rem] font-bold leading-5 text-ink sm:px-4 lg:min-h-28 lg:border-l lg:border-line lg:px-5 ${
              index === trustPoints.length - 1 ? "col-span-2 sm:col-span-1 lg:border-r" : ""
            }`}
          >
            <Icon className="size-4 shrink-0 text-bronze" strokeWidth={1.8} aria-hidden="true" />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
