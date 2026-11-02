// ABOUTME: Page object for the checkout page with address review and order placement.
// ABOUTME: Verifies delivery/billing addresses and handles order comments.

import { type Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class CheckoutPage extends BasePage {
  constructor(page: import('@playwright/test').Page) {
    super(page);
  }

  getDeliveryAddress(): Locator {
    return this.page.locator('#address_delivery');
  }

  getBillingAddress(): Locator {
    return this.page.locator('#address_invoice');
  }

  async getDeliveryAddressLines(): Promise<string[]> {
    return this.page.locator('#address_delivery li').allInnerTexts();
  }

  async getBillingAddressLines(): Promise<string[]> {
    return this.page.locator('#address_invoice li').allInnerTexts();
  }

  getOrderReview(): Locator {
    return this.page.locator('#cart_info');
  }

  async addComment(comment: string): Promise<void> {
    await this.page.locator('textarea[name="message"]').fill(comment);
  }

  async placeOrder(): Promise<void> {
    await this.page.locator('.btn.btn-default.check_out').click();
  }
}
