import { cn } from "@/lib/utils";

type CtaLinkProps = {
  href: string;
  variant?: "primary" | "outline";
  size?: "md" | "lg";
  className?: string;
  children: React.ReactNode;
};

/** Monochrome CTA link styled like the app's Button (primary / outline). */
export function CtaLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
}: CtaLinkProps) {
  return (
    <a
      href={href}
      className={cn(
        "hover-lift inline-flex items-center justify-center rounded-lg font-medium whitespace-nowrap transition-colors",
        size === "lg" ? "h-12 px-7 text-base" : "h-10 px-5 text-sm",
        variant === "primary"
          ? "bg-foreground text-background hover:bg-foreground/90"
          : "border border-foreground/20 text-foreground hover:bg-foreground/5",
        className,
      )}
    >
      {children}
    </a>
  );
}
