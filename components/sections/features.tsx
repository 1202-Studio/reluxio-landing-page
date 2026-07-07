import {
  ChartLine,
  PackageSearch,
  ReceiptText,
  Store,
  Truck,
  Users,
} from "lucide-react";
import { getTranslations } from "next-intl/server";

import { GhostNumeral } from "@/components/ghost-numeral";

const FEATURES = [
  { key: "orders", Icon: ReceiptText },
  { key: "inventory", Icon: PackageSearch },
  { key: "storefront", Icon: Store },
  { key: "shipping", Icon: Truck },
  { key: "customers", Icon: Users },
  { key: "finance", Icon: ChartLine },
] as const;

export async function Features() {
  const t = await getTranslations("features");

  return (
    <section
      id="features"
      className="relative scroll-mt-20 overflow-hidden border-t border-white/5 py-24 sm:py-32"
    >
      <GhostNumeral n="02" side="left" />
      <div className="relative mx-auto max-w-6xl px-6">
        <div data-fx="rise" className="section-reveal mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-3xl font-semibold text-balance sm:text-4xl">
            {t("heading")}
          </h2>
          <p className="text-muted-foreground mt-4">{t("sub")}</p>
        </div>

        <div data-fx-group className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ key, Icon }) => (
            <article
              key={key}
              data-fx="card"
              className="section-reveal hover-lift rounded-xl border border-white/8 bg-card p-6 transition-colors hover:border-white/20"
            >
              <span className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-white/[0.04]">
                <Icon aria-hidden className="h-5 w-5 text-foreground/80" />
              </span>
              <h3 className="mt-5 font-medium">{t(`${key}.title`)}</h3>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                {t(`${key}.body`)}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
