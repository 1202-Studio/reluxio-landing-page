import { Check } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { CtaLink } from "@/components/cta-link";
import { GhostNumeral } from "@/components/ghost-numeral";
import { SIGNUP_URL } from "@/lib/site";
import { cn } from "@/lib/utils";

function Tier({
  name,
  badge,
  price,
  period,
  desc,
  features,
  cta,
  highlighted = false,
}: {
  name: string;
  badge?: string;
  price: string;
  period: string;
  desc: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
}) {
  return (
    <article
      data-fx="card"
      className={cn(
        "section-reveal hover-lift relative flex flex-col rounded-2xl border p-8",
        highlighted
          ? "border-white/25 bg-gradient-to-b from-white/[0.07] to-transparent"
          : "border-white/8 bg-card",
      )}
    >
      {badge && (
        <span className="bg-foreground text-background absolute -top-3 left-8 rounded-full px-3 py-1 text-[10px] font-semibold tracking-[0.15em] uppercase">
          {badge}
        </span>
      )}
      <h3 className="font-serif text-xl font-semibold">{name}</h3>
      <p className="text-muted-foreground mt-1 text-sm">{desc}</p>
      <p className="mt-6 flex items-baseline gap-2">
        <span className="text-sheen font-serif text-4xl font-semibold">{price}</span>
        <span className="text-muted-foreground text-sm">/ {period}</span>
      </p>
      <ul className="mt-7 flex-1 space-y-3">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-sm">
            <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-foreground/70" />
            <span className="text-muted-foreground">{feature}</span>
          </li>
        ))}
      </ul>
      <CtaLink
        href={SIGNUP_URL}
        variant={highlighted ? "primary" : "outline"}
        className="mt-8 w-full"
      >
        {cta}
      </CtaLink>
    </article>
  );
}

export async function Pricing() {
  const t = await getTranslations("pricing");

  return (
    <section
      id="pricing"
      className="relative scroll-mt-20 overflow-hidden border-t border-white/5 py-24 sm:py-32"
    >
      <GhostNumeral n="05" />
      <div className="relative mx-auto max-w-6xl px-6">
        <div data-fx="rise" className="section-reveal mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-3xl font-semibold text-balance sm:text-4xl">
            {t("heading")}
          </h2>
          <p className="text-muted-foreground mt-4">{t("sub")}</p>
        </div>

        <div data-fx-group className="mx-auto mt-14 grid max-w-3xl gap-6 sm:grid-cols-2">
          <Tier
            name={t("free.name")}
            price={t("free.price")}
            period={t("free.period")}
            desc={t("free.desc")}
            features={[t("free.f1"), t("free.f2"), t("free.f3"), t("free.f4")]}
            cta={t("free.cta")}
          />
          <Tier
            name={t("premium.name")}
            badge={t("premium.badge")}
            price={t("premium.price")}
            period={t("premium.period")}
            desc={t("premium.desc")}
            features={[
              t("premium.f1"),
              t("premium.f2"),
              t("premium.f3"),
              t("premium.f4"),
              t("premium.f5"),
            ]}
            cta={t("premium.cta")}
            highlighted
          />
        </div>

        <p className="text-muted-foreground/60 mt-8 text-center text-xs">
          {t("note")}
        </p>
      </div>
    </section>
  );
}
