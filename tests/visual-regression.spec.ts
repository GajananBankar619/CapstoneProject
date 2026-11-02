// ABOUTME: Visual regression tests using Playwright screenshot comparison.
// ABOUTME: Captures and compares snapshots of key pages to detect UI changes.

import { test, expect } from '../fixtures';
import { blockAds } from '../utils/ad-blocker';

test.describe('Visual Regression', () => {
  test('should match login page visual snapshot', async ({ page }) => {
    await blockAds(page);
    await page.goto('https://automationexercise.com/login');
    await page.waitForLoadState('domcontentloaded');

    const loginSection = page.locator('.login-form');
    await expect(loginSection).toBeVisible();
    await expect(loginSection).toHaveScreenshot('login-form.png', {
      maxDiffPixels: 100,
    });
  });

  test('should match signup form visual snapshot', async ({ page }) => {
    await blockAds(page);
    await page.goto('https://automationexercise.com/login');
    await page.waitForLoadState('domcontentloaded');

    const signupSection = page.locator('.signup-form');
    await expect(signupSection).toBeVisible();
    await expect(signupSection).toHaveScreenshot('signup-form.png', {
      maxDiffPixels: 100,
    });
  });
});
