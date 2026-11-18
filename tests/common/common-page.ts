import type { FrameLocator, Locator, Page} from '@playwright/test';
import { expect } from '@playwright/test';
import axios from 'axios';
import { load } from 'cheerio';
import * as fs from 'fs';
import * as https from 'https';
import path from 'path';

export class CommonPage 
{
    constructor(public page: Page) {}

// >>> COMMON ACTION METHODS <<<

async logInfo(message: string) 
{ 
  console.log("\x1b[33m%s\x1b[0m", message);
}

async dismissCookies() 
{
    const acceptCookiesBtn = await this.page.locator('#cookie-compliance');

  if (await acceptCookiesBtn.isVisible())
  {
    await acceptCookiesBtn.click();
    await this.page.waitForTimeout(3000)
  }
  else
  {
    console.log("Cookies popup not visible")
  }
}

async closePopupWhenAppears(page: Page, closePopupSelector: string)
{
  (async (page) => {
    try 
    {
        while (true) {
            const popupElement = await page.$(closePopupSelector);
            if (popupElement) {
                await popupElement.click();
                await page.waitForTimeout(1000)
            }
        }
    } 
    catch (error) 
    {
        console.log("Test completed with popup closed");
    }
  })(page);
}
//Generic methods

 getRandomString(options: string[]): string {
  if (options.length === 0) {
    throw new Error('Array cannot be empty');
  }
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
}

async getAttributeValueOfElement(element: Locator, attribute: string): Promise<string | null> 
{
  const attributeValue = await element.getAttribute(attribute);
  return attributeValue;
}

async getTextOfLocator(element: Locator)
{
  const text = await element.textContent();
  return text;
}

async getCurrentURL() 
{
  return await this.page.url();
}

async scrollToElement(element: Locator) 
{
  await element.scrollIntoViewIfNeeded();
}

async clickOnElement(element: Locator) 
{
  await element.click();
}

async checkElement(element: Locator)
{
  await element.scrollIntoViewIfNeeded();
  await this.page.waitForTimeout(500);
  await element.click({ force: true });
}

async hoverOverElement(element: Locator) 
{
  await element.hover();
}

async hoverOverAndClick(element: Locator) 
{
  await element.hover();
  await element.click();
}

async inputText(element: Locator, text: string) 
{
  await element.fill(text)
}

async getCountOfElement(element: Locator): Promise<number> 
{
  const count = await element.count();
  return count
}

async clickOnElementNTimes(element: Locator, clickCount: number) 
{
  
  await expect(element).toBeVisible();

  for (let i = 0; i < clickCount; i++) 
  {
      await element.click();
      await this.page.waitForTimeout(1000)
  }
}

async pressKeyboardKey(key: string) 
{
  await this.page.keyboard.press(key)
}

async pressKeyboardKeyNTimes(key: string, clickCount: number) 
{
  for (let i = 0; i < clickCount; i++) {
      await this.page.keyboard.press(key)
      await this.page.waitForTimeout(1000)
  }
}

async selectDropdownValue(element: Locator, value: string) 
{
  await element.click(); 
  await element.selectOption(value)
}

async scrollToTopOfPage() 
{
  return this.page.evaluate(() => window.scrollTo(0, -document.documentElement.scrollHeight));
}

async scrollToBottomoOfPage() 
{
  return this.page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
}

async scrollUntilLazyLoadComplete() 
{
  const scrollIncrement = 500; 

  while (true) 
  {
    await this.page.evaluate((increment) => 
    {
      window.scrollBy(0, increment);
    }, scrollIncrement);

    await this.page.waitForTimeout(500);

    const currentPosition = await this.page.evaluate(() => window.scrollY);
    const viewportHeight = await this.page.evaluate(() => window.innerHeight);
    const totalHeight = await this.page.evaluate(() => document.documentElement.scrollHeight);

    if (currentPosition + viewportHeight >= totalHeight) {
      break;
    }
  }
}

async swipeRight() 
{
  const startX = 300;
  const startY = 300;
  const endX = 100;
  const endY = 300;

  await this.page.mouse.move(startX, startY);
  await this.page.mouse.down();
  await this.page.mouse.move(endX, endY, { steps: 10 });
  await this.page.mouse.up();
}

async swipeLeft() 
{
  const startX = 100;
  const startY = 300;
  const endX = 300;
  const endY = 300;

  await this.page.mouse.move(startX, startY);
  await this.page.mouse.down();
  await this.page.mouse.move(endX, endY, { steps: 10 });
  await this.page.mouse.up();
}

// >>> COMMON VERIFICATION METHODS <<<

async verifyPageTitle(title: string) {
  await expect(this.page).toHaveTitle(title);
}

async verifyLocatorAppearance(locator: Locator) {
  await expect(locator).toBeVisible();
}

async verifyiFrameAppearance(locator: FrameLocator) {
  await expect(locator).toBeTruthy();
}

async verifyiFrameValue(iframeLocator: FrameLocator, selector: string, expectedValue: string) 
{
  const inputElement = iframeLocator.locator(selector);
  await inputElement.waitFor(); 
  const actualValue = await inputElement.inputValue();
  expect(actualValue).toBe(expectedValue); 
  console.log(`Actual value: "${actualValue}" matches expected value: "${expectedValue}"`);
}

async verifyLocatorNotVisible(locator: Locator) {
  await expect(locator).not.toBeVisible();
}

async verifyLocatorsAppearance(locators: Locator[]) 
{
  await Promise.all(
    locators.map(async (locator) => {
      await expect(locator).toBeVisible();
    }),
  );
}

async verifyLocatorText(locator: Locator, message: string) 
{
  expect(await locator.textContent()).toEqual(message);
}

async verifyLocatorNotPresent(locator: Locator) 
{
  await expect(locator).toHaveCount(0);
}

async verifyLocatorAttributeValue(locator: Locator, attribute: string, expected: string | RegExp) 
{
  const attributeValue = await locator.getAttribute(attribute);
  expect(attributeValue).toMatch(expected);
  console.log(attributeValue + " matches expected " + expected)
}

async verifyLocatorTextNormalised(locator: Locator, expectedText: string) 
{
  const actualText = await locator.textContent();

  const normalize = (text: string | null) =>
    text?.replace(/\s+/g, ' ').trim() || '';

  expect(normalize(actualText)).toEqual(normalize(expectedText));
}

async verifyDropdownValues(dropdownLocator: Locator, expectedValues: string[]): Promise<void> {
  // Get all option elements from the dropdown
  const options = dropdownLocator.locator('option');
  const optionCount = await options.count();

  // Get the text content of all options
  const actualValues: string[] = [];
  for (let i = 0; i < optionCount; i++) {
    const optionText = await options.nth(i).textContent();
    if (optionText && optionText.trim() !== '') {
      actualValues.push(optionText.trim());
    }
  }

  // Compare the actual values with expected values
  if (JSON.stringify(actualValues) === JSON.stringify(expectedValues)) {
    console.log(`✓ Dropdown values match expected values: ${actualValues.join(', ')}`);
  } else {
    throw new Error(`Dropdown values do not match. Expected: ${expectedValues.join(', ')}, but got: ${actualValues.join(', ')}`);
  }
}

async verifyAnchorTextValues(anchorLocators: Locator, expectedValues: string[]): Promise<void> {
  // Get all anchor elements within the container
  const anchors = anchorLocators.locator('a');
  const anchorCount = await anchors.count();

  // Get the text content of all anchors
  const actualValues: string[] = [];
  for (let i = 0; i < anchorCount; i++) {
    const anchorText = await anchors.nth(i).textContent();
    if (anchorText) {
      // Normalize whitespace: replace multiple spaces/newlines with single space and trim
      const normalizedText = anchorText.replace(/\s+/g, ' ').trim();
      if (normalizedText !== '') {
        actualValues.push(normalizedText);
      }
    }
  }

  // Compare the actual values with expected values
  if (JSON.stringify(actualValues) === JSON.stringify(expectedValues)) {
    console.log(`✓ Anchor text values match expected values: ${actualValues.join(', ')}`);
  } else {
    throw new Error(`Anchor text values do not match. Expected: ${expectedValues.join(', ')}, but got: ${actualValues.join(', ')}`);
  }
}

async verifyBreadcrumbRedirects(containerLocator: Locator, breadcrumbUrlMap: Record<string, string>): Promise<void> {
  // Get all anchor elements within the container
  const anchors = containerLocator.locator('a');
  const anchorCount = await anchors.count();

  for (let i = 0; i < anchorCount; i++) {
    const anchor = anchors.nth(i);
    const anchorText = await anchor.textContent();
    
    if (anchorText) {
      const normalizedText = anchorText.replace(/\s+/g, ' ').trim();
      const expectedUrl = breadcrumbUrlMap[normalizedText];

      if (!expectedUrl) {
        throw new Error(`No expected URL found for breadcrumb: "${normalizedText}"`);
      }

      // Get the href attribute
      const href = await anchor.getAttribute('href');

      if (href === expectedUrl || href?.includes(expectedUrl.split('.ie')[1])) {
        console.log(`✓ Breadcrumb "${normalizedText}" points to correct URL: ${expectedUrl}`);
      } else {
        throw new Error(`Breadcrumb "${normalizedText}" URL mismatch. Expected: ${expectedUrl}, but got: ${href}`);
      }
    }
  }
}

async verifyBreadcrumbClickRedirection(containerLocator: Locator, breadcrumbUrlMap: Record<string, string>): Promise<void> {
  // Get all anchor elements within the container
  const anchors = containerLocator.locator('a');
  const anchorCount = await anchors.count();

  for (let i = 0; i < anchorCount; i++) {
    const anchor = anchors.nth(i);
    const anchorText = await anchor.textContent();
    
    if (anchorText) {
      const normalizedText = anchorText.replace(/\s+/g, ' ').trim();
      const expectedUrl = breadcrumbUrlMap[normalizedText];

      if (!expectedUrl) {
        throw new Error(`No expected URL found for breadcrumb: "${normalizedText}"`);
      }

      // Click the anchor and wait for navigation
      await anchor.click();
      await this.page.waitForLoadState('networkidle');

      // Verify the URL
      const currentUrl = this.page.url();
      if (currentUrl.includes(expectedUrl.split('.ie')[1]) || currentUrl === expectedUrl) {
        console.log(`✓ Breadcrumb click "${normalizedText}" successfully redirected to: ${currentUrl}`);
      } else {
        throw new Error(`Breadcrumb click "${normalizedText}" failed. Expected URL containing: ${expectedUrl}, but got: ${currentUrl}`);
      }

      // Navigate back to the original page
      await this.page.goBack();
      await this.page.waitForLoadState('networkidle');
    }
  }
}

async verifyNewTabURLContainsText(texts: string[]) 
{
  
  const newTab = await this.page.waitForEvent("popup",{ timeout: 50000 });
  await newTab.waitForLoadState("load");
  const URL = await newTab.url();
  
  for (const text of texts) 
  {
    expect(URL).toContain(text);
  }
  await newTab.close()
}

async verifyCurrentTabURLContainsText(texts: string[]) 
{
  await this.page.waitForLoadState("networkidle");
  const URL = await this.page.url();
  
  for (const text of texts) 
  {
      expect(URL).toContain(text);
      console.log(`The URL "${URL}" contains the expected text: "${text}"`)
  }
}

async traverseLinksAndVerifyRedirection(element: Locator, verificationArray: string[])
{
  const count = (await element.all()).length;
  
  if (count === 0) 
  {
    throw new Error('No elements found for traversal');
  }

  for (let i = 0; i < count; i++) {
    
    // Click the link
    await element.nth(i).click();
    await this.page.waitForLoadState("networkidle");
    await this.page.waitForTimeout(1000)

    // Verify the redirection
    const currentURL = await this.page.url();
    expect(currentURL).toContain(verificationArray[i])
    console.log(currentURL + " contains expected URL " + verificationArray[i])
    await this.page.goBack()
    await this.page.waitForLoadState("networkidle");
  }
}

async traverseMobileHeaderLinksAndVerifyRedirection(hamburger: Locator, element: Locator, verificationArray: string[]){

  const count = (await element.all()).length;
    if (count === 0) 
    {
      throw new Error('No elements found for traversal');
    }

    for (let i = 0; i < count; i++) 
    {
      await this.clickOnElement(hamburger)
      await this.page.waitForTimeout(1500)
      await this.clickOnElement(element.nth(i))
      await this.page.waitForTimeout(1500);

      // Verify the redirection
      const currentURL = await this.page.url();
      expect(currentURL).toContain(verificationArray[i])
      console.log(currentURL + " contains expected URL " + verificationArray[i])
    }
}

async traverseLinksAndVerifyRedirectionStayOnPage(element: Locator, verificationArray: string[])
{
  const count = (await element.all()).length;
  let expectedURL = ""

  for (let i = 0; i < count; i++) {
    
    // Click the header link
    await element.nth(i).click();
    await this.page.waitForLoadState("load");
    await this.page.waitForTimeout(1000)

    // Verify the redirection
    const currentURL = await this.page.url();
    expect(currentURL).toContain(verificationArray[i])
    console.log(currentURL + " contains expected URL " + expectedURL)
  }
}

async shouldHaveCorrectImageSrc(locator: Locator, expectedImageSrc: string) 
{
  const imageSrc = await(locator).getAttribute('src');
  expect(imageSrc).toBe(expectedImageSrc);
}

// >> CAROUSELS <<

async verifyRedirectionOnCarouselWithImageAltAttributes(activeCard: Locator, activeCardImg: Locator, NxtBtn: Locator, heroImgHrefArray : string[])
{
  let attributeBase = await this.getAttributeValueOfElement(activeCardImg,'alt');
  let attributeCurrent = null;
  let i = 1;

  //Repeat card click redirection until all images in the carousel have been verified
  while (attributeBase !== attributeCurrent) 
  {
    //Get the image's associated href
    const imgURL = await this.getAttributeValueOfElement(activeCard,'href');
  
    //click on the image and verify redirection  
    await this.clickOnElement(activeCard)
    await this.page.waitForTimeout(3000)
    await this.page.waitForLoadState("domcontentloaded");
    
    const currentURL = await this.getCurrentURL()
    expect(currentURL).toContain(imgURL);
    expect(currentURL).toContain(heroImgHrefArray[i]);

    //Return to the carousel after redirect check
    await this.page.goBack()
    await this.page.waitForLoadState("domcontentloaded");

    //Verify the next carousel item 
    await this.clickOnElementNTimes(NxtBtn,i);
    i = i + 1;
    attributeCurrent = await this.getAttributeValueOfElement(activeCardImg,'alt');
  }
  //Final check after loop has completed - attributeBase should equal attributeCurrent
  await expect(attributeBase).toEqual(attributeCurrent);
}
  
async verifyRedirectionOnCarouselWithTextItems(activeCard: Locator, ScrollBtn: Locator, expectedArray : string[])
{
  let attributeBase = await this.getTextOfLocator(activeCard);
  let attributeCurrent = null;
  let i = 0;

  //Repeat card click redirection until all carousel items have been verified
  while (attributeBase !== attributeCurrent) {
    
    const currentURL = await this.getCurrentURL()
    expect(currentURL).toContain(expectedArray[i]);
    console.log(currentURL + " contains text " + expectedArray[i])

    //Verify the next carousel item 
    await this.clickOnElement(ScrollBtn);
    await this.page.waitForTimeout(1500)
    await this.page.waitForLoadState("networkidle")
    i = i + 1;
    attributeCurrent = await this.getTextOfLocator(activeCard);
}

  //Final check after loop has completed - attributeBase should equal attributeCurrent
  await expect(attributeBase).toEqual(attributeCurrent);
}

async verifyCarouselFunctionalityViaBtnClick(activeCard: Locator, attributeValue: string, ScrollBtnNxt: Locator, ScrollBtnPrev: Locator){
    
  let attributeBase = await this.getAttributeValueOfElement(activeCard,attributeValue);
  let attributeCurrent = null;

  let attributeArrayNxt = [];
  let i = 0;
  let attributeArrayPrev = [];
  let j = 0;

  // > CHECK SCROLL NEXT FUNCTIONALITY <

  while (attributeBase !== attributeCurrent) 
  {
    await this.clickOnElement(ScrollBtnNxt);
    await this.page.waitForLoadState("networkidle")
    await this.page.waitForTimeout(1500)
    attributeCurrent = await this.getAttributeValueOfElement(activeCard,attributeValue);
    i++
    console.log("Checking Page: " + this.page.url())
    expect(attributeArrayNxt).not.toContain(attributeCurrent);
    attributeArrayNxt.push(attributeCurrent)
  }

  console.log("Number of items in carousel after scrolling next: " + i)
  console.log("Array: " + attributeArrayNxt)
  await expect(attributeBase).toEqual(attributeCurrent);

  // > CHECK SCROLL PREV FUNCTIONALITY <

  attributeCurrent = null;

  while (attributeBase !== attributeCurrent) 
  {
    await this.clickOnElement(ScrollBtnPrev);
    await this.page.waitForLoadState("networkidle")
    await this.page.waitForTimeout(2000)
    attributeCurrent = await this.getAttributeValueOfElement(activeCard,attributeValue);
    j++
    console.log("Checking Page: " + this.page.url())
    expect(attributeArrayPrev).not.toContain(attributeCurrent);
    attributeArrayPrev.push(attributeCurrent)
  }

  console.log("Number of items in carousel after scrolling prev: " + j)
  console.log("Array: " + attributeArrayPrev)
  await expect(attributeBase).toEqual(attributeCurrent);
};

async verifySingleLinkRedirection(page: Page, element: Locator, expectedUrlPart: string) {
  if (!(await element.isVisible())) {
    throw new Error('Target element is not visible on the page');
  }


  await element.click();
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000);

