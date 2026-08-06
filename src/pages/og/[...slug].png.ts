import { Resvg } from '@resvg/resvg-js';
import { getArticles, type Article } from '../../lib/content';

const escapeXml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
const image = (title: string, label: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><rect width="1200" height="630" fill="#0b0d10"/><path d="M92 90h1016M92 540h1016" stroke="#272d36"/><text x="92" y="142" fill="#f97316" font-family="Arial, sans-serif" font-size="20" font-weight="700" letter-spacing="4">DANIEL RÓŻYCKI / NOTES</text><text x="92" y="275" fill="#e7e9ec" font-family="Arial, sans-serif" font-size="54" font-weight="700">${escapeXml(title)}</text><text x="92" y="492" fill="#a0a7b1" font-family="monospace" font-size="22">${escapeXml(label)} · toastin.it</text></svg>`;

export async function getStaticPaths() {
  const articles = await getArticles();
  return [
    {
      params: { slug: 'home' },
      props: { title: 'Software architecture, Python and applied AI.', label: 'Technical notes' },
    },
    {
      params: { slug: 'about' },
      props: { title: 'Daniel Różycki', label: 'Software Architect and Senior Python Engineer' },
    },
    ...articles.map((article: Article) => ({
      params: { slug: `articles/${article.id}` },
      props: {
        title: article.data.title,
        label: article.data.tags.slice(0, 2).join(' · ') || 'Technical notes',
      },
    })),
  ];
}

export async function GET({ props }: { props: { title: string; label: string } }) {
  return new Response(new Uint8Array(new Resvg(image(props.title, props.label)).render().asPng()), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
