import { test } from '@playwright/test';
import { testRedirections } from '../pages/redirects';

test('Validate URL redirections @redirections', async ({ page }) => {
  test.setTimeout(300000)
  await testRedirections(page);
});