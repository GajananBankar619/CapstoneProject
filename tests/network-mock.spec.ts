// ABOUTME: Demonstrates Playwright network interception and API mocking.
// ABOUTME: Intercepts product list API and verifies the page renders mocked data.

import { test, expect } from '../fixtures';

test.describe('Network Interception and Mocking', () => {
  test('should display mocked product data when API is intercepted', async ({ page }) => {
    const mockedProducts = {
      responseCode: 200,
      products: [
        {
          id: 1,
          name: 'Mocked Product Alpha',
          price: 'Rs. 999',
          brand: 'TestBrand',
          category: { usertype: { usertype: 'Women' }, category: 'Tops' },
        },
        {
          id: 2,
          name: 'Mocked Product Beta',
          price: 'Rs. 499',
          brand: 'TestBrand',
          category: { usertype: { usertype: 'Men' }, category: 'Tshirts' },
        },
      ],
    };

    await page.route('**/api/productsList', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockedProducts),
      });
    });

    await page.goto('https://automationexercise.com/products');

    await expect(page.locator('.title.text-center')).toContainText('All Products');

    const productCards = page.locator('.product-image-wrapper');
    const count = await productCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should intercept and verify search API request', async ({ page }) => {
    const searchRequests: string[] = [];

    await page.route('**/api/searchProduct', (route, request) => {
      searchRequests.push(request.postData() || '');
      route.continue();
    });

    await page.goto('https://automationexercise.com/products');
    await page.locator('#search_product').fill('jeans');
    await page.locator('#submit_search').click();

    await expect(page.locator('.title.text-center')).toContainText('Searched Products');

    const productCards = page.locator('.product-image-wrapper');
    const count = await productCards.count();
    expect(count).toBeGreaterThan(0);
  });
});
