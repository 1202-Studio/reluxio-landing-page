import { getTranslations } from "next-intl/server";

import { CtaLink } from "@/components/cta-link";
import { CONTACT_EMAIL, SIGNUP_URL } from "@/lib/site";

export async function FinalCta() {
  const t = await getTranslations("cta");

  return (
    <section className="relative overflow-hidden border-t border-white/5 py-28 sm:py-36">
      {/* The flow converging to a single bright point */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(50% 55% at 50% 50%, rgba(255,255,255,0.12), transparent 70%)",
        }}
      />
      <div className="texture-grain absolute inset-0 text-white/[0.03]" aria-hidden />

      {/* Static by design — the page's one orchestrated entrance is the
          showcase; the closing statement is simply there when you arrive. */}
      <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-6 px-6 text-center">
        <h2 className="font-serif text-4xl font-semibold text-balance sm:text-5xl">
          {t("heading")}
        </h2>
        <p className="text-muted-foreground text-balance leading-relaxed">
          {t("sub")}
        </p>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
          <CtaLink href={SIGNUP_URL} size="lg">
            {t("primary")}
          </CtaLink>
          <CtaLink href={`mailto:${CONTACT_EMAIL}`} variant="outline" size="lg">
            {t("secondary")}
          </CtaLink>
        </div>
      </div>
    </section>
  );
}
