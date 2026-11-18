import { test } from '@playwright/test';
import { acceptCookies, validateCookieBanner, validateManageCookies } from '../../pages/homepage/homepage';
import { config } from 'dotenv';
config({ path: '.env' });
import { validateFooterColumns, validateFooterIconLinks, validateFooterLinks, validateFooterTranslated } from '../../pages/homepage/footer';

test('Verify Footer elements @homepage @footer', async function ({ page }) {
    await acceptCookies(page, process.env.PAGE_URL as string);
    await validateFooterColumns(page, process.env.PAGE_URL as string);
});

test('Verify Footer links @homepage @footer', async function ({ page }) {
    test.setTimeout(0);
    await acceptCookies(page, process.env.PAGE_URL as string);
    await validateFooterLinks(page, process.env.PAGE_URL as string);
});

test('Verify Footer icon links @homepage @footer', async function ({ page }) {
    await acceptCookies(page, process.env.PAGE_URL as string);
    await validateFooterIconLinks(page, process.env.PAGE_URL as string);
});

test('Verify Footer translation to Irish @homepage @footer', async function ({ page }) {
    await acceptCookies(page, process.env.PAGE_URL as string);
    await validateFooterTranslated(page, process.env.PAGE_URL as string);
});