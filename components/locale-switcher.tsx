"use client";

import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

import { LOCALES, LOCALE_COOKIE, type Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

/** Cookie-based locale toggle (same NEXT_LOCALE convention as the main app). */
export function LocaleSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const router = useRouter();

  function switchTo(next: Locale) {
    if (next === locale) return;
    document.cookie = `${LOCALE_COOKIE}=${next};path=/;max-age=31536000;samesite=lax`;
    router.refresh();
  }

  return (
    <div
      className={cn(
        "border-border inline-flex items-center rounded-full border p-0.5 text-xs",
        className,
      )}
    >
      {LOCALES.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => switchTo(l)}
          aria-pressed={l === locale}
          className={cn(
            "rounded-full px-2.5 py-1 font-medium uppercase transition-colors",
            l === locale
              ? "bg-foreground text-background"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
