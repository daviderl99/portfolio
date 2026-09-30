import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  IBM_Plex_Mono,
  Outfit,
  Syne,
} from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "@/styles/globals.scss";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-body" });
const syne = Syne({ subsets: ["latin"], variable: "--font-display" });
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  style: ["normal", "italic"],
});
const plex = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "David Frederik Erlich | Frontend Web Developer",
    template: "%s | David Frederik Erlich",
  },
  description:
    "Frontend web developer portfolio of David Frederik Erlich. Explore projects, technical skills, and contact information.",
  keywords: [
    "David Frederik Erlich",
    "Frontend Developer",
    "Web Developer",
    "Next.js Portfolio",
    "React Developer",
    "TypeScript",
  ],
  alternates: {
    canonical: "/",
  },
  authors: [{ name: "David Frederik Erlich" }],
  creator: "David Frederik Erlich",
  publisher: "David Frederik Erlich",
  category: "technology",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "David Frederik Erlich Portfolio",
    title: "David Frederik Erlich | Frontend Web Developer",
    description:
      "Explore the portfolio of David Frederik Erlich, featuring modern frontend projects, skills, and ways to get in touch.",
  },
  twitter: {
    card: "summary_large_image",
    title: "David Frederik Erlich | Frontend Web Developer",
    description:
      "Modern frontend portfolio with projects, technical skills, and contact details.",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
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
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
        />
      </head>
      <body
        className={`${outfit.variable} ${syne.variable} ${cormorant.variable} ${plex.variable}`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
