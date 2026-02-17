import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/Section";
import { getAllPostsMeta } from "@/lib/blog";
import BlogListClient from "./BlogListClient";

const baseMetadata = {
  title: "Blog | Minji Kim",
  description:
    "Notes on AI product work, evaluation workflows, and practical engineering lessons.",
  openGraph: {
    title: "Blog | Minji Kim",
    description:
      "Notes on AI product work, evaluation workflows, and practical engineering lessons.",
  },
};

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

export const metadata: Metadata = {
  ...baseMetadata,
  ...(metadataBase ? { metadataBase } : {}),
};

export default function BlogPage() {
  const allPosts = getAllPostsMeta();
  const allTags = Array.from(
    new Set(allPosts.flatMap((post) => post.tags)),
  ).sort((a, b) => a.localeCompare(b));

  return (
    <main className="page">
      <Section id="blog-list" title="Blog">
        <BlogListClient posts={allPosts} allTags={allTags} />
      </Section>
    </main>
  );
}
