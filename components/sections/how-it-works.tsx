import { getTranslations } from "next-intl/server";

import { GhostNumeral } from "@/components/ghost-numeral";

const STEPS = ["step1", "step2", "step3"] as const;

export async function HowItWorks() {
  const t = await getTranslations("how");

  return (
    <section
      id="how"
      className="relative scroll-mt-20 overflow-hidden border-t border-white/5 py-24 sm:py-32"
    >
      <GhostNumeral n="03" />
      <div className="relative mx-auto max-w-6xl px-6">
        <h2
          data-fx="rise"
          className="section-reveal mx-auto max-w-2xl text-center font-serif text-3xl font-semibold text-balance sm:text-4xl"
        >
          {t("heading")}
        </h2>

        <ol data-fx-group className="mt-14 grid gap-10 sm:grid-cols-3 sm:gap-6">
          {STEPS.map((step, i) => (
            <li
              key={step}
              data-fx="card"
              className="section-reveal relative text-center sm:text-left"
            >
              {/* Connector line between steps (desktop); draws in on scroll. */}
              {i < STEPS.length - 1 && (
                <span
                  aria-hidden
                  data-fx="draw"
                  className="absolute top-7 left-[calc(50%+3rem)] hidden h-px w-[calc(100%-3rem)] bg-gradient-to-r from-white/20 to-white/5 sm:left-20 sm:block sm:w-[calc(100%-4rem)]"
                />
              )}
              <span className="text-sheen font-serif text-5xl font-semibold">
                0{i + 1}
              </span>
              <h3 className="mt-4 font-medium">{t(`${step}.title`)}</h3>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                {t(`${step}.body`)}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
