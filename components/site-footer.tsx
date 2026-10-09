import { getTranslations } from "next-intl/server";

import { Logo } from "@/components/brand/logo";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { LOGIN_URL, SIGNUP_URL } from "@/lib/site";

/**
 * Ft2 inline footer — a one-page site closes with a line, not a sitemap.
 * Wordmark + tagline, then every destination in a single wrapped row, then the
 * legal line. The section links the quiet nav dropped live here.
 */
export async function SiteFooter() {
  const tNav = await getTranslations("nav");
  const t = await getTranslations("footer");

  const links = [
    { href: "#features", label: tNav("features") },
    { href: "#how", label: tNav("how") },
    { href: "#pricing", label: tNav("pricing") },
    { href: LOGIN_URL, label: tNav("login") },
    { href: SIGNUP_URL, label: tNav("startSelling") },
    { href: "/terms", label: t("terms") },
    { href: "/privacy", label: t("privacy") },
  ];

  return (
    <footer className="border-t border-white/5 py-12">
      <div className="mx-auto max-w-6xl space-y-8 px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:gap-6">
          <Logo size={26} />
          <p className="text-muted-foreground text-sm">{t("tagline")}</p>
        </div>

        <nav
          aria-label={t("product")}
          className="flex flex-wrap items-baseline gap-x-7 gap-y-3 border-t border-white/5 pt-6 text-sm"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-muted-foreground hover:text-foreground whitespace-nowrap transition-colors"
            >
              {link.label}
            </a>
          ))}
          <span className="text-muted-foreground/60 ml-auto text-xs">
            {t("copyright", { year: new Date().getFullYear() })}
          </span>
          <LocaleSwitcher />
        </nav>
      </div>
    </footer>
  );
}
