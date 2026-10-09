import { getTranslations } from "next-intl/server";

import { Logo } from "@/components/brand/logo";
import { CtaLink } from "@/components/cta-link";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { LOGIN_URL, SIGNUP_URL } from "@/lib/site";

/**
 * N9 edge-aligned quiet nav — wordmark hard-left, actions hard-right, nothing
 * between. The page is one continuous read; its section links live in the
 * footer line, not in a chrome bar. A soft gradient scrim (no border, no card)
 * keeps the wordmark legible over the hero without drawing a box.
 */
export async function SiteNav() {
  const t = await getTranslations("nav");

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-gradient-to-b from-background/80 to-transparent">
      <nav className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
        <a href="#top" aria-label="Reluxio">
          <Logo size={28} />
        </a>

        <div className="flex items-center gap-5">
          <LocaleSwitcher className="hidden sm:inline-flex" />
          <a
            href={LOGIN_URL}
            className="text-muted-foreground hover:text-foreground hidden text-sm transition-colors sm:block"
          >
            {t("login")}
          </a>
          <CtaLink href={SIGNUP_URL}>{t("startSelling")}</CtaLink>
        </div>
      </nav>
    </header>
  );
}
