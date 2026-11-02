// ABOUTME: Accessibility tests using axe-core on key pages.
// ABOUTME: Runs WCAG audits and reports violations, demonstrating axe-core integration.

import AxeBuilder from '@axe-core/playwright';
import { test, expect } from '../fixtures';
import { blockAds } from '../utils/ad-blocker';

test.describe('Accessibility Audit', () => {
  test('should audit homepage accessibility and report violations', async ({ page }) => {
    await blockAds(page);
    await page.goto('https://automationexercise.com/');

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    const critical = results.violations.filter(
      (v) => v.impact === 'critical' || v.impact === 'serious',
    );

    const summary = critical.map((v) => ({
      id: v.id,
      impact: v.impact,
      description: v.description,
      elementCount: v.nodes.length,
    }));

    console.log(`Homepage: ${results.passes.length} rules passed, ${critical.length} critical/serious violations found`);
    console.log('Violations:', JSON.stringify(summary, null, 2));

    expect(results.passes.length).toBeGreaterThan(0);
    expect(results.violations).toBeDefined();
  });

  test('should audit login page accessibility and report violations', async ({ page }) => {
    await blockAds(page);
    await page.goto('https://automationexercise.com/login');

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    const critical = results.violations.filter(
      (v) => v.impact === 'critical' || v.impact === 'serious',
    );

    const summary = critical.map((v) => ({
      id: v.id,
      impact: v.impact,
      description: v.description,
      elementCount: v.nodes.length,
    }));

    console.log(`Login page: ${results.passes.length} rules passed, ${critical.length} critical/serious violations found`);
    console.log('Violations:', JSON.stringify(summary, null, 2));

    expect(results.passes.length).toBeGreaterThan(0);
    expect(results.violations).toBeDefined();
  });

  test('should audit products page accessibility and report violations', async ({ page }) => {
    await blockAds(page);
    await page.goto('https://automationexercise.com/products');

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    const critical = results.violations.filter(
      (v) => v.impact === 'critical' || v.impact === 'serious',
    );

    const summary = critical.map((v) => ({
      id: v.id,
      impact: v.impact,
      description: v.description,
      elementCount: v.nodes.length,
    }));

    console.log(`Products page: ${results.passes.length} rules passed, ${critical.length} critical/serious violations found`);
    console.log('Violations:', JSON.stringify(summary, null, 2));

    expect(results.passes.length).toBeGreaterThan(0);
    expect(results.violations).toBeDefined();
  });
});
