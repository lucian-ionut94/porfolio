import { revalidatePath } from "next/cache";

/**
 * Revalidate all frontend pages that display project data.
 */
export function revalidateProjects() {
  revalidatePath("/[locale]", "page");
  revalidatePath("/[locale]/portfolio", "page");
  revalidatePath("/[locale]/portfolio/[slug]", "page");
}

/**
 * Revalidate all frontend pages that display article data.
 */
export function revalidateArticles() {
  revalidatePath("/[locale]", "page");
  revalidatePath("/[locale]/blog", "page");
  revalidatePath("/[locale]/blog/[slug]", "page");
}

/**
 * Revalidate all pages (translations affect everything).
 */
export function revalidateTranslations() {
  revalidatePath("/", "layout");
}

/**
 * Revalidate static pages affected by page_seo changes.
 */
export function revalidatePageSeo() {
  revalidatePath("/[locale]", "page");
  revalidatePath("/[locale]/about", "page");
  revalidatePath("/[locale]/portfolio", "page");
  revalidatePath("/[locale]/blog", "page");
  revalidatePath("/[locale]/contact", "page");
}

/**
 * Revalidate all frontend pages affected by site settings changes.
 */
export function revalidateSettings() {
  revalidatePath("/[locale]", "page");
  revalidatePath("/[locale]/about", "page");
}

/**
 * Revalidate all frontend pages that display testimonial data.
 */
export function revalidateTestimonials() {
  revalidatePath("/[locale]", "page");
}

/**
 * Revalidate all frontend pages that display experience data.
 */
export function revalidateExperiences() {
  revalidatePath("/[locale]/about", "page");
}

/**
 * Revalidate everything.
 */
export function revalidateAll() {
  revalidatePath("/", "layout");
}
