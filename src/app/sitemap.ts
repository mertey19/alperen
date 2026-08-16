import type { MetadataRoute } from "next";

import { SITE_URL, navigation } from "@/config/teacher";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return navigation.map((item) => ({
    url: new URL(item.href, SITE_URL).toString(),
    lastModified,
    changeFrequency: "monthly" as const,
    priority: item.href === "/" ? 1 : 0.8,
  }));
}
