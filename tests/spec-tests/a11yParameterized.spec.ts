import { test } from '@playwright/test';
import { completeA11yScanOnPage_HTMLReport } from '../pages/a11y';

const pagesToCheck = (process.env.PAGES_TO_CHECK ?? '').split(',');

pagesToCheck.forEach((pageUrl) => {
  test(`Check for a11y issues on ${pageUrl} - generate a HTML report of Results @a11y`, async ({ page }) => {
    await completeA11yScanOnPage_HTMLReport(pageUrl.trim(), page);
  });
});
