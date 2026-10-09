import { getTranslations } from "next-intl/server";

const FEATURES = [
  "orders",
  "inventory",
  "storefront",
  "shipping",
  "customers",
  "finance",
] as const;

/**
 * The ledger — features as ruled entries, not icon tiles. A bookkeeping
 * product's feature list should read like the thing it replaces: serif entry
 * name in the left column, one plain line in the right, a hairline between
 * rows. Left-biased; no cards, no icons, no per-row reveal.
 */
export async function Features() {
  const t = await getTranslations("features");

  return (
    <section
      id="features"
      className="relative scroll-mt-20 border-t border-white/5 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-xl">
          <h2 className="font-serif text-3xl font-semibold text-balance sm:text-4xl">
            {t("heading")}
          </h2>
          <p className="text-muted-foreground mt-4">{t("sub")}</p>
        </div>

        <dl className="mt-14 border-t border-white/8">
          {FEATURES.map((key) => (
            <div
              key={key}
              className="group grid gap-2 border-b border-white/8 py-6 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] sm:gap-10 sm:py-7"
            >
              <dt className="font-serif text-xl font-medium text-foreground/80 transition-colors group-hover:text-foreground sm:text-2xl">
                {t(`${key}.title`)}
              </dt>
              <dd className="text-muted-foreground max-w-prose self-center text-sm leading-relaxed">
                {t(`${key}.body`)}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
