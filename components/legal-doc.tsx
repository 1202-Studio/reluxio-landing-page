import Link from "next/link";

import { Logo } from "@/components/brand/logo";
import type { LegalDoc } from "@/lib/legal-content";

/**
 * Shared chrome + prose rendering for the legal pages (/terms, /privacy).
 * Mirrors components/legal/legal-doc.tsx in the main app repo.
 */
export function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-white/5">
        <div className="mx-auto flex h-16 w-full max-w-3xl items-center px-6">
          <Link href="/" className="transition-opacity hover:opacity-80">
            <Logo size={26} />
          </Link>
        </div>
      </header>
      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-12">
        <article>
          <h1 className="font-serif text-3xl font-semibold tracking-tight">
            {doc.title}
          </h1>
          <p className="text-muted-foreground mt-2 text-sm">
            {doc.updatedLabel}
          </p>
          <p className="text-muted-foreground mt-6 leading-relaxed">
            {doc.intro}
          </p>

          <div className="mt-8 space-y-8">
            {doc.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-lg font-semibold">{section.heading}</h2>
                <div className="mt-2 space-y-3">
                  {section.body.map((paragraph, i) => (
                    <p
                      key={i}
                      className="text-muted-foreground text-[15px] leading-relaxed"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </article>
      </main>
    </div>
  );
}
