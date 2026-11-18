import { Locator, Page } from "@playwright/test";
import { CommonPage } from "../../common/common-page";
import { FooterText } from "../../common/test-data";

export class FooterPage extends CommonPage {

    customer_care: Locator;
    x_twitter: Locator;
    contact: Locator;
    freedom_of_information: Locator;
    resources: Locator;
    model_publication_scheme: Locator;
    terms_conditions: Locator;
    privacy_notice: Locator;
    cookie_policy: Locator;
    accessibility: Locator;
    manage_cookies: Locator;
    pipe_responsability: Locator;
    company: Locator;
    about_us: Locator;
    customer_commitment: Locator;
    innovation: Locator;
    press_office: Locator;
    access_officer: Locator;
    careers: Locator;
    corporate_governance: Locator;
    procurement: Locator;
    your_water: Locator;
    in_your_area: Locator;
    local_projects: Locator;
    national_projects: Locator;
    water_supply_and_service: Locator;
    view_help_topics: Locator;
    your_preferences: Locator;
    manage_cookies2: Locator;
    water_service_SMS: Locator;
    social: Locator;





    reach_deck: Locator;
    x_icon: Locator;
    facebook_icon: Locator;
    linkedin_icon: Locator;
    youtube_icon: Locator;
    instagram_icon: Locator;
    tiktok_icon: Locator;

    gaeilge: Locator;


