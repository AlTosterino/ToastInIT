export const siteUrl = 'https://toastin.it';
export const defaultDescription =
  'Practical software architecture notes by Daniel Różycki about Python systems, distributed workflows, technical decisions and production AI.';
export const author = {
  name: 'Daniel Różycki',
  id: `${siteUrl}/about/#daniel-rozycki`,
  url: `${siteUrl}/about/`,
  jobTitle: 'Software Architect and Senior Python Engineer',
  sameAs: [
    'https://github.com/AlTosterino',
    'https://www.linkedin.com/in/daniel-rozycki/',
    'https://rozycki.dev',
  ],
};
export const absoluteUrl = (value: string) => new URL(value, siteUrl).href;
export const ogImage = (path = '/og/home.png') => absoluteUrl(path);
export const personJsonLd = {
  '@type': 'Person',
  '@id': author.id,
  name: author.name,
  url: author.url,
  jobTitle: author.jobTitle,
  sameAs: author.sameAs,
};
export const websiteJsonLd = {
  '@type': 'WebSite',
  '@id': `${siteUrl}/#website`,
  name: 'toastin.it',
  url: `${siteUrl}/`,
  description: defaultDescription,
  publisher: { '@id': author.id },
  potentialAction: {
    '@type': 'SearchAction',
    target: `${siteUrl}/search/?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};
export const breadcrumbs = (items: Array<{ name: string; url: string }>) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: absoluteUrl(item.url),
  })),
});
