import { cn } from "@/lib/utils";

type LogoProps = {
  /** What to render: the monogram badge, the wordmark, or both. */
  variant?: "full" | "mark" | "wordmark";
  /** Diameter of the monogram badge in px. Wordmark scales relative to it. */
  size?: number;
  className?: string;
};

/**
 * Reluxio brand lockup — ported from the main app. Monochrome by design:
 * white badge on the landing page's dark canvas.
 */
export function Logo({ variant = "full", size = 32, className }: LogoProps) {
  const mark = (
    <span
      aria-hidden={variant === "full"}
      className="bg-foreground text-background grid shrink-0 place-items-center rounded-[0.32em] font-serif leading-none font-semibold select-none"
      style={{ width: size, height: size, fontSize: size * 0.62 }}
    >
      R
    </span>
  );

  const wordmark = (
    <span
      className="font-serif leading-none font-semibold tracking-[0.18em] uppercase"
      style={{ fontSize: size * 0.6 }}
    >
      Reluxio
    </span>
  );

  if (variant === "mark") {
    return (
      <span className={cn("inline-flex", className)} aria-label="Reluxio">
        {mark}
      </span>
    );
  }
  if (variant === "wordmark") {
    return (
      <span className={cn("inline-flex items-center", className)}>
        {wordmark}
      </span>
    );
  }

  return (
    <span
      className={cn("inline-flex items-center gap-2.5", className)}
      aria-label="Reluxio"
    >
      {mark}
      {wordmark}
    </span>
  );
}
