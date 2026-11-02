// ABOUTME: Page object for the shopping cart page.
// ABOUTME: Manages cart items, quantities, removal, and checkout navigation.

import { type Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class CartPage extends BasePage {
  constructor(page: import('@playwright/test').Page) {
    super(page);
  }

  async goto(): Promise<void> {
    await this.navigateTo('/view_cart');
  }

  getCartRows(): Locator {
    return this.page.locator('#cart_info_table tbody tr');
  }

  async getCartItemCount(): Promise<number> {
    return this.page.locator('#cart_info_table tbody tr').count();
  }

  getProductRow(productId: number): Locator {
    return this.page.locator(`#product-${productId}`);
  }

  getProductPrice(productId: number): Locator {
    return this.page.locator(`#product-${productId} .cart_price p`);
  }

  getProductQuantity(productId: number): Locator {
    return this.page.locator(`#product-${productId} .cart_quantity button`);
  }

  getProductTotal(productId: number): Locator {
    return this.page.locator(`#product-${productId} .cart_total .cart_total_price`);
  }

  async removeProduct(productId: number): Promise<void> {
    await this.page.locator(`#product-${productId} .cart_quantity_delete a`).click();
    await this.page.locator(`#product-${productId}`).waitFor({ state: 'detached' });
  }

  isCartEmpty(): Locator {
    return this.page.locator('#empty_cart');
  }

  async proceedToCheckout(): Promise<void> {
    await this.page.locator('.col-sm-6 .check_out').click();
  }

  getCheckoutModal(): Locator {
    return this.page.locator('#checkoutModal');
  }

  async clickRegisterLoginInModal(): Promise<void> {
    await this.page.locator('#checkoutModal a[href="/login"]').click();
  }
}
