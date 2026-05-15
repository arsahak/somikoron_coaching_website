import type { Metadata } from "next";
import { Geist, Noto_Sans_Bengali } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { ThemeScript } from "@/component/ThemeScript";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const notoBengali = Noto_Sans_Bengali({
  variable: "--font-noto-bengali",
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "স্মার্ট কোচিং | Smart Coaching Center",
  description:
    "এসএসসি, এইচএসসি ও ভর্তি প্রস্তুতির সেরা কোচিং সেন্টার — অভিজ্ঞ শিক্ষক, মক টেস্ট ও ডিজিটাল ট্র্যাকিং।",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="bn"
      suppressHydrationWarning
      className={`${geistSans.variable} ${notoBengali.variable} h-full antialiased`}
    >
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-full flex flex-col bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
