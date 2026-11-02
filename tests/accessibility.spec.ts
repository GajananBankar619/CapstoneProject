// ABOUTME: Accessibility tests using axe-core on key pages.
// ABOUTME: Validates that critical and serious WCAG violations are absent.

import AxeBuilder from '@axe-core/playwright';
import { test, expect } from '../fixtures';
import { blockAds } from '../utils/ad-blocker';

test.describe('Accessibility Audit', () => {
  test('should have no critical accessibility violations on homepage', async ({ page }) => {
    await blockAds(page);
    await page.goto('https://automationexercise.com/');

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    const critical = results.violations.filter(
      (v) => v.impact === 'critical' || v.impact === 'serious',
    );

    expect(critical).toEqual([]);
  });

  test('should have no critical accessibility violations on login page', async ({ page }) => {
    await blockAds(page);
    await page.goto('https://automationexercise.com/login');

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    const critical = results.violations.filter(
      (v) => v.impact === 'critical' || v.impact === 'serious',
    );

    expect(critical).toEqual([]);
  });

  test('should have no critical accessibility violations on products page', async ({ page }) => {
    await blockAds(page);
    await page.goto('https://automationexercise.com/products');

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    const critical = results.violations.filter(
      (v) => v.impact === 'critical' || v.impact === 'serious',
    );

    expect(critical).toEqual([]);
  });
});
