// ABOUTME: Central barrel export composing all custom fixtures into a single test object.
// ABOUTME: Tests import { test, expect } from this file instead of @playwright/test.

import { test as base, expect } from '@playwright/test';
import { createPageObjectFixtures, type PageObjectFixtures } from './page-objects.fixture';
import { createTestDataFixtures, type TestDataFixtures } from './test-data.fixture';
import { createAuthFixtures, type AuthFixtures } from './auth.fixture';

type AllFixtures = PageObjectFixtures & TestDataFixtures & AuthFixtures;

export const test = base.extend<AllFixtures>({
  ...createPageObjectFixtures(),
  ...createTestDataFixtures(),
  ...createAuthFixtures(),
});

export { expect };
