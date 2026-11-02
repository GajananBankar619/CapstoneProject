// ABOUTME: Page object for individual product detail pages.
// ABOUTME: Handles product info display, quantity selection, and review submission.

import { type Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class ProductDetailPage extends BasePage {
  constructor(page: import('@playwright/test').Page) {
    super(page);
  }

  async goto(productId: number): Promise<void> {
    await this.navigateTo(`/product_details/${productId}`);
  }

  getProductName(): Locator {
    return this.page.locator('.product-information h2');
  }

  getProductPrice(): Locator {
    return this.page.locator('.product-information span span');
  }

  async setQuantity(qty: number): Promise<void> {
    const quantityInput = this.page.locator('#quantity');
    await quantityInput.clear();
    await quantityInput.fill(qty.toString());
  }

  async addToCart(): Promise<void> {
    await this.page.locator('.product-information .cart').click();
    await this.page.locator('#cartModal').waitFor({ state: 'visible' });
  }

  async writeReview(name: string, email: string, review: string): Promise<void> {
    await this.page.locator('#name').fill(name);
    await this.page.locator('#email').fill(email);
    await this.page.locator('#review').fill(review);
    await this.page.locator('#button-review').click();
  }

  getReviewSuccessMessage(): Locator {
    return this.page.locator('#review-section .alert-success');
  }
}
