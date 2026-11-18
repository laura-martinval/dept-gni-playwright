import { test } from '@playwright/test';
import { completeA11yScanOnPage_ConsoleReport, completeA11yScanOnPage_HTMLReport, completeA11yScanOnSitemap_CSVReport, completeA11yScanOnSitemap_HTMLPageReports } from '../pages/a11y';

// >>> SINGLE PAGE <<<

test('Check for a11y issues on a single page - generate a HTML report of Results @a11y', async ({ page }) => {
  await completeA11yScanOnPage_HTMLReport(process.env.PAGE_URL as string, page);
});

// >>> SITEMAPS <<<

test.skip('Traverse sitemap and check for a11y on each page - generate HTML Report Per Page @sitemap_a11y', async ({ page }) => {
  test.setTimeout(0);
  await completeA11yScanOnSitemap_HTMLPageReports(page, process.env.SITEMAP_URL as string);
});

test.skip('Traverse sitemap and check for a11y on each page - generate CSV Report @sitemap_a11y', async ({ page }) => {
  test.setTimeout(0);

  await completeA11yScanOnSitemap_CSVReport(page, process.env.SITEMAP_URL as string);
});

//Optional for Developers
test.skip('Check for a11y issues on a single page and report in console @a11y', async ({ page }) => {
  await completeA11yScanOnPage_ConsoleReport(process.env.PAGE_URL as string, page);
});
