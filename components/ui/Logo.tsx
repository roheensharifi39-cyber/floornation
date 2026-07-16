import Image from "next/image";
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
      className="focus-ring inline-flex items-center gap-2.5 rounded-xl leading-none"
      aria-label="Floor Nation home"
    >
      <span className="relative size-14 shrink-0 sm:size-16">
        <Image
          src="/brand/floor-nation-logo.png"
          alt=""
          fill
          priority
          sizes="64px"
          className="object-cover [clip-path:polygon(18%_10.5%,85%_10.5%,85%_65%,51.5%_85%,18%_65%)]"
        />
      </span>
      <span className="flex flex-col gap-1">
        <span className={`text-[0.82rem] font-extrabold tracking-[-0.025em] sm:text-[0.92rem] ${light ? "text-white" : "text-ink"}`}>
          FLOOR <span className={light ? "text-logo-cream" : "text-bronze-dark"}>NATION</span>
        </span>
        <span className={`hidden text-[0.68rem] font-semibold tracking-[0.04em] sm:block ${light ? "text-white/72" : "text-muted"}`}>
          Floors &amp; decks specialists
        </span>
      </span>
    </Link>
  );
}
