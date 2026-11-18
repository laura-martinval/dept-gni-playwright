import { expect, Page } from '@playwright/test';
import { CommonPage } from '../common/common-page';

export async function completeVisualRunOnURL(page: Page, url: string): Promise<void>
{
  try
    {
      const commonPage = new CommonPage(page);
      //INFO: Navigate to the page url
      await page.goto(url);

      //INFO: Dismiss the cookies popup
      await commonPage.dismissCookies();

      //INFO: Scroll the entire page to allow lazy loading to complete
      
      await commonPage.scrollUntilLazyLoadComplete();
      await commonPage.scrollToTopOfPage();
      await page.waitForTimeout(1000);

      //INFO: Wait for page to be fully loaded before taking screenshots
      await page.waitForLoadState('domcontentloaded', { timeout: 30000 });
      await page.waitForTimeout(1000);

      //INFO: Log the expected and actual urls to be aware of any redirection
      let actualUrl = page.url();
      console.log(`Expected URL: ${url} | Actual URL: ${actualUrl}`);
      
      //INFO: Remove the prefix from the url to get a standardized image name
      //actualUrl = actualUrl.replace(/^https?:\/\/(www\.|stage\.)?/, '').replace(/^gasnetworksirelandode1\.prod\.acquia-sites\.com\//, '').replace(/^gasnetworks\.ie\//, '').replace(/\//g, '-');
      //INFO: Remove the prefix from the url to get a standardized image name
      actualUrl = actualUrl
        .replace(/^https?:\/\/(www\.|stage\.)?/, '')
        .replace(/^gasnetworksirelandode1\.prod\.acquia-sites\.com\//, '')
        .replace(/^gasnetworks\.ie\//, '')
        .replace(/^[a-z0-9-]+\.vercel\.app\//, '')
        .replace(/^stripeyste\.com\//, '')
        .replace(/\//g, '-');
      //INFO: Ignore volatile videos in capture
      await page.addStyleTag({ path: 'screenshot.css' });

      //INFO: Perform the visual comparison
      console.log('>>> Starting Visual Comparison <<<');
      const isStageEnvironment = page.url().includes('stage.');
      const isAcquiaEnvironment = page.url().includes('gasnetworksirelandode1');
      const screenshotOptions: any = {fullPage: true, timeout: 10000, animations: 'disabled'};
      
      // Apply styling adjustments for stage and Acquia environments
      if (isStageEnvironment) {
        // Hide the language switcher element via CSS and add padding to maintain height
        await page.addStyleTag({ content: '.language-switcher-wrapper { display: none !important; } body { padding-top: 27px !important; padding-bottom: 33px !important; }' });
      } else if (isAcquiaEnvironment) {
        // Add padding on gasnetworksirelandode1 environment
       // await page.addStyleTag({ content: 'body { padding-bottom: 27px !important; }' });
      }
      
      await expect(page).toHaveScreenshot(actualUrl+'screenshot.png', screenshotOptions);
      console.log('✅ Visual Comparison Completed');
    }
    catch (error)
    {
      console.error(`❌ Error during visual run on URL ${url}`);
      throw error
    }
}