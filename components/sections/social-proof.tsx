import { getTranslations } from "next-intl/server";

import { GhostNumeral } from "@/components/ghost-numeral";
import { cn } from "@/lib/utils";

// NOTE: stats and quotes are placeholders — replace with real numbers and
// merchant testimonials before launch. `countTo` drives the desktop count-up
// (ScrollFx); the translated value is the SSR/no-JS/mobile fallback text.
export async function SocialProof() {
  const t = await getTranslations("proof");

  const stats = [
    { value: t("statMerchantsValue"), label: t("statMerchants"), countTo: 500, suffix: "+" },
    { value: t("statOrdersValue"), label: t("statOrders"), countTo: 12000, suffix: "+" },
    { value: t("statCarriersValue"), label: t("statCarriers"), countTo: 6, suffix: "" },
  ];

  const quotes = [
    { body: t("quote1"), author: t("quote1Author"), tilt: "sm:-rotate-[1deg]" },
    { body: t("quote2"), author: t("quote2Author"), tilt: "sm:rotate-[1deg]" },
  ];

  return (
    <section className="texture-aurora relative overflow-hidden border-t border-white/5 py-24 sm:py-32">
      <GhostNumeral n="04" side="left" />
      <div className="relative mx-auto max-w-6xl px-6">
        <h2
          data-fx="rise"
          className="section-reveal mx-auto max-w-2xl text-center font-serif text-3xl font-semibold text-balance sm:text-4xl"
        >
          {t("heading")}
        </h2>

        <dl data-fx-group className="section-reveal mt-14 grid gap-10 text-center sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} data-fx="card">
              <dd
                data-count-to={stat.countTo}
                data-count-suffix={stat.suffix}
                className="text-sheen font-serif text-5xl font-semibold tabular-nums"
              >
                {stat.value}
              </dd>
              <dt className="text-muted-foreground mt-2 text-sm tracking-wide uppercase">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>

        <div data-fx-group className="mt-16 grid gap-6 sm:grid-cols-2">
          {quotes.map((quote) => (
            <figure
              key={quote.author}
              data-fx="card"
              className={cn(
                "section-reveal hover-lift rounded-xl border border-white/8 bg-card p-7 transition-transform duration-300 hover:border-white/20 sm:hover:rotate-0",
                quote.tilt,
              )}
            >
              <blockquote className="font-serif text-lg leading-relaxed text-balance">
                “{quote.body}”
              </blockquote>
              <figcaption className="text-muted-foreground mt-4 text-sm">
                {quote.author}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
