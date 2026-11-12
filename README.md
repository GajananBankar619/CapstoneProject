# Playwright Capstone - Enterprise E-Commerce Automation Framework

Playwright TypeScript automation framework for [automationexercise.com](https://automationexercise.com/), built as a capstone project demonstrating production-ready test automation practices.

## Prerequisites

- Node.js 18+
- npm

## Quick Start

```bash
npm install
npx playwright install
npm test
```

## Project Structure

```
config/              Environment configuration (base URL, timeouts)
fixtures/            Custom Playwright fixtures (page objects, auth, test data)
pages/               Page Object Model classes
tests/               Test specifications (12 test cases across 7 spec files)
testdata/            JSON test data for data-driven testing
utils/               Reusable utilities (ad blocker, API helpers, random generators)
playwright-report/   HTML execution reports (gitignored)
```

## Architecture

```
Test Spec
    |
    v
Custom Fixtures (fixtures/index.ts)
    |-- Page Object Fixtures --> instantiate page objects with ad blocking
    |-- Auth Fixture ----------> register + login, provide authenticated page
    |-- Test Data Fixture -----> load JSON test data
    |
    v
Page Objects (pages/*.ts)
    |-- BasePage (ad blocking, nav helpers)
    |-- LoginPage, HomePage, ProductsPage, CartPage, etc.
    |
    v
Playwright Browser
    |
    v
https://automationexercise.com
```

## Page Object Model

All page objects inherit from `BasePage`, which provides:
- Ad blocking (Google Ads iframes overlay clickable elements on this site)
- Navigation helpers
- Logged-in state verification

Each page object encapsulates selectors and interactions for one page. Tests never use raw selectors.

## Custom Fixtures

Tests import `{ test, expect }` from `fixtures/index.ts` instead of `@playwright/test`:

- **Page object fixtures** - Each page object is a fixture that receives Playwright's `page`
- **Auth fixture** - `authenticatedPage` registers a user, logs in, and provides the session
- **Test data fixtures** - `usersData`, `productsData`, `paymentData`, `contactData` loaded from JSON

## Test Cases

| Test | File | What it covers |
|------|------|---------------|
| User Registration | auth.spec.ts | Signup, form fill, account creation verification |
| Login and Logout | auth.spec.ts | Login with API-created user, logout, session check |
| Product Search + Cart | product-search.spec.ts | Search, result validation, add/remove cart items |
| Checkout Flow | checkout-flow.spec.ts | End-to-end: cart -> checkout -> payment -> confirmation |
| Contact Us Form | contact-us.spec.ts | Form fill, file upload, JS alert handling |
| Network Mocking | network-mock.spec.ts | API interception with `page.route()` |
| Accessibility Audit | accessibility.spec.ts | axe-core WCAG 2.0 AA checks on key pages |
| Visual Regression | visual-regression.spec.ts | Screenshot comparison of login/signup forms |

## Data-Driven Testing

Test data lives in `testdata/` as JSON files. The `test-data.fixture.ts` loads and types them:

- `users.json` - User profiles for registration tests
- `products.json` - Search terms and cart product data
- `payment.json` - Card details for checkout
- `contact.json` - Contact form data

Unique emails are generated at runtime via `utils/random.ts` to prevent collisions.

## Network Interception and Mocking

`network-mock.spec.ts` demonstrates `page.route()` to:
1. Intercept the products API and return mock data
2. Monitor search requests passing through to the real API

## Accessibility Testing

Uses `@axe-core/playwright` to run WCAG 2.0 AA audits. Tests scan the homepage, login page, and products page, filtering for critical and serious violations and logging a summary.

## Visual Regression Testing

Uses Playwright's built-in `toHaveScreenshot()` for element-scoped screenshot comparison. First run generates baseline images in `tests/visual-regression.spec.ts-snapshots/`. Subsequent runs compare against baselines.

Update baselines: `npx playwright test --update-snapshots`

## Cross-Browser Execution

`playwright.config.ts` defines three browser projects:

```bash
npm test                              # Chromium only (default)
npm run test:all-browsers             # Chromium + Firefox + WebKit
npx playwright test --project=firefox # Firefox only
```

## Trace Viewer and Debugging

Traces are captured on first retry (`trace: 'on-first-retry'`):

```bash
npm run test:debug                    # Step-through debugger
npm run test:ui                       # Playwright UI mode
npx playwright show-trace <trace.zip> # View captured trace
```

## Running Reports

```bash
npm run report                        # Open HTML report in browser
```
