import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Card from "@/components/Card";
import Badge from "@/components/Badge";
import Button from "@/components/Button";
import Section from "@/components/Section";
import { getAllPostsMeta, getAllSlugs, getPostBySlug } from "@/lib/blog";

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(new Date(value));

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

export const generateStaticParams = () =>
  getAllSlugs().map((slug) => ({ slug }));

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> => {
  const { slug } = await params;

  const allPosts = getAllPostsMeta();
  const post = allPosts.find((item) => item.slug === slug);

  if (!post) {
    return {
      title: "Blog | Minji Kim",
      description:
        "Notes on AI product work, evaluation workflows, and practical engineering lessons.",
      openGraph: {
        title: "Blog | Minji Kim",
        description:
          "Notes on AI product work, evaluation workflows, and practical engineering lessons.",
      },
      ...(metadataBase ? { metadataBase } : {}),
    };
  }

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
    },
    ...(metadataBase ? { metadataBase } : {}),
  };
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const allPosts = getAllPostsMeta();
  const postMeta = allPosts.find((item) => item.slug === slug);

  if (!postMeta) {
    notFound();
  }

  const { meta, content } = await getPostBySlug(slug);
  const currentTags = new Set(meta.tags);
  const relatedByTag = allPosts.filter(
    (item) =>
      item.slug !== meta.slug && item.tags.some((tag) => currentTags.has(tag)),
  );
  const related: typeof allPosts = [...relatedByTag];

  if (related.length < 3) {
    const filler = allPosts.filter(
      (item) =>
        item.slug !== meta.slug && !related.some((post) => post.slug === item.slug),
    );
    related.push(...filler);
  }

  const relatedPosts = related.slice(0, 3);

  return (
    <main className="page">
      <Section id="blog-post" className="blog-detail">
        <div className="blog-detail-header">
          <div className="blog-back">
            <Button
              label="Back to Blog"
              href="/blog"
              ariaLabel="Back to blog"
              variant="secondary"
            />
          </div>
          <h1 className="blog-detail-title">{meta.title}</h1>
          <div className="blog-detail-meta">
            <span>{formatDate(meta.date)}</span>
            <span>{meta.readingTimeMins} min read</span>
          </div>
          <div className="badge-row blog-detail-tags">
            {meta.tags.map((tag) => (
              <Badge key={`${meta.slug}-${tag}`} text={tag} />
            ))}
          </div>
        </div>

        <article className="mdx-content">{content}</article>

        {relatedPosts.length > 0 ? (
          <div className="blog-related">
            <h2 className="section-title">Related posts</h2>
            <div className="blog-related-grid">
              {relatedPosts.map((relatedPost) => (
                <Card key={relatedPost.slug} className="blog-card">
                  <h3 className="card-title">
                    <Link
                      href={`/blog/${relatedPost.slug}`}
                      className="blog-link-title"
                    >
                      {relatedPost.title}
                    </Link>
                  </h3>
                  <div className="blog-meta">
                    <span>{formatDate(relatedPost.date)}</span>
                    <span>{relatedPost.readingTimeMins} min read</span>
                  </div>
                  <p className="muted">{relatedPost.summary}</p>
                  <div className="badge-row">
                    {relatedPost.tags.map((tag) => (
                      <Badge key={`${relatedPost.slug}-${tag}`} text={tag} />
                    ))}
                  </div>
                  <div className="blog-card-actions">
                    <Link
                      className="button secondary"
                      href={`/blog/${relatedPost.slug}`}
                      aria-label={`Read ${relatedPost.title}`}
                    >
                      Read post
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ) : null}
      </Section>
    </main>
  );
}
