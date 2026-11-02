// ABOUTME: Page object for the products listing page with search and filters.
// ABOUTME: Handles product search, category/brand filtering, and add-to-cart.

import { type Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class ProductsPage extends BasePage {
  private searchInput: Locator;
  private searchButton: Locator;

  constructor(page: import('@playwright/test').Page) {
    super(page);
    this.searchInput = page.locator('#search_product');
    this.searchButton = page.locator('#submit_search');
  }

  async goto(): Promise<void> {
    await this.navigateTo('/products');
  }

  getPageTitle(): Locator {
    return this.page.locator('.title.text-center');
  }

  async searchProduct(term: string): Promise<void> {
    await this.searchInput.fill(term);
    await this.searchButton.click();
  }

  getSearchedProductsHeading(): Locator {
    return this.page.locator('.title.text-center');
  }

  getProductCards(): Locator {
    return this.page.locator('.product-image-wrapper');
  }

  async getProductCount(): Promise<number> {
    return this.page.locator('.product-image-wrapper').count();
  }

  async getProductNames(): Promise<string[]> {
    const names = await this.page.locator('.productinfo p').allInnerTexts();
    return names;
  }

  async addProductToCartById(productId: number): Promise<void> {
    const product = this.page.locator(`.productinfo a.add-to-cart[data-product-id="${productId}"]`).first();
    await product.scrollIntoViewIfNeeded();
    await product.click();
    await this.page.locator('#cartModal').waitFor({ state: 'visible' });
  }

  async clickContinueShopping(): Promise<void> {
    await this.page.locator('#cartModal .btn-success').click();
    await this.page.locator('#cartModal').waitFor({ state: 'hidden' });
  }
}
