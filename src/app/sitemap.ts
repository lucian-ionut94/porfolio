import type { MetadataRoute } from "next";
import { getAllProjectSlugs } from "@/lib/queries/projects";
import { getAllArticleSlugs } from "@/lib/queries/articles";
import { siteUrl } from "@/lib/site-url";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const locales = ["ro", "en"];
  const staticPages = ["", "/about", "/portfolio", "/blog", "/contact"];

  const [projectSlugs, articleSlugs] = await Promise.all([
    getAllProjectSlugs(),
    getAllArticleSlugs(),
  ]);

  const staticEntries = locales.flatMap((locale) =>
    staticPages.map((page) => ({
      url: siteUrl(locale, page),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: page === "" ? 1.0 : 0.8,
    }))
  );

  const projectEntries = locales.flatMap((locale) =>
    projectSlugs.map((slug) => ({
      url: siteUrl(locale, `/portfolio/${slug}`),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))
  );

  const articleEntries = locales.flatMap((locale) =>
    articleSlugs.map((slug) => ({
      url: siteUrl(locale, `/blog/${slug}`),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }))
  );

  return [...staticEntries, ...projectEntries, ...articleEntries];
}
