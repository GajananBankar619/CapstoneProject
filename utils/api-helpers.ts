// ABOUTME: Direct API calls for test setup and teardown.
// ABOUTME: Creates and deletes user accounts without going through the UI.

import { APIRequestContext } from '@playwright/test';
import { envConfig } from '../config/env.config';

interface CreateAccountParams {
  name: string;
  email: string;
  password: string;
  title: string;
  birth_date: string;
  birth_month: string;
  birth_year: string;
  firstname: string;
  lastname: string;
  company: string;
  address1: string;
  address2: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  mobile_number: string;
}

export async function createUserViaApi(
  request: APIRequestContext,
  params: CreateAccountParams,
): Promise<void> {
  await request.post(`${envConfig.baseUrl}/api/createAccount`, {
    form: params,
  });
}

export async function deleteUserViaApi(
  request: APIRequestContext,
  email: string,
  password: string,
): Promise<void> {
  await request.delete(`${envConfig.baseUrl}/api/deleteAccount`, {
    form: { email, password },
  });
}

export async function getUserByEmail(
  request: APIRequestContext,
  email: string,
): Promise<unknown> {
  const response = await request.get(
    `${envConfig.baseUrl}/api/getUserDetailByEmail`,
    { params: { email } },
  );
  return response.json();
}
