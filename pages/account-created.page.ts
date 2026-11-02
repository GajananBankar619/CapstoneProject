// ABOUTME: Page object for the account creation confirmation page.
// ABOUTME: Verifies account was created and provides a continue button to homepage.

import { type Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class AccountCreatedPage extends BasePage {
  private heading: Locator;
  private continueButton: Locator;

  constructor(page: import('@playwright/test').Page) {
    super(page);
    this.heading = page.locator('[data-qa="account-created"]');
    this.continueButton = page.locator('[data-qa="continue-button"]');
  }

  async isAccountCreated(): Promise<boolean> {
    return this.heading.isVisible();
  }

  getHeading(): Locator {
    return this.heading;
  }

  async clickContinue(): Promise<void> {
    await this.continueButton.click();
  }
}
