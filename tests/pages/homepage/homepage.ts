import { Locator, Page } from "@playwright/test";
import { CommonPage } from "../../common/common-page";
import { HomePageText } from "../../common/test-data";


export class GNIHomePage extends CommonPage {


    accept_cookies: Locator;
    cookies_pop_up: Locator;
    manage_cookies: Locator;
    cookies_title: Locator;
    cookies_text: Locator;
    contact: Locator;

    constructor(public page: Page) {
        super(page);


        //COOKIE BANNER - LOCATORS
        this.accept_cookies = page.locator('//button[@id="cookie-compliance"]')
        this.cookies_pop_up = page.locator('//div[@class="d-lg-flex"]')
        this.manage_cookies = page.locator('//a[@aria-label="manage cookies"]')
        this.cookies_title = page.locator('#cookieconsent-heading')
        this.cookies_text = page.locator('//p[@class="mb-lg-0"]')

        //NAV BAR LOCATORS
        this.contact = page.locator('//li[@class="nav-item"][6]')

    }
}

//METHODS


export async function validateCookieBanner(page: Page, pageUrl: string) {
    const homePage = new GNIHomePage(page);

    console.log(`Starting Get updates pop up validation for page: ${pageUrl}`);
    await page.goto(pageUrl);
    await page.waitForTimeout(1000);

    await homePage.verifyLocatorAppearance(homePage.cookies_pop_up);
    await homePage.verifyLocatorAppearance(homePage.accept_cookies);
    await homePage.verifyLocatorAppearance(homePage.manage_cookies);

    await homePage.verifyLocatorTextNormalised(homePage.cookies_title, HomePageText.cookies.title);
    await homePage.verifyLocatorTextNormalised(homePage.cookies_text, HomePageText.cookies.text);

    await homePage.clickOnElement(homePage.accept_cookies);
    await homePage.verifyLocatorAppearance(homePage.cookies_pop_up);
    await homePage.verifyLocatorAppearance(homePage.accept_cookies);
    await homePage.verifyLocatorAppearance(homePage.manage_cookies);

    await homePage.verifyLocatorTextNormalised(homePage.cookies_title, HomePageText.cookies.title);
    await homePage.verifyLocatorTextNormalised(homePage.cookies_text, HomePageText.cookies.text);


}

export async function acceptCookies(page : Page, pageUrl: string) {
    const homePage = new GNIHomePage(page);

    console.log(`Accept cookies: ${pageUrl}`);
    await page.goto(pageUrl);
    await page.waitForTimeout(1000);
    await homePage.clickOnElement(homePage.accept_cookies);

}


export async function validateManageCookies(page :Page, pageUrl: string, expectedUrl: string) {
    const homePage = new GNIHomePage(page);

    console.log(`Manage cookies: ${pageUrl}`);
    await page.goto(pageUrl);
    await page.waitForTimeout(1000);
    await homePage.verifySingleLinkRedirection(page, homePage.manage_cookies, expectedUrl);

}


