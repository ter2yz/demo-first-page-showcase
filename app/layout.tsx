import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { Toaster } from "@/components/ui/sonner";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FirstPage Interview Assessment | Contact Form Demo",
  description:
    "A technical assessment for FirstPage: Next.js, Tailwind CSS, Google Maps, and robust contact form with validation and error handling.",
  keywords: [
    "FirstPage",
    "interview",
    "assessment",
    "Next.js",
    "Tailwind CSS",
    "Google Maps",
    "contact form",
    "validation",
    "error handling",
    "demo",
  ],
  authors: [{ name: "Yuxiang (Terry) Zheng" }],
  openGraph: {
    title: "FirstPage Interview Assessment | Contact Form Demo",
    description:
      "A technical assessment for FirstPage: Next.js, Tailwind CSS, Google Maps, and robust contact form with validation and error handling.",
    url: "https://your-app-url.com",
    siteName: "FirstPage Interview Assessment",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main>{children}</main>
        <Toaster richColors />
      </body>
    </html>
  );
}
