import { Locator, Page } from "@playwright/test";
import { CommonPage } from "../../common/common-page";
import { manage_cookiesText } from "../../common/test-data";

export class ManageCookiesPage extends CommonPage {

    page_title: Locator;
    page_subtitle: Locator;
    strictly_necessary_cookies: Locator;
    see_all_strictly_necessary_cookies: Locator;
    OAM_cookies: Locator;
    arcGis_cookies: Locator;
    google_analytics_cookies: Locator;
    google_analytics_cookies_toggle: Locator;
    third_party_cookies: Locator;
    third_party_cookies_toggle: Locator;
    see_all_third_party_cookies: Locator;
    add_this_cookies: Locator;
    add_this_cookies_toggle: Locator;
    youtube_cookies: Locator;
    youtube_cookies_toggle: Locator;
    siteimprove_cookies: Locator;
    siteimprove_cookies_toggle: Locator;
    qualaroo_cookies: Locator;
    qualaroo_cookies_toggle: Locator;
    hotjar_cookies: Locator;
    hotjar_cookies_toggle: Locator;
    marketing_cookies: Locator;
    marketing_cookies_toggle: Locator;
    see_all_marketing_cookies: Locator;
    facebook_cookies: Locator;
    facebook_cookies_toggle: Locator;
    twitter_cookies: Locator;
    twitter_cookies_toggle: Locator;
    Google_cookies: Locator;
    Google_cookies_toggle: Locator;
    update_preferences_button: Locator;
    reject_all_button: Locator;

    //LOCATORS FOOTER
    manage_cookies: Locator;


    constructor(public page: Page) {
        super(page)

        //MANAGE COOKIES PAGE - LOCATORS  
        this.page_title = page.locator('.cover__title').first();
        this.page_subtitle = page.locator('.cover__text').first();
        this.strictly_necessary_cookies = page.locator('#essential-pref-label');
        this.see_all_strictly_necessary_cookies = page.locator('#headingOne');
        this.OAM_cookies = page.locator('//label[@for="essential-pref-oam"]/strong');
        this.arcGis_cookies = page.locator('//label[@for="essential-pref-arcgis"]/strong');

        this.google_analytics_cookies = page.locator('//label[@for="google-cookie-analytics"]/strong');
        this.google_analytics_cookies_toggle = page.locator('input#google-cookie-analytics + span.slider.round');

        this.third_party_cookies = page.locator('//label[@for="analytics-pref"]/strong');
        this.third_party_cookies_toggle = page.locator('input#analytics-pref + span.slider.round');
        this.see_all_third_party_cookies = page.locator('#headingTwo');
        this.add_this_cookies = page.locator('//label[@for="addthis-cookie-analytics"]/strong');
        this.add_this_cookies_toggle = page.locator('input#addthis-cookie-analytics + span.slider.round');
        this.youtube_cookies = page.locator('//label[@for="youtube-cookie-analytics"]/strong');
        this.youtube_cookies_toggle = page.locator('input#youtube-cookie-analytics + span.slider.round');
        this.siteimprove_cookies = page.locator('//label[@for="siteimprove-cookie-analytics"]/strong');
        this.siteimprove_cookies_toggle = page.locator('input#siteimprove-cookie-analytics + span.slider.round');
        this.qualaroo_cookies = page.locator('//label[@for="qualaroo-cookie-analytics"]/strong');
        this.qualaroo_cookies_toggle = page.locator('input#qualaroo-cookie-analytics + span.slider.round');
        this.hotjar_cookies = page.locator('//label[@for="hotjar-cookie-analytics"]/strong');
        this.hotjar_cookies_toggle = page.locator('input#hotjar-cookie-analytics');
        this.marketing_cookies = page.locator('//label[@for="marketing_preference"]/strong');
        this.marketing_cookies_toggle = page.locator('input#marketing_preference + span.slider.round');
        this.see_all_marketing_cookies = page.locator('#headingThree');
        this.facebook_cookies = page.locator('//label[@for="facebook-cookie-marketing"]/strong');
        this.facebook_cookies_toggle = page.locator('input#facebook-cookie-marketing + span.slider.round');
        this.twitter_cookies = page.locator('//label[@for="twitter-cookie-marketing"]/strong');
        this.twitter_cookies_toggle = page.locator('input#twitter-cookie-marketing + span.slider.round  ');
        this.Google_cookies = page.locator('//label[@for="google-cookie-marketing"]/strong');
        this.Google_cookies_toggle = page.locator('input#google-cookie-marketing + span.slider.round');

        this.update_preferences_button = page.locator('//a[@class="btn brand-button--primary cookies-prefernce-btn"]');
        this.reject_all_button = page.locator('//a[@class="btn brand-button--primary cookies-reject-btn"]');

        this.manage_cookies = page.locator('//div[@class="iw-footer__main"]//div[@class="col-12 col-md-4 col-xl-2"][2]//li[6]')

    }
}

