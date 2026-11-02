// ABOUTME: Generates unique identifiers for test isolation.
// ABOUTME: Prevents email collisions across parallel test runs.

export function uniqueEmail(base: string = 'testuser'): string {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000);
  return `${base}_${timestamp}_${random}@test.com`;
}

export function uniqueName(base: string = 'User'): string {
  const timestamp = Date.now();
  return `${base}_${timestamp}`;
}
