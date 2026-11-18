import { test } from '@playwright/test';
import { acceptCookies, validateCookieBanner, validateManageCookies } from '../../pages/homepage/homepage';
import { config } from 'dotenv';
config({ path: '.env' });
import { HomePageText } from "../../common/test-data";



test('Verifies Cookie banner @homepage @cookies', async function ({ page }) {
    await validateCookieBanner(page, process.env.PAGE_URL as string);
});

test('Accepts cookies @homepage @cookies', async function ({ page }) {
    await acceptCookies(page, process.env.PAGE_URL as string);
});

test('Manage Cookies @homepage @cookies', async function ({ page }) {
    await validateManageCookies(page, process.env.PAGE_URL as string, HomePageText.links.manage_cookies);
});


