// ABOUTME: Tests for product search functionality and cart add/remove operations.
// ABOUTME: Validates search results, cart item management, and product removal.

import { test, expect } from '../fixtures';

test.describe('Product Search and Cart', () => {
  test('should search for products and add/remove from cart', async ({
    productsPage,
    homePage,
    cartPage,
    productsData,
  }) => {
    await productsPage.goto();
    await expect(productsPage.getPageTitle()).toContainText('All Products');

    await productsPage.searchProduct('top');
    await expect(productsPage.getSearchedProductsHeading()).toContainText('Searched Products');

    const productCount = await productsPage.getProductCount();
    expect(productCount).toBeGreaterThan(0);

    const productNames = await productsPage.getProductNames();
    for (const name of productNames) {
      expect(name.toLowerCase()).toContain('top');
    }

    const products = productsData.cartProducts;

    await homePage.goto();
    await homePage.addProductToCartById(products[0].id);
    await homePage.clickContinueShopping();

    await homePage.addProductToCartById(products[1].id);
    await homePage.clickViewCartInModal();

    const itemCount = await cartPage.getCartItemCount();
    expect(itemCount).toBe(2);

    await expect(cartPage.getProductPrice(products[0].id)).toContainText(products[0].price);
    await expect(cartPage.getProductPrice(products[1].id)).toContainText(products[1].price);

    await cartPage.removeProduct(products[0].id);

    const updatedCount = await cartPage.getCartItemCount();
    expect(updatedCount).toBe(1);

    await expect(cartPage.getProductRow(products[0].id)).not.toBeVisible();
    await expect(cartPage.getProductRow(products[1].id)).toBeVisible();
  });
});
