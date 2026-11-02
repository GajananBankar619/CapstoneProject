// ABOUTME: Page object for the homepage with product grid and cart modal.
// ABOUTME: Handles adding products to cart and modal interactions.

import { type Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class HomePage extends BasePage {
  constructor(page: import('@playwright/test').Page) {
    super(page);
  }

  async goto(): Promise<void> {
    await this.navigateTo('/');
  }

  getProductCards(): Locator {
    return this.page.locator('.product-image-wrapper');
  }

  async addProductToCartById(productId: number): Promise<void> {
    const product = this.page.locator(`.productinfo a.add-to-cart[data-product-id="${productId}"]`).first();
    await product.scrollIntoViewIfNeeded();
    await product.click();
    await this.page.locator('#cartModal').waitFor({ state: 'visible' });
  }

  async clickContinueShopping(): Promise<void> {
    await this.page.locator('#cartModal .btn-success').click();
    await this.page.locator('#cartModal').waitFor({ state: 'hidden' });
  }

  async clickViewCartInModal(): Promise<void> {
    await this.page.locator('#cartModal a[href="/view_cart"]').click();
  }

  async viewProductById(productId: number): Promise<void> {
    await this.page.locator(`a[href="/product_details/${productId}"]`).click();
  }
}