//METHODS

export async function validateManageCookiesPage(page, pageUrl: string) {
    const manageCookiesPage = new ManageCookiesPage(page);

    console.log(`Starting Manage Cookies page validation for page: ${pageUrl}`);
    await page.goto(pageUrl);
    await page.waitForTimeout(1000);

    await manageCookiesPage.verifyLocatorAppearance(manageCookiesPage.page_title);
    await manageCookiesPage.verifyLocatorAppearance(manageCookiesPage.page_subtitle);

    await manageCookiesPage.verifyLocatorTextNormalised(manageCookiesPage.page_title, manage_cookiesText.text.page_title_manage_cookies);
    await manageCookiesPage.verifyLocatorTextNormalised(manageCookiesPage.page_subtitle, manage_cookiesText.text.page_subtitle_manage_cookies);

    await manageCookiesPage.verifyLocatorAppearance(manageCookiesPage.strictly_necessary_cookies);
    await manageCookiesPage.verifyLocatorTextNormalised(manageCookiesPage.strictly_necessary_cookies, manage_cookiesText.text.strictly_necessary_cookies_on);
    await manageCookiesPage.verifyLocatorAppearance(manageCookiesPage.see_all_strictly_necessary_cookies);
    await manageCookiesPage.clickOnElement(manageCookiesPage.see_all_strictly_necessary_cookies);
    await manageCookiesPage.verifyLocatorAppearance(manageCookiesPage.OAM_cookies);
    await manageCookiesPage.verifyLocatorAppearance(manageCookiesPage.arcGis_cookies);
    await manageCookiesPage.verifyLocatorTextNormalised(manageCookiesPage.OAM_cookies, manage_cookiesText.text.OAM_cookies_on);
    await manageCookiesPage.verifyLocatorTextNormalised(manageCookiesPage.arcGis_cookies, manage_cookiesText.text.arcGis_cookies_on);

    await manageCookiesPage.verifyLocatorAppearance(manageCookiesPage.google_analytics_cookies);
    await manageCookiesPage.verifyLocatorTextNormalised(manageCookiesPage.google_analytics_cookies, manage_cookiesText.text.google_analytics_cookies_off);

    await manageCookiesPage.verifyLocatorAppearance(manageCookiesPage.third_party_cookies);
    await manageCookiesPage.verifyLocatorTextNormalised(manageCookiesPage.third_party_cookies, manage_cookiesText.text.third_party_cookies_off);
    await manageCookiesPage.verifyLocatorAppearance(manageCookiesPage.see_all_third_party_cookies);
    await manageCookiesPage.clickOnElement(manageCookiesPage.see_all_third_party_cookies);
    await manageCookiesPage.verifyLocatorAppearance(manageCookiesPage.add_this_cookies);
    await manageCookiesPage.verifyLocatorAppearance(manageCookiesPage.youtube_cookies);
    await manageCookiesPage.verifyLocatorAppearance(manageCookiesPage.siteimprove_cookies);
    await manageCookiesPage.verifyLocatorAppearance(manageCookiesPage.qualaroo_cookies);
    await manageCookiesPage.verifyLocatorAppearance(manageCookiesPage.hotjar_cookies);
    await manageCookiesPage.verifyLocatorTextNormalised(manageCookiesPage.add_this_cookies, manage_cookiesText.text.add_this_cookies_off);
    await manageCookiesPage.verifyLocatorTextNormalised(manageCookiesPage.youtube_cookies, manage_cookiesText.text.youtube_cookies_off);
    await manageCookiesPage.verifyLocatorTextNormalised(manageCookiesPage.siteimprove_cookies, manage_cookiesText.text.siteimprove_cookies_off);
    await manageCookiesPage.verifyLocatorTextNormalised(manageCookiesPage.qualaroo_cookies, manage_cookiesText.text.qualaroo_cookies_off);
    await manageCookiesPage.verifyLocatorTextNormalised(manageCookiesPage.hotjar_cookies, manage_cookiesText.text.hotjar_cookies_off);

    await manageCookiesPage.verifyLocatorAppearance(manageCookiesPage.marketing_cookies);
    await manageCookiesPage.verifyLocatorTextNormalised(manageCookiesPage.marketing_cookies, manage_cookiesText.text.marketing_cookies_off);
    await manageCookiesPage.verifyLocatorAppearance(manageCookiesPage.see_all_marketing_cookies);
    await manageCookiesPage.clickOnElement(manageCookiesPage.see_all_marketing_cookies);
    await manageCookiesPage.verifyLocatorAppearance(manageCookiesPage.facebook_cookies);
    await manageCookiesPage.verifyLocatorAppearance(manageCookiesPage.twitter_cookies);
    await manageCookiesPage.verifyLocatorAppearance(manageCookiesPage.Google_cookies);
    await manageCookiesPage.verifyLocatorTextNormalised(manageCookiesPage.facebook_cookies, manage_cookiesText.text.facebook_cookies_off);
    await manageCookiesPage.verifyLocatorTextNormalised(manageCookiesPage.twitter_cookies, manage_cookiesText.text.twitter_cookies_off);
    await manageCookiesPage.verifyLocatorTextNormalised(manageCookiesPage.Google_cookies, manage_cookiesText.text.Google_cookies_off);

    await manageCookiesPage.verifyLocatorAppearance(manageCookiesPage.update_preferences_button);
    await manageCookiesPage.verifyLocatorAppearance(manageCookiesPage.reject_all_button);

}

