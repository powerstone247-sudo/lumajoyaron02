import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lumajoyaron Stream - Premium Movies & TV Streaming",
  description: "Stream the latest movies, TV series, and exclusive content on Lumajoyaron Stream. Discover trending films, featured content, and binge-worthy series in stunning HD quality.",
  keywords: ["streaming", "movies", "TV series", "watch online", "entertainment", "Lumajoyaron"],
  authors: [{ name: "Lumajoyaron Stream Team" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Lumajoyaron Stream",
    description: "Premium Movies & TV Streaming Platform",
    url: "https://lumajoyaron.stream",
    siteName: "Lumajoyaron Stream",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lumajoyaron Stream",
    description: "Premium Movies & TV Streaming Platform",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
