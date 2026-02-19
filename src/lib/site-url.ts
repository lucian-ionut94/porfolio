import { getPathname } from "@/i18n/navigation";
import type { routing } from "@/i18n/routing";

export const BASE_URL = "https://lucianionut.ro";
const DEFAULT_LOCALE = "ro";

type Locale = (typeof routing.locales)[number];

/** Generates an absolute URL using the locale-specific path via next-intl pathnames.
 *  Accepts the internal path key (e.g. "/about") and resolves it to the public URL.
 *  Default locale (ro) → no prefix: /despre
 *  Other locales (en)  → with prefix: /en/about
 */
export function siteUrl(locale: string, path: string = ""): string {
  if (!path) {
    const prefix = locale === DEFAULT_LOCALE ? "" : `/${locale}`;
    return `${BASE_URL}${prefix}`;
  }

  try {
    const localizedPath = getPathname({
      locale: locale as Locale,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      href: path as any,
    });
    const prefix = locale === DEFAULT_LOCALE ? "" : `/${locale}`;
    return `${BASE_URL}${prefix}${localizedPath}`;
  } catch {
    // Fallback for dynamic paths not in pathnames (e.g. /blog/some-slug)
    const prefix = locale === DEFAULT_LOCALE ? "" : `/${locale}`;
    return `${BASE_URL}${prefix}${path}`;
  }
}
