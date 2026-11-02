// ABOUTME: Page object for the Contact Us form page.
// ABOUTME: Handles form filling, file upload, and JavaScript alert confirmation.

import { type Locator } from '@playwright/test';
import { BasePage } from './base.page';

export interface ContactData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export class ContactUsPage extends BasePage {
  constructor(page: import('@playwright/test').Page) {
    super(page);
  }

  async goto(): Promise<void> {
    await this.navigateTo('/contact_us');
  }

  getHeading(): Locator {
    return this.page.getByText('Get In Touch');
  }

  async fillContactForm(data: ContactData): Promise<void> {
    await this.page.locator('[data-qa="name"]').fill(data.name);
    await this.page.locator('[data-qa="email"]').fill(data.email);
    await this.page.locator('[data-qa="subject"]').fill(data.subject);
    await this.page.locator('[data-qa="message"]').fill(data.message);
  }

  async uploadFile(filePath: string): Promise<void> {
    await this.page.locator('input[name="upload_file"]').setInputFiles(filePath);
  }

  async submitForm(): Promise<void> {
    this.page.once('dialog', (dialog) => dialog.accept());
    await this.page.locator('[data-qa="submit-button"]').click();
  }

  getSuccessMessage(): Locator {
    return this.page.locator('.status.alert.alert-success');
  }

  async clickHome(): Promise<void> {
    await this.page.locator('#form-section a.btn-success').click();
  }
}
