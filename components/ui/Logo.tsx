import Link from "next/link";

type LogoProps = {
  light?: boolean;
  onClick?: () => void;
};

export function Logo({ light = false, onClick }: LogoProps) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className="focus-ring inline-flex items-baseline gap-1.5 leading-none"
      aria-label="Floor Nation home"
    >
      <span
        className={`text-[1.05rem] font-extrabold tracking-[-0.055em] sm:text-[1.18rem] ${
          light ? "text-white" : "text-ink"
        }`}
      >
        FLOOR
      </span>
      <span
        className={`text-[1.05rem] font-extrabold tracking-[-0.055em] sm:text-[1.18rem] ${
          light ? "text-bronze-light" : "text-bronze"
        }`}
      >
        NATION
      </span>
    </Link>
  );
}
