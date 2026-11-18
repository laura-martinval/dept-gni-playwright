import { test } from '@playwright/test';
import { completeVisualRunOnURL } from '../pages/visual';
import { CommonPage } from '../common/common-page';

test.describe('visual @visual', () => {
       
    test.setTimeout(300000);

    const urls = JSON.parse(process.env.SITEMAP_ARRAY || '[]');

    for (const pageURL of urls) 
    {
        if (!pageURL) continue; // Skip empty URLs
        test(`Visual test on page ${pageURL} @visual`, async ({ browser, page: defaultPage }) => {

            // Only use HTTP Basic Auth if credentials are provided
            let page = defaultPage;
            let context = null;
            
            if (process.env.ACQUIA_USERNAME && process.env.ACQUIA_PASSWORD) {
                context = await browser.newContext({
                    httpCredentials: {
                        username: process.env.ACQUIA_USERNAME,
                        password: process.env.ACQUIA_PASSWORD
                    }
                });
                page = await context.newPage();
            }
            
            const commonPage = new CommonPage(page);
    
            commonPage.logInfo(`START SNAPSHOT COMPARISONS`);

            console.log(`🚀 Visual Comparison for snapshot of page ${pageURL}`);
            await completeVisualRunOnURL(page, pageURL);
            
            // Only close context if it was created
            if (context) {
                await context.close();
            }
        })
    }
});