    constructor(public page: Page) {
        super(page)

        this.gaeilge = page.locator('#lang-switcher-ga')


        //FOOTER - LOCATORS  
        this.customer_care = page.locator('//div[@class="iw-footer__main"]//div[@class="col-12 col-md-4 col-xl-2"][1]//span')
        this.x_twitter = page.locator('//div[@class="iw-footer__main"]//div[@class="col-12 col-md-4 col-xl-2"][1]//li[1]')
        this.contact = page.locator('//div[@class="iw-footer__main"]//div[@class="col-12 col-md-4 col-xl-2"][1]//li[2]')
        this.resources = page.locator('//div[@class="iw-footer__main"]//div[@class="col-12 col-md-4 col-xl-2"][2]//span')
        this.freedom_of_information = page.locator('//div[@class="iw-footer__main"]//div[@class="col-12 col-md-4 col-xl-2"][2]//li[1]')
        this.model_publication_scheme = page.locator('//div[@class="iw-footer__main"]//div[@class="col-12 col-md-4 col-xl-2"][2]//li[2]')
        this.terms_conditions = page.locator('//div[@class="iw-footer__main"]//div[@class="col-12 col-md-4 col-xl-2"][2]//li[3]')
        this.privacy_notice = page.locator('//div[@class="iw-footer__main"]//div[@class="col-12 col-md-4 col-xl-2"][2]//li[4]')
        this.cookie_policy = page.locator('//div[@class="iw-footer__main"]//div[@class="col-12 col-md-4 col-xl-2"][2]//li[5]')
        this.accessibility = page.locator('//div[@class="iw-footer__main"]//div[@class="col-12 col-md-4 col-xl-2"][2]//li[7]')
        this.manage_cookies = page.locator('//div[@class="iw-footer__main"]//div[@class="col-12 col-md-4 col-xl-2"][2]//li[6]')
        this.pipe_responsability = page.locator('//div[@class="iw-footer__main"]//div[@class="col-12 col-md-4 col-xl-2"][2]//li[8]')

        this.company = page.locator('//div[@class="iw-footer__main"]//div[@class="col-12 col-md-4 col-xl-2"][3]//span')
        this.about_us = page.locator('//div[@class="iw-footer__main"]//div[@class="col-12 col-md-4 col-xl-2"][3]//li[1]')
        this.customer_commitment = page.locator('//div[@class="iw-footer__main"]//div[@class="col-12 col-md-4 col-xl-2"][3]//li[2]')
        this.innovation = page.locator('//div[@class="iw-footer__main"]//div[@class="col-12 col-md-4 col-xl-2"][3]//li[3]')
        this.access_officer = page.locator('//div[@class="iw-footer__main"]//div[@class="col-12 col-md-4 col-xl-2"][3]//li[5]')
        this.press_office = page.locator('//div[@class="iw-footer__main"]//div[@class="col-12 col-md-4 col-xl-2"][3]//li[4]')
        this.careers = page.locator('//div[@class="iw-footer__main"]//div[@class="col-12 col-md-4 col-xl-2"][3]//li[6]')
        this.corporate_governance = page.locator('//div[@class="iw-footer__main"]//div[@class="col-12 col-md-4 col-xl-2"][3]//li[7]')
        this.procurement = page.locator('//div[@class="iw-footer__main"]//div[@class="col-12 col-md-4 col-xl-2"][3]//li[8]')

        this.your_water = page.locator('//div[@class="iw-footer__main"]//div[@class="col-12 col-md-4 col-xl-2"][4]//span')
        this.in_your_area = page.locator('//div[@class="iw-footer__main"]//div[@class="col-12 col-md-4 col-xl-2"][4]//li[1]')
        this.local_projects = page.locator('//div[@class="iw-footer__main"]//div[@class="col-12 col-md-4 col-xl-2"][4]//li[2]')
        this.national_projects = page.locator('//div[@class="iw-footer__main"]//div[@class="col-12 col-md-4 col-xl-2"][4]//li[3]')
        this.water_supply_and_service = page.locator('//div[@class="iw-footer__main"]//div[@class="col-12 col-md-4 col-xl-2"][4]//li[4]')
        this.view_help_topics = page.locator('//div[@class="iw-footer__main"]//div[@class="col-12 col-md-4 col-xl-2"][4]//li[5]')

        this.your_preferences = page.locator('//div[@class="iw-footer__main"]//div[@class="col-12 col-md-4 col-xl-2"][5]//span')
        this.manage_cookies2 = page.locator('//div[@class="iw-footer__main"]//div[@class="col-12 col-md-4 col-xl-2"][5]//li[1]')
        this.water_service_SMS = page.locator('//div[@class="iw-footer__main"]//div[@class="col-12 col-md-4 col-xl-2"][5]//li[2]')

        //ICON SECTION - LOCATORS
        this.social = page.locator('#block-ue-theme-iwsocialfooter')
        this.reach_deck = page.locator('#__ba_panel')
        this.social = page.locator('//div[@class="iw-footer__main"]//div[@class="col-12 col-md-4 col-xl-2"][6]//span').first()
        this.x_icon = page.locator('//div[@class="iw-footer__main"]//div[@class="col-12 col-md-4 col-xl-2"][6]//li[2]')
        this.linkedin_icon = page.locator('//div[@class="iw-footer__main"]//div[@class="col-12 col-md-4 col-xl-2"][6]//li[4]')
        this.facebook_icon = page.locator('//div[@class="iw-footer__main"]//div[@class="col-12 col-md-4 col-xl-2"][6]//li[1]')
        this.youtube_icon = page.locator('//div[@class="iw-footer__main"]//div[@class="col-12 col-md-4 col-xl-2"][6]//li[3]')
        this.instagram_icon = page.locator('//div[@class="iw-footer__main"]//div[@class="col-12 col-md-4 col-xl-2"][6]//li[5]')
        this.tiktok_icon = page.locator('//div[@class="iw-footer__main"]//div[@class="col-12 col-md-4 col-xl-2"][6]//li[6]')

    }
}

//METHODS