  const currentUrl = await page.url();
  expect(currentUrl).toContain(expectedUrlPart);
  console.log(`${currentUrl} contains expected URL part: ${expectedUrlPart}`);

}

async verifyRedirectInNewTab(page: Page, element: Locator, expectedUrlPart: string) 
{
  if (!(await element.isVisible())) {
    throw new Error('Target element is not visible on the page');
  }

  const [newPage] = await Promise.all([
    page.context().waitForEvent('page'),
    element.click(),
  ]);

  await newPage.waitForLoadState('domcontentloaded'); 
  await newPage.waitForTimeout(1000);

  const currentUrl = newPage.url();
  expect(currentUrl).toContain(expectedUrlPart);
  console.log(`New tab: ${currentUrl} contains expected URL part: ${expectedUrlPart}`);
  await newPage.close();
  

}

async verifyCarouselFunctionalityViaSwipe(carouselElements: Locator, attributeValue: string){
    
  let count = (await carouselElements.all()).length;
  let attributeCurrent = null;
  let attributeArrayNxt = [];
  let attributeArrayPrev = [];

  // > CHECK SCROLL NEXT FUNCTIONALITY <

  for (let i = 0; i < count-1; i++) 
  {
    await this.swipeRight()
    await this.page.waitForLoadState("networkidle")
    await this.page.waitForTimeout(3000)
    attributeCurrent = await this.getAttributeValueOfElement(carouselElements.nth(i),attributeValue);
    expect(attributeArrayNxt).not.toContain(attributeCurrent);
    attributeArrayNxt.push(attributeCurrent)
  }

  console.log("Number of items in carousel: " + count)
  console.log("Array Next: " + attributeArrayNxt)

  // > CHECK SCROLL PREV FUNCTIONALITY <

  attributeCurrent = null;

  for (let j = count-1; j >= 0; j--) 
  { 
    await this.swipeLeft()
    await this.page.waitForLoadState("networkidle")
    await this.page.waitForTimeout(1500)
    attributeCurrent = await this.getAttributeValueOfElement(carouselElements.nth(j),attributeValue);
    expect(attributeArrayPrev).not.toContain(attributeCurrent);
    attributeArrayPrev.push(attributeCurrent)
  }

  console.log("Number of items in carousel: " + count)
  console.log("Array Prev: " + attributeArrayPrev)
}

};

