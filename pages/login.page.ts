// ABOUTME: Page object for the login and signup page at /login.
// ABOUTME: Handles both the login form and the initial signup form on the same page.

import { type Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
  private loginEmail: Locator;
  private loginPassword: Locator;
  private loginButton: Locator;
  private signupName: Locator;
  private signupEmail: Locator;
  private signupButton: Locator;

  constructor(page: import('@playwright/test').Page) {
    super(page);
    this.loginEmail = page.locator('[data-qa="login-email"]');
    this.loginPassword = page.locator('[data-qa="login-password"]');
    this.loginButton = page.locator('[data-qa="login-button"]');
    this.signupName = page.locator('[data-qa="signup-name"]');
    this.signupEmail = page.locator('[data-qa="signup-email"]');
    this.signupButton = page.locator('[data-qa="signup-button"]');
  }

  async goto(): Promise<void> {
    await this.navigateTo('/login');
  }

  getLoginFormHeading(): Locator {
    return this.page.locator('.login-form h2');
  }

  getSignupFormHeading(): Locator {
    return this.page.locator('.signup-form h2');
  }

  getLoginErrorMessage(): Locator {
    return this.page.locator('.login-form p[style*="color: red"]');
  }

  getSignupErrorMessage(): Locator {
    return this.page.locator('.signup-form p[style*="color: red"]');
  }

  async login(email: string, password: string): Promise<void> {
    await this.loginEmail.fill(email);
    await this.loginPassword.fill(password);
    await this.loginButton.click();
  }

  async signupInitiate(name: string, email: string): Promise<void> {
    await this.signupName.fill(name);
    await this.signupEmail.fill(email);
    await this.signupButton.click();
  }
}
