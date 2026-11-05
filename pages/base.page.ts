// ABOUTME: Abstract base page providing shared navigation, ad blocking, and common helpers.
// ABOUTME: All page objects inherit from this to get consistent setup across tests.

import { type Page, type Locator } from '@playwright/test';
import { blockAds } from '../utils/ad-blocker';

export abstract class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(path: string): Promise<void> {
    await blockAds(this.page);
    await this.page.goto(path, { waitUntil: 'domcontentloaded' });
  }

  getNavbar(): Locator {
    return this.page.locator('.navbar-nav');
  }

  async clickNavLink(text: string): Promise<void> {
    await this.page.locator('.navbar-nav').getByText(text, { exact: false }).click();
  }

  async isLoggedInAs(name: string): Promise<boolean> {
    const loggedInText = this.page.locator('.navbar-nav').getByText(`Logged in as ${name}`);
    return loggedInText.isVisible();
  }

  async clickLogout(): Promise<void> {
    await this.clickNavLink('Logout');
    await this.page.waitForURL(/\/login/);
  }

  async clickDeleteAccount(): Promise<void> {
    await this.clickNavLink('Delete Account');
  }
}
