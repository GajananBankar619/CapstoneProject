// ABOUTME: Fixture definitions that provide instantiated page objects to tests.
// ABOUTME: Each page object is a fixture receiving Playwright's built-in page.

import { type Page } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { LoginPage } from '../pages/login.page';
import { RegistrationPage } from '../pages/registration.page';
import { AccountCreatedPage } from '../pages/account-created.page';
import { ProductsPage } from '../pages/products.page';
import { ProductDetailPage } from '../pages/product-detail.page';
import { CartPage } from '../pages/cart.page';
import { CheckoutPage } from '../pages/checkout.page';
import { PaymentPage } from '../pages/payment.page';
import { ContactUsPage } from '../pages/contact-us.page';

export interface PageObjectFixtures {
  homePage: HomePage;
  loginPage: LoginPage;
  registrationPage: RegistrationPage;
  accountCreatedPage: AccountCreatedPage;
  productsPage: ProductsPage;
  productDetailPage: ProductDetailPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  paymentPage: PaymentPage;
  contactUsPage: ContactUsPage;
}

export function createPageObjectFixtures() {
  return {
    homePage: async ({ page }: { page: Page }, use: (r: HomePage) => Promise<void>) => {
      await use(new HomePage(page));
    },
    loginPage: async ({ page }: { page: Page }, use: (r: LoginPage) => Promise<void>) => {
      await use(new LoginPage(page));
    },
    registrationPage: async ({ page }: { page: Page }, use: (r: RegistrationPage) => Promise<void>) => {
      await use(new RegistrationPage(page));
    },
    accountCreatedPage: async ({ page }: { page: Page }, use: (r: AccountCreatedPage) => Promise<void>) => {
      await use(new AccountCreatedPage(page));
    },
    productsPage: async ({ page }: { page: Page }, use: (r: ProductsPage) => Promise<void>) => {
      await use(new ProductsPage(page));
    },
    productDetailPage: async ({ page }: { page: Page }, use: (r: ProductDetailPage) => Promise<void>) => {
      await use(new ProductDetailPage(page));
    },
    cartPage: async ({ page }: { page: Page }, use: (r: CartPage) => Promise<void>) => {
      await use(new CartPage(page));
    },
    checkoutPage: async ({ page }: { page: Page }, use: (r: CheckoutPage) => Promise<void>) => {
      await use(new CheckoutPage(page));
    },
    paymentPage: async ({ page }: { page: Page }, use: (r: PaymentPage) => Promise<void>) => {
      await use(new PaymentPage(page));
    },
    contactUsPage: async ({ page }: { page: Page }, use: (r: ContactUsPage) => Promise<void>) => {
      await use(new ContactUsPage(page));
    },
  };
}
