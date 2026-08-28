import { factValue, teacher } from "@/config/teacher";
import { faqs as staticFaqs } from "@/content/copy";
import { blogPosts } from "@/content/blog";
import { gallery } from "@/content/gallery";

import type { CmsGalleryItem, CmsPost, CmsSettings, CmsState } from "./types";
import { CMS_VERSION } from "./types";

function filenameId(src: string): string {
  const name = src.split("/").pop() ?? src;
  return name.replace(/\.[^.]+$/, "");
}

function seedPosts(): CmsPost[] {
  const now = new Date().toISOString();
  return blogPosts.map((post) => ({
    id: post.slug,
    slug: post.slug,
    title: post.title,
    description: post.description,
    publishedAt: post.publishedAt,
    published: true,
    cover: post.cover ? { src: post.cover.src, alt: post.cover.alt } : null,
    intro: post.intro,
    sections: post.sections.map((section) => ({
      heading: section.heading,
      paragraphs: [...section.paragraphs],
    })),
    closing: post.closing,
    updatedAt: now,
  }));
}

function seedGallery(): CmsGalleryItem[] {
  return gallery.map((item) => ({
    id: filenameId(item.src),
    src: item.src,
    alt: item.alt,
    title: item.title,
    category: item.category,
    aspect: item.aspect,
    featured: Boolean(item.featured),
    inSlider: item.aspect === "landscape",
  }));
}

function seedSettings(): CmsSettings {
  return {
    whatsapp: factValue(teacher.contact.whatsapp) ?? "",
    phone: factValue(teacher.contact.phone) ?? "",
    email: factValue(teacher.contact.email) ?? "",
    instagram: factValue(teacher.contact.instagram) ?? "",
    availability: factValue(teacher.contact.availability) ?? "",
    location: factValue(teacher.location) ?? "",
    gradeRange: factValue(teacher.gradeRange) ?? "",
    audience: factValue(teacher.audience) ?? "",
    subjects: [...(factValue(teacher.subjects) ?? [])],
    examPrep: [...(factValue(teacher.examPrep) ?? [])],
    lessonFormat: [...(factValue(teacher.lessonFormat) ?? [])],
    education: [...(factValue(teacher.education) ?? [])],
    experience: [...(factValue(teacher.experience) ?? [])],
    introduction: [...(factValue(teacher.introduction) ?? [])],
  };
}

export function seedState(): CmsState {
  return {
    version: CMS_VERSION,
    posts: seedPosts(),
    gallery: seedGallery(),
    testimonials: [],
    faqs: staticFaqs.map((item, index) => ({
      id: `faq-static-${index + 1}`,
      question: item.question,
      answer: item.answer,
    })),
    settings: seedSettings(),
  };
}
