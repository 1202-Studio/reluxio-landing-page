import { getTranslations } from "next-intl/server";

import { Logo } from "@/components/brand/logo";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { LOGIN_URL, SIGNUP_URL } from "@/lib/site";

export async function SiteFooter() {
  const tNav = await getTranslations("nav");
  const t = await getTranslations("footer");

  return (
    <footer className="border-t border-white/5 py-14">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col justify-between gap-10 sm:flex-row">
          <div className="max-w-xs">
            <Logo size={28} />
            <p className="text-muted-foreground mt-4 text-sm">{t("tagline")}</p>
          </div>

          <div className="grid grid-cols-2 gap-10 text-sm sm:gap-16">
            <div>
              <p className="text-muted-foreground/60 text-xs tracking-[0.2em] uppercase">
                {t("product")}
              </p>
              <ul className="mt-4 space-y-2.5">
                <li>
                  <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                    {tNav("features")}
                  </a>
                </li>
                <li>
                  <a href="#how" className="text-muted-foreground hover:text-foreground transition-colors">
                    {tNav("how")}
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                    {tNav("pricing")}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-muted-foreground/60 text-xs tracking-[0.2em] uppercase">
                {t("account")}
              </p>
              <ul className="mt-4 space-y-2.5">
                <li>
                  <a href={LOGIN_URL} className="text-muted-foreground hover:text-foreground transition-colors">
                    {tNav("login")}
                  </a>
                </li>
                <li>
                  <a href={SIGNUP_URL} className="text-muted-foreground hover:text-foreground transition-colors">
                    {tNav("startSelling")}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-6 sm:flex-row">
          <p className="text-muted-foreground/60 text-xs">
            {t("copyright", { year: new Date().getFullYear() })}
          </p>
          <LocaleSwitcher />
        </div>
      </div>
    </footer>
  );
}
