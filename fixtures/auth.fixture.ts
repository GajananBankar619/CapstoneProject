// ABOUTME: Authentication fixture that provides a logged-in browser state.
// ABOUTME: Registers a user, logs in, and stores session for reuse across tests.

import { type Page, type BrowserContext } from '@playwright/test';
import { blockAds } from '../utils/ad-blocker';
import { uniqueEmail } from '../utils/random';
import { deleteUserViaApi } from '../utils/api-helpers';
import { envConfig } from '../config/env.config';
import { loadTestData } from '../utils/test-data-loader';
import type { UserTestData } from './test-data.fixture';

export interface AuthFixtures {
  authenticatedPage: Page;
  authUserEmail: string;
  authUserName: string;
}

export function createAuthFixtures() {
  return {
    authenticatedPage: async (
      { browser }: { browser: import('@playwright/test').Browser },
      use: (r: Page) => Promise<void>,
    ) => {
      const userData = loadTestData<UserTestData[]>('users.json')[0];
      const email = uniqueEmail(userData.name.toLowerCase());
      const context: BrowserContext = await browser.newContext();
      const page: Page = await context.newPage();
      await blockAds(page);

      await page.goto(`${envConfig.baseUrl}/login`);
      await page.locator('[data-qa="signup-name"]').fill(userData.name);
      await page.locator('[data-qa="signup-email"]').fill(email);
      await page.locator('[data-qa="signup-button"]').click();

      await page.locator('#id_gender1').check();
      await page.locator('[data-qa="password"]').fill(userData.password);
      await page.locator('[data-qa="days"]').selectOption(userData.birthDay);
      await page.locator('[data-qa="months"]').selectOption(userData.birthMonth);
      await page.locator('[data-qa="years"]').selectOption(userData.birthYear);
      await page.locator('[data-qa="first_name"]').fill(userData.firstName);
      await page.locator('[data-qa="last_name"]').fill(userData.lastName);
      await page.locator('[data-qa="company"]').fill(userData.company);
      await page.locator('[data-qa="address"]').fill(userData.address1);
      await page.locator('[data-qa="address2"]').fill(userData.address2);
      await page.locator('[data-qa="country"]').selectOption(userData.country);
      await page.locator('[data-qa="state"]').fill(userData.state);
      await page.locator('[data-qa="city"]').fill(userData.city);
      await page.locator('[data-qa="zipcode"]').fill(userData.zipcode);
      await page.locator('[data-qa="mobile_number"]').fill(userData.mobileNumber);
      await page.locator('[data-qa="create-account"]').click();

      await page.locator('[data-qa="continue-button"]').click();

      await use(page);

      const apiContext = await page.context().request;
      await deleteUserViaApi(apiContext, email, userData.password);
      await context.close();
    },

    authUserEmail: async ({}, use: (r: string) => Promise<void>) => {
      await use('');
    },

    authUserName: async ({}, use: (r: string) => Promise<void>) => {
      const userData = loadTestData<UserTestData[]>('users.json')[0];
      await use(userData.name);
    },
  };
}