export async function validateFooterColumns(page: Page, pageUrl: string) {
    const footerPage = new FooterPage(page);

    console.log(`Starting footer validation for page: ${pageUrl}`);
    await page.goto(pageUrl);
    await page.waitForTimeout(1000);

    await footerPage.verifyLocatorAppearance(footerPage.customer_care);
    await footerPage.verifyLocatorAppearance(footerPage.x_twitter);
    await footerPage.verifyLocatorAppearance(footerPage.contact);

    await footerPage.verifyLocatorAppearance(footerPage.resources);
    await footerPage.verifyLocatorAppearance(footerPage.freedom_of_information);
    await footerPage.verifyLocatorAppearance(footerPage.model_publication_scheme);
    await footerPage.verifyLocatorAppearance(footerPage.terms_conditions);
    await footerPage.verifyLocatorAppearance(footerPage.privacy_notice);
    await footerPage.verifyLocatorAppearance(footerPage.cookie_policy);
    await footerPage.verifyLocatorAppearance(footerPage.manage_cookies);
    await footerPage.verifyLocatorAppearance(footerPage.accessibility);
    await footerPage.verifyLocatorAppearance(footerPage.pipe_responsability);

    await footerPage.verifyLocatorAppearance(footerPage.company);
    await footerPage.verifyLocatorAppearance(footerPage.about_us);
    await footerPage.verifyLocatorAppearance(footerPage.customer_commitment);
    await footerPage.verifyLocatorAppearance(footerPage.press_office);
    await footerPage.verifyLocatorAppearance(footerPage.access_officer);
    await footerPage.verifyLocatorAppearance(footerPage.careers);
    await footerPage.verifyLocatorAppearance(footerPage.corporate_governance);
    await footerPage.verifyLocatorAppearance(footerPage.procurement);

    await footerPage.verifyLocatorAppearance(footerPage.your_water);
    await footerPage.verifyLocatorAppearance(footerPage.in_your_area);
    await footerPage.verifyLocatorAppearance(footerPage.local_projects);
    await footerPage.verifyLocatorAppearance(footerPage.national_projects);
    await footerPage.verifyLocatorAppearance(footerPage.water_supply_and_service);
    await footerPage.verifyLocatorAppearance(footerPage.view_help_topics);

    await footerPage.verifyLocatorAppearance(footerPage.your_preferences);
    await footerPage.verifyLocatorAppearance(footerPage.manage_cookies2);
    await footerPage.verifyLocatorAppearance(footerPage.water_service_SMS);

    await footerPage.verifyLocatorAppearance(footerPage.social);
    await footerPage.verifyLocatorAppearance(footerPage.reach_deck);
    await footerPage.verifyLocatorAppearance(footerPage.x_icon);
    await footerPage.verifyLocatorAppearance(footerPage.facebook_icon);
    await footerPage.verifyLocatorAppearance(footerPage.linkedin_icon);
    await footerPage.verifyLocatorAppearance(footerPage.youtube_icon);
    await footerPage.verifyLocatorAppearance(footerPage.instagram_icon);
    await footerPage.verifyLocatorAppearance(footerPage.tiktok_icon);

    await footerPage.verifyLocatorTextNormalised(footerPage.customer_care, FooterText.titles.customer_care);
    await footerPage.verifyLocatorTextNormalised(footerPage.resources, FooterText.titles.resources);
    await footerPage.verifyLocatorTextNormalised(footerPage.company, FooterText.titles.company);
    await footerPage.verifyLocatorTextNormalised(footerPage.your_water, FooterText.titles.your_water);
    await footerPage.verifyLocatorTextNormalised(footerPage.your_preferences, FooterText.titles.your_preferences);
    await footerPage.verifyLocatorTextNormalised(footerPage.social, FooterText.titles.social);

}

