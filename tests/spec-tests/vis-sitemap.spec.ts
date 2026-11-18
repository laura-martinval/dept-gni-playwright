import { test } from '@playwright/test';
import { CommonPage, getCachedSitemap} from '../common/common-page';
import { completeVisualRunOnURL} from '../pages/visual';

//REMOVE ".skip" to run across the entire sitemap
test.describe('visual @vis-sitemap', () => {
    
    test.setTimeout(0);
    const urls = getCachedSitemap();  

    for (const pageURL of urls) 
    {
        test(`Visual Test on page sitemap ${pageURL} @vis-sitemap`, async ({ page }) => {

            const commonPage = new CommonPage(page);
    
            commonPage.logInfo(`Navigate to the Base URL`);
            await page.goto(process.env.BASE_URL as string);
            await page.waitForLoadState("networkidle");
    
            commonPage.logInfo(`Dismiss the cookies popup`);
            await commonPage.dismissCookies();

            commonPage.logInfo(`START SNAPSHOT COMPARISONS`);
            console.log(`🚀 Visual Comparison for snapshot of page ${pageURL}`);
            await completeVisualRunOnURL(page, pageURL)
        })
    }  
});
