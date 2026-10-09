import { Check } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { CtaLink } from "@/components/cta-link";
import { SIGNUP_URL } from "@/lib/site";

/**
 * Pricing as a statement, not a comparison grid. There are two tiers and one
 * of them is free — so the free tier is a ruled line you read, and premium is
 * the single object on the page. Left-biased head; the card is the only
 * lifted surface in the section.
 */
export async function Pricing() {
  const t = await getTranslations("pricing");

  const freeFeatures = [t("free.f1"), t("free.f2"), t("free.f3"), t("free.f4")];
  const premiumFeatures = [
    t("premium.f1"),
    t("premium.f2"),
    t("premium.f3"),
    t("premium.f4"),
    t("premium.f5"),
  ];

  return (
    <section
      id="pricing"
      className="relative scroll-mt-20 border-t border-white/5 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-xl">
          <h2 className="font-serif text-3xl font-semibold text-balance sm:text-4xl">
            {t("heading")}
          </h2>
          <p className="text-muted-foreground mt-4">{t("sub")}</p>
        </div>

        {/* Free tier — a ledger row, not a card. */}
        <div className="mt-14 grid gap-4 border-y border-white/8 py-7 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)_auto] sm:items-center sm:gap-10">
          <div>
            <h3 className="font-serif text-xl font-medium">{t("free.name")}</h3>
            <p className="text-muted-foreground mt-1 text-sm">{t("free.desc")}</p>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {freeFeatures.join(" · ")}
          </p>
          <CtaLink href={SIGNUP_URL} variant="outline">
            {t("free.cta")}
          </CtaLink>
        </div>

        {/* Premium — the single object. */}
        <article className="hover-lift mt-10 max-w-3xl rounded-2xl border border-white/25 bg-gradient-to-b from-white/[0.07] to-transparent p-8 sm:p-10">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <div>
              <span className="bg-foreground text-background rounded-full px-3 py-1 text-[10px] font-semibold tracking-[0.15em] uppercase">
                {t("premium.badge")}
              </span>
              <h3 className="mt-4 font-serif text-2xl font-semibold">
                {t("premium.name")}
              </h3>
              <p className="text-muted-foreground mt-1 text-sm">
                {t("premium.desc")}
              </p>
            </div>
            <p className="flex items-baseline gap-2">
              <span className="font-serif text-4xl font-semibold sm:text-5xl">
                {t("premium.price")}
              </span>
              <span className="text-muted-foreground text-sm">
                / {t("premium.period")}
              </span>
            </p>
          </div>

          <ul className="mt-8 grid gap-x-10 gap-y-3 sm:grid-cols-2">
            {premiumFeatures.map((feature) => (
              <li key={feature} className="flex items-start gap-2.5 text-sm">
                <Check
                  aria-hidden
                  className="mt-0.5 h-4 w-4 shrink-0 text-foreground/70"
                />
                <span className="text-muted-foreground">{feature}</span>
              </li>
            ))}
          </ul>

          <CtaLink href={SIGNUP_URL} className="mt-9 w-full sm:w-auto">
            {t("premium.cta")}
          </CtaLink>
        </article>

        <p className="text-muted-foreground/60 mt-8 text-xs">{t("note")}</p>
      </div>
    </section>
  );
}
