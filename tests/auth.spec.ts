// ABOUTME: Tests for user registration, login, and logout flows.
// ABOUTME: Validates account creation with data-driven user profiles and session management.

import { test, expect } from '../fixtures';
import { uniqueEmail } from '../utils/random';
import { deleteUserViaApi } from '../utils/api-helpers';
import { envConfig } from '../config/env.config';

test.describe('User Authentication', () => {
  test('should register a new user and verify account creation', async ({
    loginPage,
    registrationPage,
    accountCreatedPage,
    usersData,
    page,
    request,
  }) => {
    const userData = usersData[0];
    const email = uniqueEmail(userData.name.toLowerCase());

    await loginPage.goto();
    await expect(loginPage.getSignupFormHeading()).toContainText('New User Signup!');

    await loginPage.signupInitiate(userData.name, email);

    await registrationPage.registerUser({
      title: userData.title,
      password: userData.password,
      birthDay: userData.birthDay,
      birthMonth: userData.birthMonth,
      birthYear: userData.birthYear,
      firstName: userData.firstName,
      lastName: userData.lastName,
      company: userData.company,
      address1: userData.address1,
      address2: userData.address2,
      country: userData.country,
      state: userData.state,
      city: userData.city,
      zipcode: userData.zipcode,
      mobileNumber: userData.mobileNumber,
    });

    await expect(accountCreatedPage.getHeading()).toContainText('Account Created!');
    await accountCreatedPage.clickContinue();

    await expect(page.locator('.navbar-nav')).toContainText(`Logged in as ${userData.name}`);

    await deleteUserViaApi(request, email, userData.password);
  });

  test('should login with valid credentials and logout', async ({
    loginPage,
    usersData,
    page,
    request,
  }) => {
    const userData = usersData[0];
    const email = uniqueEmail(userData.name.toLowerCase());

    const createResponse = await request.post(`${envConfig.baseUrl}/api/createAccount`, {
      form: {
        name: userData.name,
        email: email,
        password: userData.password,
        title: userData.title,
        birth_date: userData.birthDay,
        birth_month: userData.birthMonth,
        birth_year: userData.birthYear,
        firstname: userData.firstName,
        lastname: userData.lastName,
        company: userData.company,
        address1: userData.address1,
        address2: userData.address2,
        country: userData.country,
        state: userData.state,
        city: userData.city,
        zipcode: userData.zipcode,
        mobile_number: userData.mobileNumber,
      },
    });
    expect(createResponse.ok(), 'API createAccount request failed').toBeTruthy();

    await loginPage.goto();
    await expect(loginPage.getLoginFormHeading()).toContainText('Login to your account');

    await loginPage.login(email, userData.password);
    await expect(page.locator('.navbar-nav')).toContainText(`Logged in as ${userData.name}`);

    await loginPage.clickLogout();
    await expect(page).toHaveURL(/\/login/);
    await expect(loginPage.getLoginFormHeading()).toBeVisible();
    await expect(loginPage.getLoginFormHeading()).toContainText('Login to your account');

    await deleteUserViaApi(request, email, userData.password);
  });
});
