import { test, expect } from '@playwright/test';
import { getCachedSitemap } from '../common/common-page';
import { validateClickableLinks, loadLinkCheckUrls, formatBrokenLink, PageLinkResult } from '../pages/links';
import { writeReport, ReportRow } from '../common/csv-report';
import { config } from 'dotenv';

config({ path: '.env' });

const LINKS_REPORT = 'csv-reports/links-report.csv';
const SITEMAP_LINKS_REPORT = 'csv-reports/links-sitemap-report.csv';
const TEST_LABEL = 'Link test on the following pages';

/** Turn per-page results into the TEST,RESULT,STATUS,COMMENTS rows. */
function buildRows(results: PageLinkResult[]): ReportRow[] {
  return results.map((result, i) => ({
    test: i === 0 ? TEST_LABEL : '',
    result: result.pageUrl,
    status: result.broken.length === 0 ? 'Pass' : 'Fail',
    comments: result.broken.map(formatBrokenLink).join('\n'),
  }));
}

// >>> pnpm links — checks the pages listed in mappings/linkCheckUrls.json <<<
test('Validate Clickable URLs on Pages @links', async ({ page }) => {
  test.setTimeout(0);

  const urls = loadLinkCheckUrls();
  const results: PageLinkResult[] = [];

  for (const pageURL of urls) {
    results.push(await validateClickableLinks(page, pageURL));
  }

  writeReport(LINKS_REPORT, buildRows(results));

  const totalBroken = results.reduce((sum, r) => sum + r.broken.length, 0);
  expect(totalBroken, `${totalBroken} broken link(s) found. See ${LINKS_REPORT}`).toBe(0);
});

// >>> pnpm links-sitemap — checks every page in the cached sitemap.json <<<
test('Validate Clickable URLs on Sitemap Pages @sitemap_links', async ({ page }) => {
  test.setTimeout(0);

  const urls = getCachedSitemap();
  const results: PageLinkResult[] = [];

  for (const pageURL of urls) {
    results.push(await validateClickableLinks(page, pageURL));
  }

  writeReport(SITEMAP_LINKS_REPORT, buildRows(results));

  const totalBroken = results.reduce((sum, r) => sum + r.broken.length, 0);
  expect(totalBroken, `${totalBroken} broken link(s) found. See ${SITEMAP_LINKS_REPORT}`).toBe(0);
});
