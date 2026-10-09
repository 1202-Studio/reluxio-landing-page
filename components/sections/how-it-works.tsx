import { getTranslations } from "next-intl/server";

const STEPS = ["step1", "step2", "step3"] as const;

/**
 * Three genuinely ordinal steps as ruled rows — the only numbered content on
 * the page, so the numerals stay. Numeral in the left column, step content to
 * its right; same ledger rhythm as the features section, read top to bottom.
 */
export async function HowItWorks() {
  const t = await getTranslations("how");

  return (
    <section
      id="how"
      className="relative scroll-mt-20 border-t border-white/5 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="max-w-xl font-serif text-3xl font-semibold text-balance sm:text-4xl">
          {t("heading")}
        </h2>

        <ol className="mt-14 border-t border-white/8">
          {STEPS.map((step, i) => (
            <li
              key={step}
              className="grid gap-3 border-b border-white/8 py-8 sm:grid-cols-[minmax(0,1fr)_minmax(0,4fr)] sm:gap-10"
            >
              <span
                aria-hidden
                className="font-serif text-4xl font-semibold text-foreground/30 sm:text-5xl"
              >
                0{i + 1}
              </span>
              <div className="max-w-prose">
                <h3 className="font-medium">{t(`${step}.title`)}</h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  {t(`${step}.body`)}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
