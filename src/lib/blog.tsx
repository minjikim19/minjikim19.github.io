import fs from "node:fs";
import path from "node:path";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

export type BlogMeta = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  featured?: boolean;
  readingTimeMins: number;
};

export type BlogPost = {
  meta: BlogMeta;
  content: ReactNode;
};

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

const withClassName = (base: string, className?: string) =>
  className ? `${base} ${className}` : base;

const mdxComponents = {
  h1: (props: ComponentPropsWithoutRef<"h1">) => (
    <h1 {...props} className={withClassName("mdx-h1", props.className)} />
  ),
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2 {...props} className={withClassName("mdx-h2", props.className)} />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3 {...props} className={withClassName("mdx-h3", props.className)} />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p {...props} className={withClassName("mdx-p", props.className)} />
  ),
  a: (props: ComponentPropsWithoutRef<"a">) => (
    <a {...props} className={withClassName("mdx-link", props.className)} />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul {...props} className={withClassName("mdx-ul", props.className)} />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol {...props} className={withClassName("mdx-ol", props.className)} />
  ),
  li: (props: ComponentPropsWithoutRef<"li">) => (
    <li {...props} className={withClassName("mdx-li", props.className)} />
  ),
  pre: (props: ComponentPropsWithoutRef<"pre">) => (
    <pre {...props} className={withClassName("mdx-pre", props.className)} />
  ),
  code: (props: ComponentPropsWithoutRef<"code">) => (
    <code {...props} className={withClassName("mdx-code", props.className)} />
  ),
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      {...props}
      className={withClassName("mdx-blockquote", props.className)}
    />
  ),
};

const isValidDate = (value: string) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(value);
  return !Number.isNaN(parsed.getTime());
};

const assertFrontmatter = (fileName: string, data: Record<string, unknown>) => {
  const errors: string[] = [];
  const title = typeof data.title === "string" ? data.title.trim() : "";
  const date = typeof data.date === "string" ? data.date.trim() : "";
  const summary = typeof data.summary === "string" ? data.summary.trim() : "";
  const tags = Array.isArray(data.tags)
    ? data.tags.filter((tag) => typeof tag === "string")
    : [];
  const featured = data.featured;

  if (!title) errors.push("title");
  if (!date || !isValidDate(date)) errors.push("date (YYYY-MM-DD)");
  if (!summary) errors.push("summary");
  if (tags.length === 0 || tags.length !== (data.tags as unknown[] | undefined)?.length)
    errors.push("tags (string[])");
  if (featured !== undefined && typeof featured !== "boolean")
    errors.push("featured (boolean)");

  if (errors.length > 0) {
    throw new Error(
      `Invalid frontmatter in ${fileName}. Missing or invalid: ${errors.join(", ")}`,
    );
  }
};

const getMdxFiles = () => {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs.readdirSync(BLOG_DIR).filter((file) => file.endsWith(".mdx"));
};

const buildMeta = (fileName: string, slug: string, raw: string): BlogMeta => {
  const { data, content } = matter(raw);
  assertFrontmatter(fileName, data);

  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  const readingTimeMins = Math.max(1, Math.ceil(wordCount / 200));

  return {
    slug,
    title: data.title as string,
    date: data.date as string,
    summary: data.summary as string,
    tags: data.tags as string[],
    featured: data.featured as boolean | undefined,
    readingTimeMins,
  };
};

export const getAllPostsMeta = (): BlogMeta[] => {
  const files = getMdxFiles();
  const posts = files.map((file) => {
    const filePath = path.join(BLOG_DIR, file);
    const raw = fs.readFileSync(filePath, "utf8");
    const slug = file.replace(/\.mdx$/, "");
    return buildMeta(file, slug, raw);
  });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
};

export const getAllSlugs = (): string[] =>
  getMdxFiles().map((file) => file.replace(/\.mdx$/, ""));

export const getPostBySlug = async (slug: string): Promise<BlogPost> => {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Post not found for slug "${slug}".`);
  }

  const raw = fs.readFileSync(filePath, "utf8");
  const meta = buildMeta(path.basename(filePath), slug, raw);
  const { content } = matter(raw);

  const compiled = await compileMDX({
    source: content,
    components: mdxComponents,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    },
  });

  return {
    meta,
    content: compiled.content,
  };
};
