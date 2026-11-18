import { test } from '@playwright/test';
import * as fs from 'fs';

test('extract GA URLs from sitemap', async ({ page }) => {
  const url = 'https://uisceeireann.prod.acquia-sites.com/sitemap.xml?page=3';

  console.log(`Loading ${url}...`);
  await page.goto(url, { waitUntil: 'load', timeout: 60000 });

  // The page loads table data dynamically - wait for content to appear
  // First, try to detect when the table gets populated
  let rowCount = 0;
  let attempts = 0;
  const maxAttempts = 30;
  
  while (rowCount === 0 && attempts < maxAttempts) {
    rowCount = await page.evaluate(() => {
      return document.querySelectorAll('table tbody tr').length;
    });
    
    if (rowCount === 0) {
      await page.waitForTimeout(500);
      attempts++;
    }
  }
  
  console.log(`Loaded after ${attempts * 500}ms with ${rowCount} rows`);

  // Save screenshot for inspection
  await page.screenshot({ path: './test-results/sitemap-page.png', fullPage: true });

  // Get HTML content for inspection
  const htmlContent = await page.content();
  fs.writeFileSync('./test-results/sitemap-page.html', htmlContent);

  // Extract GA URLs from the "Translation set" column
  const gaUrls = await page.evaluate(() => {
    const rows = Array.from(document.querySelectorAll('table tbody tr'));
    const urls: string[] = [];

    rows.forEach((row) => {
      const cells = Array.from(row.querySelectorAll('td'));
      
      // Look at column 4 (Translation set) which should be the 5th column (0-indexed)
      if (cells[4]) {
        const cellText = cells[4].textContent || '';
        
        // The format appears to be: "en<url_en> ga<url_ga>" without clear separation
        // Extract URLs that come after "ga"
        const gaMatch = cellText.match(/ga(https?:\/\/[^\s]+)/);
        if (gaMatch && gaMatch[1]) {
          urls.push(gaMatch[1]);
        }
      }
    });

    return urls;
  });

  console.log(`Found ${gaUrls.length} GA URLs (with duplicates)`);
  
  // Remove duplicates
  const uniqueUrls = Array.from(new Set(gaUrls));
  
  console.log(`Found ${uniqueUrls.length} unique GA URLs`);
  uniqueUrls.slice(0, 10).forEach((url, index) => {
    console.log(`  ${index + 1}. ${url}`);
  });
  if (uniqueUrls.length > 10) {
    console.log(`  ... and ${uniqueUrls.length - 10} more`);
  }

  // Convert to CSV with header
  const csvContent = ['GA URL', ...uniqueUrls].join('\n');

  fs.writeFileSync('./csv-reports/ga_urls.csv', csvContent);

  console.log('✅ CSV saved to ./csv-reports/ga_urls.csv');
});
