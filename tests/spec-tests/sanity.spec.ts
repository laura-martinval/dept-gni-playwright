import { test, expect } from '@playwright/test';
import { traverseSitemaps, getCachedSitemap } from '../common/common-page';
import { writeReport } from '../common/csv-report';
import axios from 'axios';
import * as https from 'https';
import { config } from 'dotenv';

config({ path: '.env' });

const SANITY_REPORT = 'csv-reports/sanity-report.csv';

interface SanityFailure {
  url: string;
  status: number | string;
  message: string;
}

// >>> pnpm sanity — sequentially checks every sitemap URL returns 200, and
// writes a single aggregated row to csv-reports/sanity-report.csv <<<
test('Validate Sitemap URLs return 200 response codes @sanity', async () => {
  test.setTimeout(0);

  // Prefer the cached sitemap.json (from `pnpm sitemap`); otherwise fetch fresh.
  let sitemapUrls = getCachedSitemap() as string[];
  if (!sitemapUrls || sitemapUrls.length === 0) {
    console.log('sitemap.json empty/missing — fetching from SITEMAP_URL');
    sitemapUrls = (await traverseSitemaps(process.env.SITEMAP_URL as string) as string[]) ?? [];
  }

  const httpsAgent = new https.Agent({ rejectUnauthorized: false });
  const axiosConfig: any = { httpsAgent }; // default validateStatus -> throws on non-2xx
  if (process.env.ACQUIA_USERNAME && process.env.ACQUIA_PASSWORD) {
    axiosConfig.auth = {
      username: process.env.ACQUIA_USERNAME,
      password: process.env.ACQUIA_PASSWORD,
    };
  }

  const failures: SanityFailure[] = [];
  const total = sitemapUrls.length;
  let index = 0;

  for (const url of sitemapUrls) {
    index++;
    try {
      const response = await axios.get(url, axiosConfig);
      console.log(`✅ URL ${index} of ${total} returned ${response.status}: ${url}`);
    } catch (error: any) {
      const status = error.response ? error.response.status : 'N/A';
      console.error(`❌ URL ${index} of ${total} failed (${status}): ${url}`);
      failures.push({ url, status, message: error.message });
    }
  }

  const comments = failures
    .map((f) => `❌ URL ${f.url} failed. ERROR: ${f.message}, Status: ${f.status}`)
    .join('\n');

  writeReport(SANITY_REPORT, [
    {
      test: 'Sanity check on sitemap',
      result: (process.env.SITEMAP_URL as string) || 'sitemap.json',
      status: failures.length === 0 ? 'Pass' : 'Fail',
      comments,
    },
  ]);

  expect(
    failures.length,
    `${failures.length} of ${total} sitemap URL(s) failed. See ${SANITY_REPORT}`,
  ).toBe(0);
});
