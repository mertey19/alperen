import { districtBlogPosts } from "@/content/denizli-districts";

import type { CmsPost, CmsState } from "./types";

export const DISTRICT_BLOG_MIGRATION = "denizli-district-posts-2026-10-19";

/** Eski yerel/Blob kayıtlarına ekler; editörün yazılarını ve taslaklarını korur. */
export function applyContentMigrations(state: CmsState): CmsState {
  const applied = Array.isArray(state.contentMigrations) ? state.contentMigrations : [];
  if (applied.includes(DISTRICT_BLOG_MIGRATION)) return state;

  const ids = new Set(state.posts.map((post) => post.id));
  const slugs = new Set(state.posts.map((post) => post.slug));
  const additions: CmsPost[] = districtBlogPosts
    .filter((post) => !ids.has(post.slug) && !slugs.has(post.slug))
    .map((post) => ({
      ...post,
      id: post.slug,
      published: true,
      cover: post.cover ? { ...post.cover } : null,
      sections: post.sections.map((section) => ({
        heading: section.heading,
        paragraphs: [...section.paragraphs],
      })),
      updatedAt: `${post.publishedAt}T00:00:00.000Z`,
    }));

  return {
    ...state,
    posts: [...state.posts, ...additions],
    contentMigrations: [...applied, DISTRICT_BLOG_MIGRATION],
  };
}
