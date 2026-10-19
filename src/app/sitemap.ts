import type { MetadataRoute } from "next";

import { SITE_URL, lessonPath, lgsListPath, navigation, routes } from "@/config/teacher";
import { LESSONS_UPDATED_AT, lessonPages } from "@/content/math-lessons";
import { getPublishedLgsLists, getPublishedPosts } from "@/lib/cms/public";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Statik içerik sürümünün tarihi; her istekte yapay bir güncelleme üretmez.
  const lastModified = new Date(LESSONS_UPDATED_AT);
  const [posts, lgsLists] = await Promise.all([getPublishedPosts(), getPublishedLgsLists()]);

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

  const lessons = [routes.lessons, ...lessonPages.map((page) => lessonPath(page.slug))].map((path) => ({
    url: new URL(path, SITE_URL).toString(),
    lastModified: new Date(LESSONS_UPDATED_AT),
    changeFrequency: "monthly" as const,
    priority: path === routes.lessons ? 0.9 : 0.8,
  }));

  const lists = lgsLists.map((list) => ({
    url: new URL(lgsListPath(list.slug), SITE_URL).toString(),
    lastModified: new Date(list.updatedAt),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...pages, ...lessons, ...articles, ...lists];
}
