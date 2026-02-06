import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { siteData } from "../../content/siteData";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: siteData.meta.title,
  description: siteData.meta.description,
  openGraph: {
    title: siteData.meta.title,
    description: siteData.meta.description,
    images: [{ url: siteData.meta.ogImagePath }],
  },
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
