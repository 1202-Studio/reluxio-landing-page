import type { Metadata } from "next";
import { Geist, Playfair_Display } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getTranslations } from "next-intl/server";
import "./globals.css";

import { cn } from "@/lib/utils";

const geist = Geist({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
});

// Brand serif — same as the main app (wordmark + editorial headings).
const playfair = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
});

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("meta");
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html
      lang={locale}
      className={cn(
        "h-full antialiased",
        "font-sans",
        geist.variable,
        playfair.variable,
      )}
    >
      <body className="flex min-h-full flex-col">
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
