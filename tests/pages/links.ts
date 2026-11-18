import { Page } from '@playwright/test';
import axios from 'axios';
import * as fs from 'fs';

function shouldSkipLink(href: string): boolean {
  const skipPatterns = ['mailto:', 'tel:', 'https://twitter.com/', 'https://instagram.com/', 'https://stage.gasnetworks.ie/about/our-strategy', 'https://www.linkedin.com/company/soni-ltd/home/', 'https://www.linkedin.com/company/soni-ltd/'];
  return skipPatterns.some(pattern => href.startsWith(pattern));
}

/** A single broken link discovered on a page. */
export interface BrokenLink {
  href: string;
  status: number | string;
  message: string;
  elementLocator: string;
}

/** Outcome of checking all clickable links on one page. */
export interface PageLinkResult {
  pageUrl: string;
  checked: number;
  broken: BrokenLink[];
}

/** Format one broken link the way the QA report expects. */
export function formatBrokenLink(broken: BrokenLink): string {
  return `⚠ URL ${broken.href} failed. ERROR: ${broken.message}, Status: ${broken.status}`;
}

export function loadLinkCheckUrls(): string[] {
  const linkCheckUrlsFile = process.env.LINK_CHECK_URLS_FILE;
  if (!linkCheckUrlsFile) {
    throw new Error('LINK_CHECK_URLS_FILE is not defined in the environment variables.');
  }

  const data = JSON.parse(fs.readFileSync(linkCheckUrlsFile, 'utf8'));
  return data.urls;
}

/**
 * Check every clickable link on a page and return the outcome.
 *
 * Note: this collects results rather than writing a CSV itself. The caller
 * aggregates results across pages and writes a single summary report, which
 * avoids the previous behaviour of each page overwriting the CSV header.
 */
export async function validateClickableLinks(page: Page, pageUrl: string): Promise<PageLinkResult> {

  console.log(`Starting URL validation for page: ${pageUrl}`);
  await page.goto(pageUrl);

  // Get all <a> tags on the page
  const anchorElements = await page.$$('a');
  const arrayLength = anchorElements.length;

  const broken: BrokenLink[] = [];
  const seen = new Set<string>(); // avoid re-checking the same href on the page
  let index = 0;
  let checked = 0;

  // Loop through all <a> tags and validate each URL
  for (const element of anchorElements)
  {
    index++;
    const elementLocator = await element.evaluate(e => e.outerHTML); // Get the HTML of the element for logging
    let href = await element.getAttribute('href'); // Get the href attribute

    if (!href)
    {
      console.log(`⚠ Skipping element with empty href: ${elementLocator}`);
      continue;
    }

    if (shouldSkipLink(href)) {
      console.log(`⏭️ Skipping link: ${href}`);
      continue;
    }

    try
    {
      href = new URL(href, pageUrl).href;
    }
    catch (error)
    {
      console.error(`❌ URL ${href} is invalid`);
      continue;
    }

    if (seen.has(href)) {
      continue;
    }
    seen.add(href);

    console.log(`Testing anchor element ${index} of ${arrayLength}: ${href}`);
    checked++;

    try
    {
      // Use Axios to check the status of the URL
      const response = await axios.get(href, { timeout: 10000 });
      const status = response.status;

      if (status === 200)
      {
        console.log(`✅ URL ${href} returned status: ${status}`);
      }
      else
      {
        console.error(`❌ URL ${href} returned status: ${status}`);
        broken.push({ href, status, message: `Request failed with status code ${status}`, elementLocator });
      }

    }
    catch (error)
    {
      const status = error.response ? error.response.status : 'N/A';
      console.error(`⚠ URL ${href} failed. ERROR: ${error.message}, Status: ${status}`);
      broken.push({ href, status, message: error.message, elementLocator });
    }
  }

  if (broken.length > 0) {
    console.error(`❌ ${broken.length} link(s) failed on ${pageUrl}`);
  } else {
    console.log(`✅ >>> PASS! All clickable URLs on ${pageUrl} returned a 200 status. <<<`);
  }

  return { pageUrl, checked, broken };
}
