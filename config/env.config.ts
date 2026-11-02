// ABOUTME: Central environment configuration for the test framework.
// ABOUTME: Provides base URL, timeouts, and default test credentials.

export const envConfig = {
  baseUrl: process.env.BASE_URL || 'https://automationexercise.com',
  timeout: Number(process.env.TIMEOUT) || 30000,
  retries: process.env.CI ? 1 : 0,
  authStoragePath: '.auth/user.json',
  defaultPassword: 'Test@12345',
};
