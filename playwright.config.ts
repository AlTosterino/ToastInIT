import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  testDir: './tests',
  webServer: {
    command:
      'npm run build && npm run search:index && npm run preview -- --host 127.0.0.1 --port 4322',
    port: 4322,
    reuseExistingServer: false,
  },
  use: { baseURL: 'http://127.0.0.1:4322', trace: 'retain-on-failure' },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
