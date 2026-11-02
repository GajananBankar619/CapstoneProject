// ABOUTME: Blocks ad network requests that overlay clickable elements on automationexercise.com.
// ABOUTME: Must be applied to every Page instance to prevent flaky test failures.

import { Page } from '@playwright/test';

const AD_PATTERNS = [
  '**/*googlesyndication*',
  '**/*googleadservices*',
  '**/*doubleclick.net*',
  '**/*google-analytics.com*',
  '**/*connect.facebook.net*',
  '**/*adservice.google.com*',
];

export async function blockAds(page: Page): Promise<void> {
  for (const pattern of AD_PATTERNS) {
    await page.route(pattern, (route) => route.abort());
  }
}
