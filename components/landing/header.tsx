"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import {
  getLocalizedPath,
  locales,
  type Locale,
} from "@/lib/i18n/routes";

type HeaderProps = {
  dict: Dictionary;
  locale: Locale;
};

export function Header({ dict, locale }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#how-it-works", label: dict.nav.howItWorks },
    { href: "#why", label: dict.nav.whyAsiru },
    { href: "#faq", label: dict.nav.faq },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <nav
          className={`flex items-center justify-between rounded-2xl px-5 py-3 transition-all duration-300 ${
            scrolled ? "glass-panel-strong shadow-md" : "glass-panel"
          }`}
        >
          <Link
            href={getLocalizedPath("home", locale)}
            className="flex items-center"
            aria-label="Asiru"
          >
            <Image
              src="/logo.png"
              alt="Asiru"
              width={900}
              height={209}
              priority
              className="h-7 w-auto"
            />
          </Link>

          <div className="hidden items-center gap-8 xl:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative text-sm text-muted-foreground transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-gold after:transition-all after:duration-300 hover:text-[var(--brand-dark)] hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-4 md:flex">
            <LocaleSwitcher currentLocale={locale} />
            <a
              href="#contact"
              className="btn-premium cursor-pointer rounded-full px-5 py-2.5 text-sm font-medium"
            >
              {dict.nav.cta}
            </a>
          </div>

          <button
            type="button"
            className="cursor-pointer rounded-lg p-2 text-foreground md:hidden"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="glass-panel-strong mt-2 rounded-2xl p-5 md:hidden"
            >
              <div className="flex flex-col gap-4">
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-sm text-muted-foreground"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
                <LocaleSwitcher currentLocale={locale} />
                <a
                  href="#contact"
                  className="btn-premium rounded-full px-5 py-2.5 text-center text-sm font-medium"
                  onClick={() => setOpen(false)}
                >
                  {dict.nav.cta}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

function LocaleSwitcher({ currentLocale }: { currentLocale: Locale }) {
  return (
    <div className="flex items-center gap-1 rounded-full border border-border bg-background/80 p-1 shadow-sm backdrop-blur-sm">
      {locales.map((loc) => (
        <Link
          key={loc}
          href={
            loc === currentLocale
              ? getLocalizedPath("home", loc)
              : `${getLocalizedPath("home", loc)}?lang=${loc}`
          }
          className={`cursor-pointer rounded-full px-3 py-1 text-xs font-medium uppercase transition-colors ${
            loc === currentLocale
              ? "bg-[var(--brand-dark)] text-white"
              : "text-muted-foreground hover:text-[var(--brand-dark)]"
          }`}
        >
          {loc}
        </Link>
      ))}
    </div>
  );
}
