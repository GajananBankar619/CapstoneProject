// ABOUTME: End-to-end test for the complete checkout and order placement flow.
// ABOUTME: Uses authenticated fixture to test cart -> checkout -> payment -> confirmation.

import { test, expect } from '../fixtures';
import { loadTestData } from '../utils/test-data-loader';
import type { PaymentTestData } from '../fixtures/test-data.fixture';

test.describe('Checkout Flow', () => {
  test.setTimeout(60000);

  test('should complete full checkout flow with payment', async ({
    authenticatedPage,
    authUserName,
  }) => {
    const page = authenticatedPage;
    const paymentData = loadTestData<PaymentTestData>('payment.json');

    await expect(page.locator('.navbar-nav')).toContainText(`Logged in as ${authUserName}`);

    await page.locator('.productinfo').first().waitFor({ state: 'visible' });
    const addToCartButton1 = page.locator('.productinfo a.add-to-cart[data-product-id="1"]').first();
    await addToCartButton1.scrollIntoViewIfNeeded();
    await addToCartButton1.click();
    await page.locator('#cartModal').waitFor({ state: 'visible' });
    await page.locator('#cartModal .btn-success').click();
    await page.locator('#cartModal').waitFor({ state: 'hidden' });

    const addToCartButton2 = page.locator('.productinfo a.add-to-cart[data-product-id="2"]').first();
    await addToCartButton2.scrollIntoViewIfNeeded();
    await addToCartButton2.click();
    await page.locator('#cartModal').waitFor({ state: 'visible' });
    await page.locator('#cartModal a[href="/view_cart"]').click();

    await expect(page.locator('#product-1')).toBeVisible();
    await expect(page.locator('#product-2')).toBeVisible();

    await page.locator('.col-sm-6 .check_out').click();

    await expect(page.locator('#address_delivery')).toBeVisible();
    await expect(page.locator('#address_invoice')).toBeVisible();

    await page.locator('textarea[name="message"]').fill('Please deliver during business hours.');
    await page.locator('.btn.btn-default.check_out').click();

    await page.locator('[data-qa="name-on-card"]').fill(paymentData.validCard.nameOnCard);
    await page.locator('[data-qa="card-number"]').fill(paymentData.validCard.cardNumber);
    await page.locator('[data-qa="cvc"]').fill(paymentData.validCard.cvc);
    await page.locator('[data-qa="expiry-month"]').fill(paymentData.validCard.expiryMonth);
    await page.locator('[data-qa="expiry-year"]').fill(paymentData.validCard.expiryYear);
    await page.locator('[data-qa="pay-button"]').click();

    await expect(page.getByText('Congratulations! Your order has been confirmed!')).toBeVisible();
  });
});
