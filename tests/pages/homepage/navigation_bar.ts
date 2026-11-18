import { Locator, Page } from "@playwright/test";
import { CommonPage } from "../../common/common-page";
import {  NavBarText } from "../../common/test-data";


export class NavBarPage extends CommonPage {

    UE_logo: Locator;
    help: Locator;
    business: Locator;
    connections: Locator;
    projects: Locator;
    conservation: Locator;
    contact: Locator;
    search: Locator;
    hamburguer_menu: Locator;
    language: Locator;
    in_your_area: Locator;
    in_your_area_ga: Locator;
    gaeilge: Locator;


    constructor(public page: Page) {
        super(page);


        //FOOTER - LOCATORS  
        this.UE_logo = page.locator('//a[@class="navbar-brand"]')
        this.help = page.locator('//li[@class="nav-item"][1]')
        this.business = page.locator('//li[@class="nav-item"][2]')
        this.connections = page.locator('//li[@class="nav-item"][3]')
        this.projects = page.locator('//li[@class="nav-item"][4]')
        this.conservation = page.locator('//li[@class="nav-item"][5]')
        this.contact = page.locator('//li[@class="nav-item"][6]')
        this.hamburguer_menu = page.locator('//div[@class="d-flex position-relative"]/button[2]')
        this.search = page.locator('//div[@class="d-flex position-relative"]/button[1]')
        this.language = page.locator('#lang-switcher-homepage')
        this.in_your_area = page.locator('//a[@href="/in-your-area"]')
        this.gaeilge = page.locator('#lang-switcher-ga')
        this.in_your_area_ga = page.locator('//a[@href="/in-your-area/"]')

    }
}

//METHODS

export async function validateNavigationBarElements(page : Page, pageUrl: string) {
    const navBarPage = new NavBarPage(page);

    console.log(`Starting navigation bar validation for page: ${pageUrl}`);
    await page.goto(pageUrl);
    await page.waitForTimeout(1000);

    await navBarPage.verifyLocatorAppearance(navBarPage.UE_logo);
    await navBarPage.verifyLocatorAppearance(navBarPage.help);
    await navBarPage.verifyLocatorAppearance(navBarPage.business);
    await navBarPage.verifyLocatorAppearance(navBarPage.connections);
    await navBarPage.verifyLocatorAppearance(navBarPage.contact);
    await navBarPage.verifyLocatorAppearance(navBarPage.projects);
    await navBarPage.verifyLocatorAppearance(navBarPage.conservation);
    await navBarPage.verifyLocatorAppearance(navBarPage.hamburguer_menu);
    await navBarPage.verifyLocatorAppearance(navBarPage.search);
    await navBarPage.verifyLocatorAppearance(navBarPage.language);
    await navBarPage.verifyLocatorAppearance(navBarPage.in_your_area);

}

export async function validateNavBarlinks(page : Page, pageUrl: string) {
    const navBarPage = new NavBarPage(page);

    console.log(`Nav Bar links: ${pageUrl}`);
    await page.goto(pageUrl);
    await page.waitForTimeout(1000);

    // //English links
    await navBarPage.verifySingleLinkRedirection(page, navBarPage.UE_logo, NavBarText.links.logo_en);
    await navBarPage.verifySingleLinkRedirection(page, navBarPage.help, NavBarText.links.help_en);
    await navBarPage.verifySingleLinkRedirection(page, navBarPage.business, NavBarText.links.business_en);
    await navBarPage.verifySingleLinkRedirection(page, navBarPage.connections, NavBarText.links.connections_en);
    await navBarPage.verifySingleLinkRedirection(page, navBarPage.projects, NavBarText.links.projects_en);
    await navBarPage.verifySingleLinkRedirection(page, navBarPage.conservation, NavBarText.links.conservation_en);
    await navBarPage.verifySingleLinkRedirection(page, navBarPage.contact, NavBarText.links.contact_en);
    await navBarPage.verifySingleLinkRedirection(page, navBarPage.in_your_area, NavBarText.links.in_your_area);


    await navBarPage.gaeilge.click({ force: true });

    await page.waitForTimeout(1000);

    //IRISH links
    await navBarPage.verifySingleLinkRedirection(page, navBarPage.UE_logo, NavBarText.links.logo_ga);
    await navBarPage.verifySingleLinkRedirection(page, navBarPage.help, NavBarText.links.help_ga);
    await navBarPage.verifySingleLinkRedirection(page, navBarPage.business, NavBarText.links.business_ga);
    await navBarPage.verifySingleLinkRedirection(page, navBarPage.connections, NavBarText.links.connections_ga);
    await navBarPage.verifySingleLinkRedirection(page, navBarPage.projects, NavBarText.links.projects_ga);
    await navBarPage.verifySingleLinkRedirection(page, navBarPage.conservation, NavBarText.links.conservation_ga);
    await navBarPage.verifySingleLinkRedirection(page, navBarPage.contact, NavBarText.links.contact_ga);
    await navBarPage.verifySingleLinkRedirection(page, navBarPage.in_your_area_ga, NavBarText.links.in_your_area);

}

