import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

import { PendingPanel } from "@/components/dev/PendingPanel";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { StickyContactBar } from "@/components/layout/StickyContactBar";
import { JsonLd } from "@/components/ui/JsonLd";
import {
  SITE_URL,
  collectPendingFacts,
  collectPendingPhotos,
  teacher,
} from "@/config/teacher";
import { SITE_DESCRIPTION, SITE_TITLE, personJsonLd } from "@/lib/seo";

import "./globals.css";

/** Başlıklarda kişisel, editoryal bir ton; kurumsal grotesk değil. */
const fraunces = Fraunces({
  subsets: ["latin-ext"],
  display: "swap",
  variable: "--font-fraunces",
  axes: ["SOFT", "WONK", "opsz"],
});

const inter = Inter({
  subsets: ["latin-ext"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${teacher.name}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: teacher.name,
  authors: [{ name: teacher.name }],
  creator: teacher.name,
  alternates: { canonical: "/" },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: teacher.name,
    locale: "tr_TR",
    type: "website",
  },
  robots: { index: true, follow: true },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  /* Alan adında Türkçe karakter var; doğrulama etiketleri ve tarayıcı ipuçları
     için tek biçim olarak punycode kullanılıyor (bkz. config/teacher.ts). */
  formatDetection: { telephone: false },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const isDev = process.env.NODE_ENV !== "production";

  return (
    <html lang="tr" className={`${fraunces.variable} ${inter.variable}`}>
      <head>
        {/* JavaScript kapalıysa giriş animasyonu hiç başlamayacağı için
            içerik gizli kalırdı; bu stil onu her koşulda görünür yapar. */}
        <noscript>
          <style>{"[data-reveal]{opacity:1!important;transform:none!important}"}</style>
        </noscript>
      </head>
      <body className="flex min-h-screen flex-col">
        <a
          href="#icerik"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-paper"
        >
          İçeriğe geç
        </a>
        <Header />
        <main id="icerik" className="flex-1">
          {children}
        </main>
        <Footer />
        {/* Telefonda tek çağrı: yalnızca gerçek bir kanal varsa render edilir. */}
        <StickyContactBar />
        <JsonLd data={personJsonLd()} />
        <Analytics />
        {isDev ? (
          <PendingPanel
            facts={collectPendingFacts()}
            photos={collectPendingPhotos()}
            absent={teacher.intentionallyAbsent}
          />
        ) : null}
      </body>
    </html>
  );
}
