import { confirmed, factValue, teacher, type Fact } from "@/config/teacher";
import type { GalleryItem } from "@/content/gallery";

import { readCms } from "./store";
import type { CmsPost, CmsSettings } from "./types";

export async function getPublishedPosts(): Promise<CmsPost[]> {
  const cms = await readCms();
  return cms.posts
    .filter((post) => post.published)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export async function getPublishedPost(slug: string): Promise<CmsPost | null> {
  const cms = await readCms();
  return cms.posts.find((post) => post.published && post.slug === slug) ?? null;
}

export async function getGalleryItems(): Promise<GalleryItem[]> {
  const cms = await readCms();
  return cms.gallery.map((item) => ({
    src: item.src,
    alt: item.alt,
    title: item.title,
    category: item.category,
    aspect: item.aspect,
    featured: item.featured,
  }));
}

export async function getSliderItems(): Promise<GalleryItem[]> {
  const cms = await readCms();
  return cms.gallery
    .filter((item) => item.inSlider)
    .map((item) => ({
      src: item.src,
      alt: item.alt,
      title: item.title,
      category: item.category,
      aspect: item.aspect,
      featured: item.featured,
    }));
}

export async function getTestimonials() {
  const cms = await readCms();
  return cms.testimonials;
}

export async function getSettings(): Promise<CmsSettings> {
  const cms = await readCms();
  return cms.settings;
}

export type ContactLinks = {
  whatsappUrl: string | null;
  phoneHref: string | null;
  emailHref: string | null;
  instagramUrl: string | null;
  phoneDisplay: string | null;
  emailDisplay: string | null;
  instagramHandle: string | null;
  availability: string | null;
};

function textFact(value: string, fallback: Fact<string>): Fact<string> {
  const trimmed = value.trim();
  if (trimmed) return confirmed(trimmed);
  return fallback;
}

function listFact(value: readonly string[], fallback: Fact<readonly string[]>): Fact<readonly string[]> {
  const items = value.map((item) => item.trim()).filter(Boolean);
  if (items.length > 0) return confirmed(items);
  return fallback;
}

export async function getTeacherFacts() {
  const s = await getSettings();
  return {
    audience: textFact(s.audience, teacher.audience),
    subjects: listFact(s.subjects, teacher.subjects),
    gradeRange: textFact(s.gradeRange, teacher.gradeRange),
    lessonFormat: listFact(s.lessonFormat, teacher.lessonFormat),
    examPrep: listFact(s.examPrep, teacher.examPrep),
    location: textFact(s.location, teacher.location),
    education: listFact(s.education, teacher.education),
    experience: listFact(s.experience, teacher.experience),
    introduction: listFact(s.introduction, teacher.introduction),
    contact: {
      whatsapp: textFact(s.whatsapp, teacher.contact.whatsapp),
      phone: textFact(s.phone, teacher.contact.phone),
      email: textFact(s.email, teacher.contact.email),
      instagram: textFact(s.instagram, teacher.contact.instagram),
      availability: textFact(s.availability, teacher.contact.availability),
    },
  };
}

export async function getContactLinks(): Promise<ContactLinks> {
  const facts = await getTeacherFacts();
  const whatsapp = factValue(facts.contact.whatsapp);
  const phone = factValue(facts.contact.phone);
  const email = factValue(facts.contact.email);
  const instagram = factValue(facts.contact.instagram);
  const digits = whatsapp?.replace(/\D/g, "") ?? "";
  const message = `Merhaba ${teacher.informalName}, çocuğum için birebir ders desteği hakkında bilgi almak istiyorum.`;

  return {
    whatsappUrl: digits ? `https://wa.me/${digits}?text=${encodeURIComponent(message)}` : null,
    phoneHref: phone ? `tel:${phone.replace(/[^\d+]/g, "")}` : null,
    emailHref: email
      ? `mailto:${email}?subject=${encodeURIComponent("Birebir ders hakkında bilgi")}`
      : null,
    instagramUrl: instagram,
    phoneDisplay: phone,
    emailDisplay: email,
    instagramHandle: instagram ? `@${instagram.replace(/\/+$/, "").split("/").pop()}` : null,
    availability: factValue(facts.contact.availability),
  };
}
