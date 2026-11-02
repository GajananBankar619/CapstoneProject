// ABOUTME: Fixture that provides typed test data loaded from JSON files.
// ABOUTME: Enables data-driven testing by injecting user, product, and payment data.

import { loadTestData } from '../utils/test-data-loader';

export interface UserTestData {
  name: string;
  password: string;
  title: string;
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

export interface ProductCartData {
  id: number;
  name: string;
  price: string;
}

export interface ProductSearchTerm {
  term: string;
  minExpectedResults: number;
}

export interface ProductsTestData {
  searchTerms: ProductSearchTerm[];
  cartProducts: ProductCartData[];
}

export interface PaymentTestData {
  validCard: {
    nameOnCard: string;
    cardNumber: string;
    cvc: string;
    expiryMonth: string;
    expiryYear: string;
  };
}

export interface ContactTestData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface TestDataFixtures {
  usersData: UserTestData[];
  productsData: ProductsTestData;
  paymentData: PaymentTestData;
  contactData: ContactTestData[];
}

export function createTestDataFixtures() {
  return {
    usersData: async ({}, use: (r: UserTestData[]) => Promise<void>) => {
      await use(loadTestData<UserTestData[]>('users.json'));
    },
    productsData: async ({}, use: (r: ProductsTestData) => Promise<void>) => {
      await use(loadTestData<ProductsTestData>('products.json'));
    },
    paymentData: async ({}, use: (r: PaymentTestData) => Promise<void>) => {
      await use(loadTestData<PaymentTestData>('payment.json'));
    },
    contactData: async ({}, use: (r: ContactTestData[]) => Promise<void>) => {
      await use(loadTestData<ContactTestData[]>('contact.json'));
    },
  };
}
