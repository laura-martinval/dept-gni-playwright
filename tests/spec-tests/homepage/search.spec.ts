import { test } from '@playwright/test';
import { verifySearchOverlay, verifySearchOverlayCanBeClosed, verifySearchRedirectsToSearchResults, verifySearchResultsPageElements, verifySearchResultsPageWithKeyword, verifySearchWithGasKeywordAndNavigateResults, verifyPaginationFunctionality } from '../../pages/homepage/search';
import { acceptCookies } from '../../pages/homepage/homepage';
import { SearchTestData } from '../../common/test-data';
import { config } from 'dotenv';

config({ path: '.env' });

test('Verify search overlay displays all expected elements @search', async function ({ page }) {
  await acceptCookies(page, process.env.PAGE_URL as string);
  await verifySearchOverlay(page, process.env.PAGE_URL as string);
});

test('Verify search overlay can be closed @search', async function ({ page }) {
  await acceptCookies(page, process.env.PAGE_URL as string);
  await verifySearchOverlayCanBeClosed(page, process.env.PAGE_URL as string);
});

test('Verify search redirects to search results page @search', async function ({ page }) {
  await acceptCookies(page, process.env.PAGE_URL as string);
  await verifySearchRedirectsToSearchResults(page, process.env.PAGE_URL as string);
});

test('Verify search results page displays expected elements @search', async function ({ page }) {
  await acceptCookies(page, process.env.PAGE_URL as string);
  await verifySearchResultsPageElements(page, process.env.PAGE_URL as string);
});

test('Verify search results page displays expected elements for "meter" search @search', async function ({ page }) {
  await acceptCookies(page, process.env.PAGE_URL as string);
  await verifySearchResultsPageWithKeyword(page, process.env.PAGE_URL as string);
});

test('Verify search for "gas", navigate results and filter by documents @search', async function ({ page }) {
  await acceptCookies(page, process.env.PAGE_URL as string);
  await verifySearchWithGasKeywordAndNavigateResults(page, process.env.PAGE_URL as string);
});

test('Verify pagination functionality with numbers and arrows @search', async function ({ page }) {
  await acceptCookies(page, process.env.PAGE_URL as string);
  await verifyPaginationFunctionality(page, process.env.PAGE_URL as string);
});

