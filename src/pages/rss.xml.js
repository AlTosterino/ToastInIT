import rss from '@astrojs/rss';
import { getArticles } from '../lib/content';
export async function GET(context) {
  const articles = await getArticles();
  return rss({
    title: 'toastin.it',
    description: 'Software architecture, Python, distributed systems and AI engineering.',
    site: context.site,
    items: articles.map((article) => ({
      title: article.data.title,
      description: article.data.description,
      pubDate: article.data.publishedAt,
      link: `/articles/${article.id}/`,
    })),
  });
}