export async function updateCookiesFunctionality(page, pageUrl: string) {
    const manageCookiesPage = new ManageCookiesPage(page);

    console.log(`Starting update cookies functionality for page: ${pageUrl}`);
    await page.goto(pageUrl);
    await page.waitForTimeout(1000);

    await manageCookiesPage.clickOnElement(manageCookiesPage.third_party_cookies_toggle);
    await manageCookiesPage.verifyLocatorTextNormalised(manageCookiesPage.third_party_cookies, manage_cookiesText.text.third_party_cookies_on);
    await manageCookiesPage.clickOnElement(manageCookiesPage.see_all_third_party_cookies);
    await manageCookiesPage.verifyLocatorTextNormalised(manageCookiesPage.add_this_cookies, manage_cookiesText.text.add_this_cookies_on);
    await manageCookiesPage.verifyLocatorTextNormalised(manageCookiesPage.youtube_cookies, manage_cookiesText.text.youtube_cookies_on);
    await manageCookiesPage.verifyLocatorTextNormalised(manageCookiesPage.siteimprove_cookies, manage_cookiesText.text.siteimprove_cookies_on);
    await manageCookiesPage.verifyLocatorTextNormalised(manageCookiesPage.qualaroo_cookies, manage_cookiesText.text.qualaroo_cookies_on);
    await manageCookiesPage.verifyLocatorTextNormalised(manageCookiesPage.hotjar_cookies, manage_cookiesText.text.hotjar_cookies_on);

    await manageCookiesPage.clickOnElement(manageCookiesPage.see_all_marketing_cookies);
    await manageCookiesPage.clickOnElement(manageCookiesPage.facebook_cookies_toggle);
    await manageCookiesPage.clickOnElement(manageCookiesPage.Google_cookies_toggle);
    await manageCookiesPage.verifyLocatorTextNormalised(manageCookiesPage.marketing_cookies, manage_cookiesText.text.marketing_cookies_on);
    await manageCookiesPage.verifyLocatorTextNormalised(manageCookiesPage.facebook_cookies, manage_cookiesText.text.facebook_cookies_on);
    await manageCookiesPage.verifyLocatorTextNormalised(manageCookiesPage.twitter_cookies, manage_cookiesText.text.twitter_cookies_off);
    await manageCookiesPage.verifyLocatorTextNormalised(manageCookiesPage.Google_cookies, manage_cookiesText.text.Google_cookies_on);

    await manageCookiesPage.clickOnElement(manageCookiesPage.update_preferences_button);


}
