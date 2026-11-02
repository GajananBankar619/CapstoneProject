// ABOUTME: Test for the Contact Us form submission with file upload.
// ABOUTME: Validates form filling, JavaScript alert handling, and success confirmation.

import * as path from 'path';
import { test, expect } from '../fixtures';

test.describe('Contact Us Form', () => {
  test('should submit contact form with file upload and handle JS alert', async ({
    contactUsPage,
    contactData,
    page,
  }) => {
    const data = contactData[0];
    const uploadFilePath = path.resolve(__dirname, '..', 'testdata', 'test-upload.txt');

    await contactUsPage.goto();
    await expect(contactUsPage.getHeading()).toBeVisible();

    await contactUsPage.fillContactForm(data);
    await contactUsPage.uploadFile(uploadFilePath);
    await contactUsPage.submitForm();

    await expect(contactUsPage.getSuccessMessage()).toContainText(
      'Success! Your details have been submitted successfully.',
    );

    await contactUsPage.clickHome();
    await expect(page).toHaveURL(/automationexercise\.com\/?$/);
  });
});
