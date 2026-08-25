import type { MetadataRoute } from "next";

import { SITE_URL, navigation } from "@/config/teacher";
import { blogPosts } from "@/content/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const pages = navigation.map((item) => ({
    url: new URL(item.href, SITE_URL).toString(),
    lastModified,
    changeFrequency: "monthly" as const,
    priority: item.href === "/" ? 1 : 0.8,
  }));

  // Blog yazıları kendi yayım tarihleriyle girer; sayfa listesiyle karışmaz.
  const posts = blogPosts.map((post) => ({
    url: new URL(`/blog/${post.slug}`, SITE_URL).toString(),
    lastModified: new Date(post.publishedAt),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...pages, ...posts];
}
