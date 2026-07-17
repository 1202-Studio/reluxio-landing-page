import type { Metadata } from "next";
import { getLocale } from "next-intl/server";

import { LegalPage } from "@/components/legal-doc";
import { legalContent, type LegalLocale } from "@/lib/legal-content";

export const metadata: Metadata = { title: "Reluxio — Privacy Policy" };

export default async function PrivacyPage() {
  const locale = (await getLocale()) as LegalLocale;
  const doc = (legalContent[locale] ?? legalContent.vi).privacy;
  return <LegalPage doc={doc} />;
}
