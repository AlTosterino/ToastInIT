# toastin.it

Minimalist, static technical blog for Daniel Różycki. The site is built with Astro, TypeScript, Markdown/MDX, Expressive Code and Pagefind, and is deployed to GitHub Pages at [toastin.it](https://toastin.it).

## Requirements and setup

Use Node.js 22 LTS or newer and npm 10 or newer.

```sh
npm ci
npm run dev
```

Useful commands: `npm run build`, `npm run preview`, `npm run check`, `npm run lint`, `npm run format`, `npm run format:check`, `npm run test`, and `npm run verify`.

## Writing an article

Create `src/content/articles/my-article.md` (or `.mdx`) with this frontmatter:

```yaml
title: A precise technical title
description: One useful sentence describing what the reader will learn.
publishedAt: 2026-08-06
updatedAt: 2026-08-07
tags: [python, architecture]
series: Optional series name
difficulty: intermediate # beginner | intermediate | advanced
draft: false
featured: false
repository: https://github.com/owner/repository
canonicalUrl: https://example.com/article
language: en
```

Dates, URLs, required text and enum values are validated at build time. Drafts are available while developing but are excluded from production pages, RSS, sitemap and Pagefind. Tags are displayed as slugs in URLs. Keep the filename unique.

## Code, diagrams and search

Markdown code fences are highlighted by Expressive Code with GitHub light/dark themes. Use a fence title, line highlights (`{1,4}`), insertions/deletions, and `showLineNumbers` only when a post needs line references. Mermaid fences are supported in article content. Pagefind is indexed after the production build by `npm run search:index`; `/search` loads its script only when used.

MDX articles can use the included callout component: `import Callout from '../../components/Callout.astro'`, then `<Callout type="warning" title="Watch out">Content.</Callout>`. Supported types are `info`, `tip`, `warning` and `danger`. Headings receive anchors and a small copy-link control on hover/focus.

## Build and deployment

`npm run verify` runs formatting, linting, Astro type/content validation, Playwright smoke tests, the production build and Pagefind indexing. The GitHub Pages workflow runs the same gates on `main`, then uploads `dist` using the official Pages actions. `public/CNAME` preserves the custom domain.

## Architecture decisions

The site is static and uses small Astro components with no UI framework. Content is the source of truth; generated topic and series pages are derived from it. CSS custom properties provide light/dark themes, while a tiny inline script applies the saved/system theme before paint. There are no trackers or third-party font requests.
