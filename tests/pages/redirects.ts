import { expect, Page } from '@playwright/test';
import * as fs from 'fs';
import path from 'path/win32';

function loadRedirectURLMappings(): { initial: string; expected: string }[] {
  const mappingsFile = process.env.URL_MAPPINGS_FILE;
  if (!mappingsFile) {
    throw new Error('URL_MAPPINGS_FILE is not defined in the environment variables.');
  }

  // Read raw text, parse manually without trimming
  const raw = fs.readFileSync(mappingsFile, { encoding: 'utf-8' });
  const parsed = JSON.parse(raw, (key, value) => value); // no transformations
  return parsed;
}

let urlMappings: { initial: string; expected: string }[] | null = null;
const failures: { initial: string; expected: string; received: string }[] = [];

async function waitForStableURL(
  page: Page,
  timeoutMs = 10000,
  checkIntervalMs = 200
): Promise<string> {
  const start = Date.now();
  let previousURL = '';
  let stableCount = 0;

  while (Date.now() - start < timeoutMs) {
    const currentURL = page.url();

    if (currentURL === previousURL) {
      stableCount++;
      if (stableCount >= 3) break;
    } else {
      stableCount = 0;
      previousURL = currentURL;
    }

    await page.waitForTimeout(checkIntervalMs);
  }

  return page.url();
}

async function validateRedirection(page: Page, initialURL: string, expectedURL: string) {
  await page.goto(initialURL, { waitUntil: 'domcontentloaded' });
  const finalURL = await waitForStableURL(page);

  // Strict comparison – do NOT trim
  if (finalURL !== expectedURL) {
    failures.push({
      initial: initialURL,
      expected: expectedURL,
      received: finalURL
    });
  }
}

export async function testRedirections(page: Page) {
  // Lazy load mappings on first call
  if (urlMappings === null) {
    urlMappings = loadRedirectURLMappings();
  }

  for (const { initial, expected } of urlMappings) {
    console.log(`Testing redirection from '${initial}' to '${expected}'`);
    try {
      await validateRedirection(page, initial, expected);
    } catch (err) {
      const received = page.url();
      console.error(`Error testing ${initial}: ${err}`);
      failures.push({ initial, expected, received });
    }
  }

  if (failures.length > 0) {
    const failuresPath = path.join(process.cwd(), 'redirection_failures.json');

    // Write exact, untrimmed strings
    const output = JSON.stringify(failures, null, 2);
    fs.writeFileSync(failuresPath, output, { encoding: 'utf-8' });

    console.log(`Failures saved to ${failuresPath}`);
  }
}
