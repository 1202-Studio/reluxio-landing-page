import { cn } from "@/lib/utils";

/**
 * Giant editorial section numeral (fourmula.ai-style), barely-there white on
 * black. Decorative only; drifts with a parallax scrub via data-fx="ghost".
 * The parent section must be `relative overflow-hidden`.
 */
export function GhostNumeral({
  n,
  side = "right",
}: {
  n: string;
  side?: "left" | "right";
}) {
  return (
    <span
      aria-hidden
      data-fx="ghost"
      className={cn(
        "pointer-events-none absolute -top-8 font-serif text-[9rem] leading-none font-semibold text-white/[0.05] select-none sm:text-[14rem]",
        side === "right" ? "right-2 sm:right-8" : "left-2 sm:left-8",
      )}
    >
      {n}
    </span>
  );
}
