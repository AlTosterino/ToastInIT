import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import expressiveCode from 'astro-expressive-code';
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers';
import { pluginFrames } from '@expressive-code/plugin-frames';

export default defineConfig({
  site: 'https://toastin.it',
  integrations: [
    expressiveCode({
      themes: ['github-light-default', 'github-dark-default'],
      plugins: [pluginLineNumbers(), pluginFrames()],
      frames: { showCopyToClipboardButton: true },
      styleOverrides: { codeFontFamily: 'var(--font-mono)', codeFontSize: '0.875rem' },
    }),
    mdx(),
    sitemap(),
  ],
  markdown: {
    shikiConfig: { themes: { light: 'github-light-default', dark: 'github-dark-default' } },
  },
  vite: { ssr: { noExternal: ['mermaid'] } },
});
