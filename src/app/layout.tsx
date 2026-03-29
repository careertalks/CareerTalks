import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { WebsiteJsonLd, EducationalOrganizationJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  metadataBase: new URL("https://careertalks.space"),
  title: {
    default: "CareerTalks | Shape Your Tomorrow, Today",
    template: "%s | CareerTalks",
  },
  description:
    "Free career guidance for students and young professionals. Explore 20 career paths, read industry insights, and build your future \u2014 no signups required.",
  keywords: [
    "career guidance",
    "career paths",
    "career advice for students",
    "job market 2026",
    "future careers",
    "career planning",
    "career exploration",
    "Gen Z careers",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://careertalks.space",
    siteName: "CareerTalks",
    title: "CareerTalks | Shape Your Tomorrow, Today",
    description:
      "Free career guidance for students and young professionals. Explore 20 career paths with real industry insights.",
    images: [
      {
        url: "https://careertalks.space/opengraph-image",
        width: 1200,
        height: 630,
        alt: "CareerTalks — Shape Your Tomorrow, Today",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CareerTalks",
    description: "Free career guidance for students and young professionals.",
    images: ["https://careertalks.space/opengraph-image"],
  },
  alternates: {
    canonical: "https://careertalks.space",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-HNDHCJR8L4"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-HNDHCJR8L4');
          `}
        </Script>
      </head>
      <body className="min-h-screen flex flex-col bg-white">
        <WebsiteJsonLd />
        <EducationalOrganizationJsonLd />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />

      </body>
    </html>
  );
}