// >>> ADDITIONAL EXPORTS <<<

export const getiFrame = (attribute: string, page: Page) => {
  return  page.frameLocator(attribute);
}

//>> SITEMAPS <<

let urls: string[] = [];

export function getCachedSitemap() {
  try {
    // Check if file exists first
    if (!fs.existsSync('sitemap.json')) {
      console.warn('⚠️  sitemap.json not found. Run "pnpm sitemap" first to generate it.');
      return [];
    }
    
    const jsonString = fs.readFileSync('sitemap.json', 'utf8');
    
    // Handle empty file
    if (!jsonString.trim()) {
      console.warn('⚠️  sitemap.json is empty. Run "pnpm sitemap" first to generate it.');
      return [];
    }
    
    const uniqueUrls = JSON.parse(jsonString);
    return uniqueUrls;
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error(`❌ Error reading sitemap.json: ${msg}`);
    return [];
  }
}

export async function traverseSingleSitemap(url: string, httpsAgent?: https.Agent) 
{
  try 
  {
    const sitemapUrl = url;
    const config: any = httpsAgent ? { httpsAgent } : {};
    
    // Add User-Agent header
    config.headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    };
    
    // Add HTTP Basic Auth if credentials are provided
    if (process.env.ACQUIA_USERNAME && process.env.ACQUIA_PASSWORD) {
      config.auth = {
        username: process.env.ACQUIA_USERNAME,
        password: process.env.ACQUIA_PASSWORD
      };
    }
    
    const response = await axios.get(sitemapUrl, config);
    const sitemapXml = response.data;
    const $ = load(sitemapXml, { xmlMode: true });
    const locElements = $('loc');

    // Check if <loc> elements exist
    if (locElements.length === 0) 
    {
      console.error('No <loc> elements found in the sitemap.');
      return;
    }

    // Iterate through each <loc> element
     
    for (let index = 0; index < locElements.length; index++) 
    {
      const element = locElements[index];
      const pageUrl = $(element).text();
      urls.push(pageUrl);
      //console.log(pageUrl);
    }

    console.log('Total URLs:', urls.length);
    return urls;
  } 
  catch (error) 
  {
    console.error(`Error fetching or parsing the sitemap from ${url}:`, error);
  }
}

