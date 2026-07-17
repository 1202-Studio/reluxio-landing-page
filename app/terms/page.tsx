import type { Metadata } from "next";
import { getLocale } from "next-intl/server";

import { LegalPage } from "@/components/legal-doc";
import { legalContent, type LegalLocale } from "@/lib/legal-content";

export const metadata: Metadata = { title: "Reluxio — Terms of Service" };

export default async function TermsPage() {
  const locale = (await getLocale()) as LegalLocale;
  const doc = (legalContent[locale] ?? legalContent.vi).terms;
  return <LegalPage doc={doc} />;
}
