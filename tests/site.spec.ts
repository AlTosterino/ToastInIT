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
  await page.locator('h2').nth(1).scrollIntoViewIfNeeded();
  await expect(page.locator('.toc a.is-active')).toBeVisible();
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
