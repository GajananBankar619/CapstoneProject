// ABOUTME: Page object for the payment page with card form.
// ABOUTME: Fills payment details and confirms the order.

import { type Locator } from '@playwright/test';
import { BasePage } from './base.page';

export interface PaymentData {
  nameOnCard: string;
  cardNumber: string;
  cvc: string;
  expiryMonth: string;
  expiryYear: string;
}

export class PaymentPage extends BasePage {
  constructor(page: import('@playwright/test').Page) {
    super(page);
  }

  async fillPaymentDetails(card: PaymentData): Promise<void> {
    await this.page.locator('[data-qa="name-on-card"]').fill(card.nameOnCard);
    await this.page.locator('[data-qa="card-number"]').fill(card.cardNumber);
    await this.page.locator('[data-qa="cvc"]').fill(card.cvc);
    await this.page.locator('[data-qa="expiry-month"]').fill(card.expiryMonth);
    await this.page.locator('[data-qa="expiry-year"]').fill(card.expiryYear);
  }

  async payAndConfirm(): Promise<void> {
    await this.page.locator('[data-qa="pay-button"]').click();
  }

  getSuccessMessage(): Locator {
    return this.page.getByText('Congratulations! Your order has been confirmed!');
  }
}
