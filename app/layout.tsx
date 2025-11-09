import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pius AI - Transform Documents into Interactive Videos",
  description: "Transform documents into interactive video playlists for better learning.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
