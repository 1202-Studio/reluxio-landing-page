import { getTranslations } from "next-intl/server";

import { GhostNumeral } from "@/components/ghost-numeral";
import { cn } from "@/lib/utils";

/**
 * Browser-framed product screenshot slots. The abstract monochrome UI drawn
 * below is a deliberate placeholder — drop real app captures into these frames
 * (replace <FakeUi/> with next/image) when screenshots are ready.
 */
function BrowserFrame({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <figure
      className={cn(
        "hover-lift overflow-hidden rounded-xl border border-white/10 bg-card",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-white/5 px-4 py-2.5">
        <span className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-2 w-2 rounded-full bg-white/15" />
          ))}
        </span>
        <span className="ml-2 rounded-md bg-white/5 px-2.5 py-0.5 text-[10px] text-muted-foreground">
          reluxio · {label.toLowerCase()}
        </span>
      </div>
      <div className="relative aspect-[16/10]">{children}</div>
      <figcaption className="sr-only">{label}</figcaption>
    </figure>
  );
}

function FakeDashboard() {
  return (
    <div aria-hidden className="absolute inset-0 flex gap-3 p-4">
      <div className="hidden w-1/5 flex-col gap-2 rounded-lg bg-white/[0.03] p-3 sm:flex">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={cn("h-2 rounded-full bg-white/10", i === 0 && "bg-white/25")}
            style={{ width: `${85 - i * 9}%` }}
          />
        ))}
      </div>
      <div className="flex flex-1 flex-col gap-3">
        <div className="grid grid-cols-3 gap-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="rounded-lg bg-white/[0.05] p-3">
              <div className="h-1.5 w-1/2 rounded-full bg-white/15" />
              <div className="mt-2 h-3 w-2/3 rounded-full bg-white/30" />
            </div>
          ))}
        </div>
        <div className="flex flex-1 items-end gap-2 rounded-lg bg-white/[0.03] p-4">
          {[35, 55, 40, 70, 52, 80, 64, 90, 72, 60, 85, 95].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t-sm bg-white/20"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function FakeRows() {
  return (
    <div aria-hidden className="absolute inset-0 flex flex-col gap-2 p-4">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-3 rounded-lg bg-white/[0.04] px-3 py-2.5"
        >
          <div className="h-6 w-6 shrink-0 rounded-md bg-white/10" />
          <div className="h-2 flex-1 rounded-full bg-white/12" style={{ maxWidth: `${70 - i * 8}%` }} />
          <div className="h-4 w-12 rounded-full bg-white/8" />
        </div>
      ))}
    </div>
  );
}

function FakeCards() {
  return (
    <div aria-hidden className="absolute inset-0 grid grid-cols-3 gap-3 p-4">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="flex flex-col rounded-lg bg-white/[0.04] p-2">
          <div className="flex-1 rounded-md bg-white/8" />
          <div className="mt-2 h-1.5 w-3/4 rounded-full bg-white/15" />
          <div className="mt-1 h-1.5 w-1/3 rounded-full bg-white/25" />
        </div>
      ))}
    </div>
  );
}

export async function Showcase() {
  const t = await getTranslations("showcase");

  return (
    <section
      id="product"
      className="relative scroll-mt-20 overflow-hidden py-24 sm:py-32"
    >
      <GhostNumeral n="01" />
      <div className="relative mx-auto max-w-6xl px-6">
        <div data-fx="rise" className="section-reveal mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-3xl font-semibold text-balance sm:text-4xl">
            {t("heading")}
          </h2>
          <p className="text-muted-foreground mt-4 text-balance leading-relaxed">
            {t("sub")}
          </p>
        </div>

        <div data-fx="tilt" className="section-reveal texture-aurora mt-14 rounded-2xl p-1">
          <BrowserFrame label={t("dashboard")}>
            <FakeDashboard />
          </BrowserFrame>
        </div>

        {/* Small frames sit slightly tilted at rest and square up on hover. */}
        <div data-fx-group className="section-reveal mt-8 grid gap-6 sm:grid-cols-3">
          <div data-fx="card" className="transition-transform duration-300 sm:-rotate-[1.2deg] sm:hover:rotate-0">
            <BrowserFrame label={t("orders")}>
              <FakeRows />
            </BrowserFrame>
          </div>
          <div data-fx="card" className="transition-transform duration-300 sm:rotate-[0.8deg] sm:hover:rotate-0">
            <BrowserFrame label={t("storefront")}>
              <FakeCards />
            </BrowserFrame>
          </div>
          <div data-fx="card" className="transition-transform duration-300 sm:-rotate-[0.8deg] sm:hover:rotate-0">
            <BrowserFrame label={t("inventory")}>
              <FakeRows />
            </BrowserFrame>
          </div>
        </div>
      </div>
    </section>
  );
}
