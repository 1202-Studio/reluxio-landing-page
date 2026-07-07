import { cookies } from "next/headers";
import { getRequestConfig } from "next-intl/server";

import { DEFAULT_LOCALE, LOCALE_COOKIE, isLocale } from "./config";

/**
 * Resolves the active locale from the NEXT_LOCALE cookie (no URL-prefixed
 * routing — same convention as the main Reluxio app) and loads the matching
 * message catalog.
 */
export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get(LOCALE_COOKIE)?.value;
  const locale = isLocale(cookieLocale) ? cookieLocale : DEFAULT_LOCALE;

  const messages = (await import(`../messages/${locale}.json`)).default;

  return { locale, messages };
});
