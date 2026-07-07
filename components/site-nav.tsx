import { getTranslations } from "next-intl/server";

import { Logo } from "@/components/brand/logo";
import { CtaLink } from "@/components/cta-link";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { LOGIN_URL, SIGNUP_URL } from "@/lib/site";

export async function SiteNav() {
  const t = await getTranslations("nav");

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-background/70 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6">
        <a href="#top" aria-label="Reluxio">
          <Logo size={28} />
        </a>

        <div className="text-muted-foreground hidden items-center gap-7 text-sm md:flex">
          <a href="#product" className="hover:text-foreground transition-colors">
            {t("product")}
          </a>
          <a href="#features" className="hover:text-foreground transition-colors">
            {t("features")}
          </a>
          <a href="#how" className="hover:text-foreground transition-colors">
            {t("how")}
          </a>
          <a href="#pricing" className="hover:text-foreground transition-colors">
            {t("pricing")}
          </a>
        </div>

        <div className="flex items-center gap-3">
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
