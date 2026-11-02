// ABOUTME: Page object for the full registration form at /signup.
// ABOUTME: Fills all account details after initial signup redirect from /login.

import { type Locator } from '@playwright/test';
import { BasePage } from './base.page';

export interface RegistrationData {
  title: string;
  password: string;
  birthDay: string;
  birthMonth: string;
  birthYear: string;
  firstName: string;
  lastName: string;
  company: string;
  address1: string;
  address2: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  mobileNumber: string;
}

export class RegistrationPage extends BasePage {
  private createAccountButton: Locator;

  constructor(page: import('@playwright/test').Page) {
    super(page);
    this.createAccountButton = page.locator('[data-qa="create-account"]');
  }

  getHeading(): Locator {
    return this.page.locator('.title.text-center b');
  }

  async fillRegistrationForm(data: RegistrationData): Promise<void> {
    if (data.title === 'Mr') {
      await this.page.locator('#id_gender1').check();
    } else {
      await this.page.locator('#id_gender2').check();
    }

    await this.page.locator('[data-qa="password"]').fill(data.password);
    await this.page.locator('[data-qa="days"]').selectOption(data.birthDay);
    await this.page.locator('[data-qa="months"]').selectOption(data.birthMonth);
    await this.page.locator('[data-qa="years"]').selectOption(data.birthYear);

    await this.page.locator('#newsletter').check();
    await this.page.locator('#optin').check();

    await this.page.locator('[data-qa="first_name"]').fill(data.firstName);
    await this.page.locator('[data-qa="last_name"]').fill(data.lastName);
    await this.page.locator('[data-qa="company"]').fill(data.company);
    await this.page.locator('[data-qa="address"]').fill(data.address1);
    await this.page.locator('[data-qa="address2"]').fill(data.address2);
    await this.page.locator('[data-qa="country"]').selectOption(data.country);
    await this.page.locator('[data-qa="state"]').fill(data.state);
    await this.page.locator('[data-qa="city"]').fill(data.city);
    await this.page.locator('[data-qa="zipcode"]').fill(data.zipcode);
    await this.page.locator('[data-qa="mobile_number"]').fill(data.mobileNumber);
  }

  async submitRegistration(): Promise<void> {
    await this.createAccountButton.click();
  }

  async registerUser(data: RegistrationData): Promise<void> {
    await this.fillRegistrationForm(data);
    await this.submitRegistration();
  }
}
