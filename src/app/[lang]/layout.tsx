import type { ReactNode } from "react";

import { notFound } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import type { Metadata } from "next";

import { isSupportedLocale, supportedLocales } from "@/config/locales";
import { siteConfig } from "@/config/site";
import { AppProviders } from "@/providers";

import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const somarSans = localFont({
  src: [
    {
      path: "../../../public/fonts/somar/standard/SomarSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/fonts/somar/standard/SomarSans-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../../public/fonts/somar/standard/SomarSans-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../../public/fonts/somar/standard/SomarSans-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../../public/fonts/somar/standard/SomarSans-Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-somar",
  display: "swap",
});

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

export const dynamicParams = false;

export function generateStaticParams() {
  return supportedLocales.map((lang) => ({ lang }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!isSupportedLocale(lang)) {
    notFound();
  }

  const dir = lang === "ar" ? "rtl" : "ltr";

  return (
    <html
      lang={lang}
      dir={dir}
      className={`${geistSans.variable} ${geistMono.variable} ${somarSans.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-slate-50 text-slate-950">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
