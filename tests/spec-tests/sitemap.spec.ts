import { test } from '@playwright/test';
import { traverseSitemaps } from '../common/common-page';
test('Log the sitemap URLs @scan_sitemap', async () => {
  test.setTimeout(0)

  //Single Sitemap (including duplicates) 
  //await traverseSitemap("https://www.deptagency.com/sitemap_index.xml")

  //Multiple Sitemaps (excluding duplicates)
  await traverseSitemaps(process.env.SITEMAP_URL as string)
});
