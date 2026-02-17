import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { siteData } from "../../content/siteData";
import NavbarShell from "./NavbarShell";

const inter = Inter({
  subsets: ["latin"],
});

const getMetadataBase = (): URL | undefined => {
  const value = process.env.NEXT_PUBLIC_SITE_URL;
  if (!value) return undefined;
  try {
    return new URL(value);
  } catch {
    return undefined;
  }
};

const metadataBase = getMetadataBase();
const ogImageUrl =
  metadataBase && siteData.meta.ogImagePath
    ? new URL(siteData.meta.ogImagePath, metadataBase).toString()
    : undefined;

export const metadata: Metadata = {
  title: siteData.meta.title,
  description: siteData.meta.description,
  ...(metadataBase ? { metadataBase } : {}),
  openGraph: {
    title: siteData.meta.title,
    description: siteData.meta.description,
    ...(ogImageUrl ? { images: [{ url: ogImageUrl }] } : {}),
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
      <body className={inter.className}>
        <NavbarShell />
        {children}
      </body>
    </html>
  );
}
