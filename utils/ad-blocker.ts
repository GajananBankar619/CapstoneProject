// ABOUTME: Blocks ad network requests that overlay clickable elements on automationexercise.com.
// ABOUTME: Must be applied to every Page instance to prevent flaky test failures.

import { Page } from '@playwright/test';

const blockedPages = new WeakSet<Page>();

const AD_PATTERNS = [
  '**googlesyndication**',
  '**googleadservices**',
  '**doubleclick.net**',
  '**google-analytics.com**',
  '**connect.facebook.net**',
  '**adservice.google.com**',
  '**googletagservices**',
  '**fundingchoicesmessages**',
];

export async function blockAds(page: Page): Promise<void> {
  if (blockedPages.has(page)) return;
  blockedPages.add(page);

  for (const pattern of AD_PATTERNS) {
    await page.route(pattern, (route) => route.abort());
  }

  await page.addInitScript(() => {
    const style = document.createElement('style');
    style.textContent =
      'ins.adsbygoogle, .adsbygoogle, .grippy-host, [data-anchor-status] ' +
      '{ display: none !important; pointer-events: none !important; height: 0 !important; }';
    document.documentElement.appendChild(style);
  });
}
