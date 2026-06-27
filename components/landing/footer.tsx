import Link from "next/link";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { getLocalizedPath, type Locale } from "@/lib/i18n/routes";

type FooterProps = {
  dict: Dictionary;
  locale: Locale;
};

export function Footer({ dict, locale }: FooterProps) {
  const navLinks = [
    { href: "#product", label: dict.nav.product },
    { href: "#how-it-works", label: dict.nav.howItWorks },
    { href: "#for-business", label: dict.nav.forBusiness },
    { href: "#cases", label: dict.nav.cases },
    { href: "#calculator", label: dict.nav.calculator },
    { href: "#faq", label: dict.nav.faq },
    { href: "#contact", label: dict.nav.contact },
  ];

  return (
    <footer className="border-t border-border bg-muted py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <Link
              href={getLocalizedPath("home", locale)}
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white">
                A
              </span>
              Asiru
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              {dict.footer.tagline}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
              {dict.footer.navigation}
            </h4>
            <ul className="mt-4 space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
              {dict.footer.legal}
            </h4>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {dict.footer.privacy}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {dict.footer.terms}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          {dict.footer.rights}
        </div>
      </div>
    </footer>
  );
}
