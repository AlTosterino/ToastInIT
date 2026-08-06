import { glob } from 'astro/loaders';
import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/articles' }),
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    series: z.string().optional(),
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
    repository: z.url().optional(),
    canonicalUrl: z.url().optional(),
    ogImage: z.string().optional(),
    language: z.string().default('en'),
  }),
});

export const collections = { articles };
