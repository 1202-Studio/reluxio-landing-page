import { getTranslations } from "next-intl/server";

// Placeholder carrier marks — swap for real logos when partnerships are inked.
const CARRIERS = [
  "GHN",
  "GHTK",
  "Viettel Post",
  "VNPost",
  "J&T Express",
  "Ninja Van",
];

function CarrierRow({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <ul
      aria-hidden={ariaHidden || undefined}
      className={
        ariaHidden
          ? "hidden shrink-0 items-center gap-x-16 pr-16 motion-safe:flex"
          : "flex shrink-0 flex-wrap items-center justify-center gap-x-10 gap-y-4 motion-safe:flex-nowrap motion-safe:justify-start motion-safe:gap-x-16 motion-safe:pr-16"
      }
    >
      {CARRIERS.map((name) => (
        <li
          key={name}
          className="text-muted-foreground font-serif text-lg font-medium tracking-wide whitespace-nowrap opacity-70"
        >
          {name}
        </li>
      ))}
    </ul>
  );
}

export async function TrustStrip() {
  const t = await getTranslations("trust");

  return (
    <section className="section-reveal border-y border-white/5 py-10">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <p
          data-fx="rise"
          className="text-muted-foreground/70 text-xs tracking-[0.25em] uppercase"
        >
          {t("heading")}
        </p>
        {/* Infinite marquee (motion-safe); wraps to a static list otherwise. */}
        <div className="marquee-mask mt-6 overflow-hidden">
          {/* .animate-marquee is gated by prefers-reduced-motion in globals.css */}
          <div className="animate-marquee flex motion-safe:w-max">
            <CarrierRow />
            <CarrierRow ariaHidden />
          </div>
        </div>
      </div>
    </section>
  );
}
