// ABOUTME: Loads typed test data from JSON files in the testdata directory.
// ABOUTME: Provides a generic loader used by test-data fixtures.

import * as fs from 'fs';
import * as path from 'path';

export function loadTestData<T>(filename: string): T {
  const filePath = path.resolve(__dirname, '..', 'testdata', filename);
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw) as T;
}