export async function validateFooterLinks(page : Page, pageUrl: string) {
    const footerPage = new FooterPage(page);

    console.log(`Footer links: ${pageUrl}`);
    await page.goto(pageUrl);
    await page.waitForTimeout(1000);

    await footerPage.verifySingleLinkRedirection(page, footerPage.contact, FooterText.links.contact);
    await footerPage.verifySingleLinkRedirection(page, footerPage.freedom_of_information, FooterText.links.freedom_of_information);
    await footerPage.verifySingleLinkRedirection(page, footerPage.model_publication_scheme, FooterText.links.model_publication_scheme);
    await footerPage.verifySingleLinkRedirection(page, footerPage.terms_conditions, FooterText.links.terms_conditions);
    await footerPage.verifySingleLinkRedirection(page, footerPage.privacy_notice, FooterText.links.privacy_notice);
    await footerPage.verifySingleLinkRedirection(page, footerPage.cookie_policy, FooterText.links.cookie_policy);
    await footerPage.verifySingleLinkRedirection(page, footerPage.manage_cookies, FooterText.links.manage_cookies);
    await footerPage.verifySingleLinkRedirection(page, footerPage.accessibility, FooterText.links.accessibility);
    await footerPage.verifySingleLinkRedirection(page, footerPage.pipe_responsability, FooterText.links.pipe_responsability);
    await footerPage.verifySingleLinkRedirection(page, footerPage.about_us, FooterText.links.about_us);
    await footerPage.verifySingleLinkRedirection(page, footerPage.customer_commitment, FooterText.links.customer_commitment);
    await footerPage.verifySingleLinkRedirection(page, footerPage.innovation, FooterText.links.innovation);
    await footerPage.verifySingleLinkRedirection(page, footerPage.press_office, FooterText.links.press_office);
    await footerPage.verifySingleLinkRedirection(page, footerPage.access_officer, FooterText.links.access_office);
    await footerPage.verifySingleLinkRedirection(page, footerPage.careers, FooterText.links.careers);
    await footerPage.verifySingleLinkRedirection(page, footerPage.corporate_governance, FooterText.links.corporate_governance);
    await footerPage.verifySingleLinkRedirection(page, footerPage.procurement, FooterText.links.procurement);
    await footerPage.verifySingleLinkRedirection(page, footerPage.in_your_area, FooterText.links.in_your_area);
    await footerPage.verifySingleLinkRedirection(page, footerPage.local_projects, FooterText.links.local_projects);
    await footerPage.verifySingleLinkRedirection(page, footerPage.national_projects, FooterText.links.national_projects);
    await footerPage.verifySingleLinkRedirection(page, footerPage.water_supply_and_service, FooterText.links.water_suppply_and_service);
    await footerPage.verifySingleLinkRedirection(page, footerPage.view_help_topics, FooterText.links.view_help_topics);
    await footerPage.verifySingleLinkRedirection(page, footerPage.manage_cookies2, FooterText.links.ymanage_cookies2);
    await footerPage.verifySingleLinkRedirection(page, footerPage.water_service_SMS, FooterText.links.water_service_SMS);


}

export async function validateFooterIconLinks(page : Page, pageUrl: string) {
    const footerPage = new FooterPage(page);

    console.log(`Footer links: ${pageUrl}`);
    await page.goto(pageUrl);
    await page.waitForTimeout(1000);

    await footerPage.verifyRedirectInNewTab(page, footerPage.x_twitter, FooterText.links.x_care);
    await footerPage.verifyRedirectInNewTab(page, footerPage.x_icon, FooterText.links.x);
    await footerPage.verifyRedirectInNewTab(page, footerPage.facebook_icon, FooterText.links.facebook);
    await footerPage.verifyRedirectInNewTab(page, footerPage.linkedin_icon, FooterText.links.linkedin);
    await footerPage.verifyRedirectInNewTab(page, footerPage.youtube_icon, FooterText.links.youtube);
    await footerPage.verifyRedirectInNewTab(page, footerPage.instagram_icon, FooterText.links.instagram);
    await footerPage.verifyRedirectInNewTab(page, footerPage.tiktok_icon, FooterText.links.tiktok);


}

