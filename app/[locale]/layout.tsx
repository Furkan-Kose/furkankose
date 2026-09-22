import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { SITE_URL, GITHUB_URL, LINKEDIN_URL } from '@/lib/site';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
});

// Kayıtlı tema yoksa koyu. Navbar'daki mantıkla birebir aynı olmalı.
// <head> içinde çalışır, böylece ilk boyamadan önce sınıf uygulanır (renk sıçraması olmaz).
const THEME_SCRIPT = `try{var t=localStorage.getItem("theme");document.documentElement.classList.toggle("dark",t!=="light")}catch(e){document.documentElement.classList.add("dark")}`;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Meta" });

  const title = t("title");
  const description = t("description");
  const ogImage = {
    url: `/og-${locale}.png`,
    width: 1200,
    height: 630,
    alt: title,
  };

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        tr: "/tr",
        en: "/en",
        "x-default": `/${routing.defaultLocale}`,
      },
    },
    openGraph: {
      type: "website",
      siteName: "Furkan Köse",
      locale: locale === "tr" ? "tr_TR" : "en_US",
      url: `/${locale}`,
      title,
      description,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Validate the locale
  if (!routing.locales.includes(locale as "en" | "tr")) {
    notFound();
  }

  // Load the corresponding messages
  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: "Meta" });

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Furkan Köse",
    url: `${SITE_URL}/${locale}`,
    jobTitle: t("jobTitle"),
    description: t("description"),
    email: "mailto:furkankose2003@gmail.com",
    sameAs: [GITHUB_URL, LINKEDIN_URL],
  };

  return (
    // Font değişkeni <html>'de tanımlı olmalı: Tailwind preflight font-family'yi
    // <html> üzerinde ayarlıyor, değişken yalnızca <body>'de olursa kural geçersiz kalıyor.
    <html lang={locale} className={geistSans.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        {/* JS çalışmazsa animasyonların başlangıç opacity:0 değeri içeriği gizli bırakır */}
        <noscript>
          <style>{`[style*="opacity:0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="antialiased">
        <NextIntlClientProvider messages={messages}>
          <div className="min-h-screen relative">
            <Navbar />
            {children}
            <Footer />
          </div>
        </NextIntlClientProvider>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
