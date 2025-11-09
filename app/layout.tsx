import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pius AI - Transform Documents into Interactive Video Playlists",
  description: "AI-powered platform that converts your PDFs and documents into engaging, structured video playlists. Learn smarter with interactive content and automated video generation.",
  keywords: ["AI learning", "document to video", "educational AI", "video playlists", "PDF converter", "interactive learning"],
  authors: [{ name: "Pius AI Team" }],
  creator: "Pius AI",
  publisher: "Pius AI",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://piusai.com",
    title: "Pius AI - Transform Documents into Interactive Video Playlists",
    description: "AI-powered platform that converts your PDFs and documents into engaging, structured video playlists.",
    siteName: "Pius AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pius AI - Transform Documents into Interactive Video Playlists",
    description: "AI-powered platform that converts your PDFs and documents into engaging, structured video playlists.",
    creator: "@piusai",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