export async function validateFooterTranslated(page : Page, pageUrl: string) {
    const footerPage = new FooterPage(page);

    console.log(`Footer translation: ${pageUrl}`);
    await page.goto(pageUrl);
    await page.waitForTimeout(1000);

    await footerPage.gaeilge.click({ force: true });

    await footerPage.verifyLocatorTextNormalised(footerPage.customer_care, FooterText.titles.customer_care_ga);
    await footerPage.verifyLocatorTextNormalised(footerPage.contact, FooterText.titles.contact_ga);

    await footerPage.verifyLocatorTextNormalised(footerPage.resources, FooterText.titles.resources_ga);
    await footerPage.verifyLocatorTextNormalised(footerPage.freedom_of_information, FooterText.titles.freedom_of_information_ga);
    await footerPage.verifyLocatorTextNormalised(footerPage.model_publication_scheme, FooterText.titles.model_publication_scheme_ga);
    await footerPage.verifyLocatorTextNormalised(footerPage.terms_conditions, FooterText.titles.terms_conditions_ga);
    await footerPage.verifyLocatorTextNormalised(footerPage.privacy_notice, FooterText.titles.privacy_notice_ga);
    await footerPage.verifyLocatorTextNormalised(footerPage.cookie_policy, FooterText.titles.cookie_policy_ga);
    await footerPage.verifyLocatorTextNormalised(footerPage.manage_cookies, FooterText.titles.manage_cookies_ga);
    await footerPage.verifyLocatorTextNormalised(footerPage.accessibility, FooterText.titles.accessibility_ga);
    await footerPage.verifyLocatorTextNormalised(footerPage.pipe_responsability, FooterText.titles.pipe_responsability_ga);



    await footerPage.verifyLocatorTextNormalised(footerPage.company, FooterText.titles.company_ga);
    await footerPage.verifyLocatorTextNormalised(footerPage.about_us, FooterText.titles.about_us_ga);
    await footerPage.verifyLocatorTextNormalised(footerPage.customer_commitment, FooterText.titles.customer_commitment_ga);
    await footerPage.verifyLocatorTextNormalised(footerPage.innovation, FooterText.titles.innovation_ga);
    await footerPage.verifyLocatorTextNormalised(footerPage.press_office, FooterText.titles.press_office_ga);
    await footerPage.verifyLocatorTextNormalised(footerPage.access_officer, FooterText.titles.access_officer_ga);
    await footerPage.verifyLocatorTextNormalised(footerPage.careers, FooterText.titles.careers_ga);
    await footerPage.verifyLocatorTextNormalised(footerPage.corporate_governance, FooterText.titles.corporate_governance_ga);
    await footerPage.verifyLocatorTextNormalised(footerPage.procurement, FooterText.titles.procurement_ga);


    await footerPage.verifyLocatorTextNormalised(footerPage.your_water, FooterText.titles.your_water);
    await footerPage.verifyLocatorTextNormalised(footerPage.in_your_area, FooterText.titles.in_your_area_ga);
    await footerPage.verifyLocatorTextNormalised(footerPage.local_projects, FooterText.titles.local_projects_ga);
    await footerPage.verifyLocatorTextNormalised(footerPage.national_projects, FooterText.titles.national_projects_ga);
    await footerPage.verifyLocatorTextNormalised(footerPage.water_supply_and_service, FooterText.titles.water_supply_and_service_ga);
    await footerPage.verifyLocatorTextNormalised(footerPage.view_help_topics, FooterText.titles.view_help_topics_ga);

    await footerPage.verifyLocatorTextNormalised(footerPage.your_preferences, FooterText.titles.your_preferences);
    await footerPage.verifyLocatorTextNormalised(footerPage.manage_cookies2, FooterText.titles.manage_cookies2_ga);
    await footerPage.verifyLocatorTextNormalised(footerPage.water_service_SMS, FooterText.titles.water_service_SMS);


    await footerPage.verifyLocatorTextNormalised(footerPage.social, FooterText.titles.social);

}

