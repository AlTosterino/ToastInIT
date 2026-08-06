import { getCollection, type CollectionEntry } from 'astro:content';

export type Article = CollectionEntry<'articles'>;
export const isPublic = (article: Article) => (import.meta.env.PROD ? !article.data.draft : true);
export async function getArticles() {
  const entries = await getCollection('articles', isPublic);
  return entries.sort((a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf());
}
export const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s-]+/g, '-');
export const readingTime = (body = '') =>
  Math.max(1, Math.ceil(body.split(/\s+/).filter(Boolean).length / 220));
export const formatDate = (date: Date, language = 'en') =>
  new Intl.DateTimeFormat(language, { dateStyle: 'medium' }).format(date);
