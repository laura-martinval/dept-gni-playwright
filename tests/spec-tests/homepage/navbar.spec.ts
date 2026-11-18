import { test } from '@playwright/test';
import { acceptCookies, closeAlertsPopUp, privacyNoticeFunctionality, signUpLinkFunctionality, validateAlertsPopUp, validateCookieBanner, validateManageCookies } from '../../pages/homepage/homepage';
import { config } from 'dotenv';
config({ path: '.env' });
import { validateNavBarlinks, validateNavigationBarElements } from '../../pages/homepage/navigation_bar';

test ('Verify navigation bar elements @homepage @navbar', async function ({ page }) {
    await acceptCookies(page, process.env.PAGE_URL as string);
    await validateNavigationBarElements(page, process.env.PAGE_URL as string);
});

test('Verify nav bar links @homepage @navbar', async function ({ page }) {
    test.setTimeout(0);
    await acceptCookies(page, process.env.PAGE_URL as string);
    await validateNavBarlinks (page, process.env.PAGE_URL as string);
});

