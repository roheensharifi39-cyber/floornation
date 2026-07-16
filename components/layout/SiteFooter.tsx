import Link from "next/link";
import Image from "next/image";
import { Instagram, MessageCircle } from "lucide-react";
import { primaryNavigation, siteConfig } from "@/lib/site";

const footerServices = [
  "Engineered wood flooring",
  "Parquet flooring",
  "SPC & luxury vinyl",
  "Timber & WPC decking",
  "Pergolas & gazebos",
  "Custom furniture",
];

export function SiteFooter() {
  return (
    <footer className="bg-ink text-white">
      <div className="site-shell grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_1fr_1.25fr] lg:gap-10 lg:py-20">
        <div>
          <Image
            src="/brand/floor-nation-logo.png"
            alt="Floor Nation Floors and Decks Specialists shield logo"
            width={180}
            height={180}
            className="h-auto w-40 [clip-path:polygon(18%_10.5%,85%_10.5%,85%_65%,51.5%_85%,18%_65%)] sm:w-44"
          />
          <p className="mt-7 max-w-sm font-display text-2xl leading-snug text-white/92">
            Premium flooring, decking, and custom interior solutions across the UAE.
          </p>
          <Link
            href="/custom-furniture#quick-start"
            className="mt-7 inline-flex min-h-13 items-center justify-center rounded-xl bg-bronze px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-bronze-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bronze-light"
          >
            Custom Furniture Inquiry
          </Link>
          <div className="mt-5 flex gap-3">
            <SocialLink href={siteConfig.whatsapp} label="Chat with Floor Nation on WhatsApp">
              <MessageCircle className="size-4" />
            </SocialLink>
            <SocialLink href={siteConfig.instagram} label="Follow Floor Nation on Instagram">
              <Instagram className="size-4" />
            </SocialLink>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-bold text-white">Explore</h2>
          <ul className="mt-5 space-y-3 text-sm text-white/65">
            {primaryNavigation.map((item) => (
              <li key={item.href}>
                <Link className="inline-flex min-h-11 items-center transition-colors hover:text-bronze-light" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-bold text-white">Capabilities</h2>
          <ul className="mt-5 space-y-3 text-sm text-white/65">
            {footerServices.map((service) => (
              <li key={service}>{service}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-bold text-white">Dubai studio</h2>
          <address className="mt-5 space-y-1 text-sm not-italic leading-6 text-white/65">
            {siteConfig.address.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </address>
          <div className="mt-5 space-y-2 text-sm">
            <a className="flex min-h-11 items-center text-white/78 hover:text-bronze-light" href={siteConfig.phoneMobileHref}>
              {siteConfig.phoneMobile}
            </a>
            <a className="flex min-h-11 items-center text-white/78 hover:text-bronze-light" href={siteConfig.phoneOfficeHref}>
              {siteConfig.phoneOffice}
            </a>
            <a className="flex min-h-11 items-center text-white/78 hover:text-bronze-light" href={`mailto:${siteConfig.email}`}>
              {siteConfig.email}
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/12">
        <div className="site-shell flex flex-col gap-3 py-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Floor Nation Timber Trading Co. L.L.C.</p>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <Link href="/terms" className="hover:text-white">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="grid size-12 place-items-center rounded-xl border border-white/22 text-white transition-colors hover:border-bronze-light hover:text-bronze-light"
    >
      {children}
    </a>
  );
}
