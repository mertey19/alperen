export type CmsSection = {
  heading: string;
  paragraphs: string[];
};

export type CmsCover = {
  src: string;
  alt: string;
};

export type CmsPost = {
  id: string;
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  published: boolean;
  cover: CmsCover | null;
  intro: string;
  sections: CmsSection[];
  closing: string;
  updatedAt: string;
};

export type CmsGalleryItem = {
  id: string;
  src: string;
  alt: string;
  title: string;
  category: string;
  aspect: "landscape" | "square";
  featured: boolean;
  inSlider: boolean;
};

export type CmsTestimonial = {
  id: string;
  quote: string;
  role: string;
  by: string;
  date: string;
};

export type CmsFaq = {
  id: string;
  question: string;
  answer: string;
};

export type CmsLgsStat = {
  id: string;
  title: string;
  figure: string;
  period: string;
  body: string;
  source: string;
  images: CmsCover[];
  /** Eski tekil sayfa adresleri; yalnızca yönlendirme için tutulur. */
  slug?: string;
};

export type CmsLgsList = {
  id: string;
  title: string;
  slug: string;
  description: string;
  published: boolean;
  updatedAt: string;
  items: CmsLgsStat[];
};

export type CmsSettings = {
  whatsapp: string;
  phone: string;
  email: string;
  instagram: string;
  availability: string;
  location: string;
  gradeRange: string;
  audience: string;
  subjects: string[];
  examPrep: string[];
  lessonFormat: string[];
  education: string[];
  experience: string[];
  introduction: string[];
};

export type CmsState = {
  version: 1;
  posts: CmsPost[];
  gallery: CmsGalleryItem[];
  testimonials: CmsTestimonial[];
  faqs: CmsFaq[];
  lgsLists: CmsLgsList[];
  settings: CmsSettings;
};

export const CMS_VERSION = 1 as const;
