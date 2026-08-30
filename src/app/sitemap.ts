import type { MetadataRoute } from "next";

import { SITE_URL, lgsStatPath, navigation } from "@/config/teacher";
import { getPublishedLgsStats, getPublishedPosts } from "@/lib/cms/public";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const [posts, lgsStats] = await Promise.all([getPublishedPosts(), getPublishedLgsStats()]);

  const pages = navigation
    .filter((item) => !item.href.includes("#"))
    .map((item) => ({
      url: new URL(item.href, SITE_URL).toString(),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: item.href === "/" ? 1 : 0.8,
    }));

  const articles = posts.map((post) => ({
    url: new URL(`/blog/${post.slug}`, SITE_URL).toString(),
    lastModified: new Date(post.updatedAt || post.publishedAt),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  const stats = lgsStats.map((item) => ({
    url: new URL(lgsStatPath(item.slug), SITE_URL).toString(),
    lastModified: new Date(item.updatedAt),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...pages, ...articles, ...stats];
}
