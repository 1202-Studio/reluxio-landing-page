import { getTranslations } from "next-intl/server";

// The carriers the app actually deep-links for tracking (GHN codes, pasted
// Grab/Ahamove links, ViettelPost estimator). A capability list, not a logo
// wall — no partnership implied, so no marks, no marquee.
const CARRIERS = ["GHN", "Viettel Post", "Grab", "Ahamove"];

export async function TrustStrip() {
  const t = await getTranslations("trust");

  return (
    <section className="border-y border-white/5 py-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 sm:flex-row sm:items-baseline sm:justify-between">
        <p className="text-muted-foreground/70 text-xs tracking-[0.25em] uppercase">
          {t("heading")}
        </p>
        <ul className="flex flex-wrap items-baseline gap-x-8 gap-y-2">
          {CARRIERS.map((name) => (
            <li
              key={name}
              className="text-muted-foreground font-serif text-lg font-medium tracking-wide whitespace-nowrap"
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