export async function traverseSitemaps(url: string) {
  try 
  {
    const httpsAgent = new https.Agent({ rejectUnauthorized: false });
    
    // Configure axios request with optional HTTP Basic Auth if credentials are provided
    const axiosConfig: any = { 
      httpsAgent,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    };
    
    if (process.env.ACQUIA_USERNAME && process.env.ACQUIA_PASSWORD) {
      axiosConfig.auth = {
        username: process.env.ACQUIA_USERNAME,
        password: process.env.ACQUIA_PASSWORD
      };
    }
    
    const response = await axios.get(url, axiosConfig);
    const sitemapXml = response.data;
    const $ = load(sitemapXml, { xmlMode: true });
    
    const sitemapElements = $('sitemap');

    // Check if it is a sitemap index
    if (sitemapElements.length > 0) 
    {
      // Traverse each child sitemap
      for (let index = 0; index < sitemapElements.length; index++) {
        const childSitemapUrl = $(sitemapElements[index]).find('loc').text();
        console.log(`Found child sitemap: ${childSitemapUrl}`);
        await traverseSingleSitemap(childSitemapUrl, httpsAgent);
      }
    } 
    else 
    {
      await traverseSingleSitemap(url, httpsAgent);
    }
    
    // >> CONSOLIDATED SITEMAP INFO <<<

    console.log('>>> URL SITEMAP INFO <<<');

    console.log('Total URLs:', urls.length);
    const uniqueUrls = [...new Set(urls)];
    console.log('Total unique URLs:', uniqueUrls.length);

    //Read in the exclude sitemap urls
    const excludePathString = fs.readFileSync('exclude-sitemap.json', 'utf8');
    const excludePaths = JSON.parse(excludePathString);

    //Filter out the exclude based on partial match without domain to make it work accross environments
    const filteredUrls = uniqueUrls.filter(url => !excludePaths.some((excludePath: string) => url.endsWith(excludePath)));

    console.log('Total filtered URLs:', filteredUrls.length);

    const jsonData = JSON.stringify(filteredUrls, null, 2);

    // Use synchronous write to ensure file is written before function returns
    fs.writeFileSync("sitemap.json", jsonData);

    // Ensure csv-reports directory exists
    if (!fs.existsSync('csv-reports')) {
      fs.mkdirSync('csv-reports', { recursive: true });
    }

    const csvContent = filteredUrls.map(url => `${url}`).join('\n');
    fs.writeFileSync('csv-reports/sitemaps.csv', csvContent);
    return filteredUrls;
  } 
  catch (error) 
  {
    console.error(`Error fetching sitemap from ${url}:`, error);
  }
}