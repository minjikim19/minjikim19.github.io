"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Card from "@/components/Card";
import Badge from "@/components/Badge";
import type { BlogMeta } from "@/lib/blog";

type BlogListClientProps = {
  posts: BlogMeta[];
  allTags: string[];
};

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(new Date(value));

export default function BlogListClient({ posts, allTags }: BlogListClientProps) {
  const [activeTag, setActiveTag] = useState("All");

  const tags = useMemo(() => ["All", ...allTags], [allTags]);
  const filteredPosts = useMemo(() => {
    if (activeTag === "All") return posts;
    return posts.filter((post) => post.tags.includes(activeTag));
  }, [activeTag, posts]);

  return (
    <div className="blog-list-client">
      <div className="tag-filter" role="list">
        {tags.map((tag) => (
          <button
            key={tag}
            type="button"
            className={`tag-button${activeTag === tag ? " active" : ""}`}
            onClick={() => setActiveTag(tag)}
            aria-pressed={activeTag === tag}
            role="listitem"
          >
            <Badge text={tag} />
          </button>
        ))}
      </div>
      
      {/* {filteredPosts.length === 0 ? (
        <p className="muted">No posts match that tag yet.</p>
      ) : (
        <div className="blog-list">
          {filteredPosts.map((post) => (
            <Card key={post.slug} className="blog-card">
              <div className="blog-card-header">
                <h3 className="card-title">
                  <Link href={`/blog/${post.slug}`} className="blog-link-title">
                    {post.title}
                  </Link>
                </h3>
                <div className="blog-meta">
                  <span>{formatDate(post.date)}</span>
                  <span>{post.readingTimeMins} min read</span>
                </div>
              </div>
              <p className="muted">{post.summary}</p>
              <div className="badge-row">
                {post.tags.map((tag) => (
                  <Badge key={`${post.slug}-${tag}`} text={tag} />
                ))}
              </div>
              <div className="blog-card-actions">
                <Link
                  className="button secondary"
                  href={`/blog/${post.slug}`}
                  aria-label={`Read ${post.title}`}
                >
                  Read post
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )} */}

    </div>
  );
}
