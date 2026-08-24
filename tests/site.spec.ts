import { test, expect } from '@playwright/test';

test('homepage and primary pages render', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toContainText('Software architecture');
  await expect(page.locator('.desktop-nav a[href="/articles"]')).toBeVisible();
  await page.goto('/articles');
  await expect(page.locator('h1')).toHaveText('Articles');
  await page.goto('/does-not-exist');
  await expect(page.locator('h1')).toContainText('This page is not here');
  await page.goto('/articles/code-showcase/');
  await expect(page.locator('h1')).toContainText('This page is not here');
});

test('theme and keyboard search work', async ({ page }) => {
  await page.goto('/');
  await page.locator('[data-theme-toggle]').click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', /dark|light/);
  await page.keyboard.press(process.platform === 'darwin' ? 'Meta+K' : 'Control+K');
  await expect(page).toHaveURL(/\/search/);
  await expect(page.locator('input[type="search"]')).toBeVisible();
  await page.locator('input[type="search"]').fill('architecture');
  await expect(page.locator('.search-results a')).toHaveCount(1);
});

test('article exposes reading progress and active table of contents', async ({ page }) => {
  await page.goto('/articles/architecting-ai-assisted-systems/');
  await expect(page.locator('[data-reading-progress]')).toContainText('min left');
  await expect(page.locator('.article-meta')).not.toContainText('min read');
  await expect(page.locator('.reading-status')).toContainText('min read');
  await expect(
    page.locator(
      '[data-share-x], [data-share-mastodon], [data-share-linkedin], [data-copy-article]',
    ),
  ).toHaveCount(4);
  await expect(page.locator('.mermaid svg')).toBeVisible();
  await expect(page.locator('pre[data-language="mermaid"]')).toHaveCount(0);
  await page.locator('h2').nth(1).scrollIntoViewIfNeeded();
  await expect(page.locator('.toc a.is-active')).toBeVisible();
});

test('public pages expose canonical SEO metadata and structured data', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.locator('meta[name="description"]')).toHaveCount(1);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://toastin.it/',
  );
  await expect(page.locator('link[rel="icon"]')).toHaveAttribute('href', '/favicon.svg');
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    'content',
    /\/og\/home\.png$/,
  );

  await page.goto('/articles/architecting-ai-assisted-systems/');
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
    'content',
    'summary_large_image',
  );
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    'content',
    /architecting-ai-assisted-systems\.png$/,
  );
  const articleJsonLd = await page
    .locator('script[type="application/ld+json"]')
    .evaluate((script) => script.innerHTML);
  expect(articleJsonLd).toContain('TechArticle');
  expect(articleJsonLd).toContain('datePublished');

  await page.goto('/about/');
  const profileJsonLd = await page
    .locator('script[type="application/ld+json"]')
    .evaluate((script) => script.innerHTML);
  expect(profileJsonLd).toContain('ProfilePage');
  expect(profileJsonLd).toContain('Daniel Różycki');

  await page.goto('/search/');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex,follow');
});

test('legal pages render and are linked from the footer', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.site-footer a[href="/privacy/"]')).toHaveText('Privacy Policy');
  await expect(page.locator('.site-footer a[href="/terms/"]')).toHaveText('Terms');

  await page.goto('/privacy/');
  await expect(page.locator('h1')).toHaveText('Privacy Policy');
  await expect(page.locator('main')).toContainText('NIP: 7262679953');
  await expect(page.locator('main')).toContainText('REGON: 385332519');
  await expect(page.locator('main')).toContainText('localStorage');

  await page.goto('/terms/');
  await expect(page.locator('h1')).toHaveText('Terms of Use');
  await expect(page.locator('main')).toContainText('NIP: 7262679953');
  await expect(page.locator('a[href="/privacy/"]')).toHaveCount(2);
});

test('mobile navigation is keyboard and button accessible', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto('/');
  const menu = page.locator('[data-menu-toggle]');
  await expect(menu).toHaveAttribute('aria-expanded', 'false');
  await menu.click();
  await expect(menu).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('#mobile-nav')).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(320);
});
