import { strict } from "assert";
import { homedir } from "os";

export const inputData = {
    valid_input: {
        email: "test@test.com",
        email2: "test2@test.com",
        wprn: "1235410",
        telephone_number: "0812560100",
        text: "Testing O'Tést",

    },
    invalid_input: {
        only_digits: "1234",
        only_letters: "Test.",
        wrong_email: "test@",
        longer_wprn: "342235454425",
    }
};


export const HomePageText = {
    alerts: {
        title: "Get updates about your water service",
        description: "If something is affecting the water supply to your home or business, you need to know about it as soon as possible.",
        signUpLink: "Sign up for free text alerts",
    },
    cookies: {
        title: "Cookie preferences",
        text: "We use your information, collected through cookies, to improve your experience of our website, analyse how you use it and, if you choose to accept all cookies, show you relevant ads. Only the absolutely necessary cookies will run in order to operate this session for you. You do not have to accept all of the cookies used by our website.",

    },
    links: {
        privacy_notice: "https://www.water.ie/privacy-notice",
        sign_up_free: "https://www.water.ie/water-service-updates",
        manage_cookies: "https://www.water.ie/manage-cookies",
    }
};

export const FooterText = {
    titles: {
        customer_care: "Customer Care",
        resources: "Resources",
        company: "Company",
        your_water: "Your Water",
        your_preferences: "Your preferences",
        social: "Social",
        customer_care_ga: "Cúram do chustaiméirí",
        resources_ga: "Acmhainní",
        company_ga: "Cuideachta",
        contact_ga: "Teagmháil",
        freedom_of_information_ga: "Saoráil Faisnéise",
        model_publication_scheme_ga: "Scéim foilsithe múnlaí",
        terms_conditions_ga: "Téarmaí & Coinníollacha",
        privacy_notice_ga: "Fógra príobháideachais",
        cookie_policy_ga: "Polasaí fianán",
        manage_cookies_ga: "Bainistigh fianáin",
        accessibility_ga: "Inrochtaineacht",
        pipe_responsability_ga: "Freagrachtaí Píopa",
        about_us_ga: "Maidir linn",
        customer_commitment_ga: "Gealltanas do chustaiméirí",
        innovation_ga: "Taighde agus nuálaíocht",
        press_office_ga: "Preasoifig",
        access_officer_ga: "Oifigeach rochtana",
        careers_ga: "Gairmeacha",
        corporate_governance_ga: "Corporate Governance",
        procurement_ga: "Soláthar",
        in_your_area_ga: "In your area",
        local_projects_ga: "Local projects",
        national_projects_ga: "Cláir Náisiúnta",
        water_supply_and_service_ga: "Water supply and service",
        view_help_topics_ga: "Féach ar thopaicí cúnta",
        manage_cookies2_ga: "Fianáin",
        water_service_SMS: "Water Service SMS"

    },
    links: {
        x_care: "https://x.com/IWCare",
        contact: "https://www.water.ie/contact",
        freedom_of_information: "https://www.water.ie/about/freedom-of-information",
        model_publication_scheme: "https://www.water.ie/about/model-publication-scheme",
        terms_conditions: "https://www.water.ie/terms-and-conditions",
        privacy_notice: "https://www.water.ie/privacy-notice",
        cookie_policy: "https://www.water.ie/cookie-policy",
        manage_cookies: "https://www.water.ie/manage-cookies",
        accessibility: "https://www.water.ie/accessibility-statement",
        pipe_responsability: "https://www.water.ie/help/pipe-maintenance-responsibility",
        about_us: "https://www.water.ie/about",
        customer_commitment: "https://www.water.ie/about/our-customer-commitment",
        innovation: "https://www.water.ie/about/research-and-innovation",
        press_office: "https://www.water.ie/contact/press-office",
        access_office: "https://www.water.ie/contact/access-officer",
        careers: "https://www.water.ie/about/careers",
        corporate_governance: "https://www.water.ie/about/about-irish-water/corporate-governance",
        procurement: "https://www.water.ie/about/procurement",
        in_your_area: "https://www.water.ie/in-your-area",
        local_projects: "https://www.water.ie/projects/local-projects",
        national_projects: "https://www.water.ie/projects/national-projects",
        water_suppply_and_service: "https://www.water.ie/help/water-quality/results/allresults",
        view_help_topics: "https://www.water.ie/help",
        ymanage_cookies2: "https://www.water.ie/manage-cookies",
        water_service_SMS: "https://www.water.ie/water-service-updates/opt-out",


        x: "https://x.com/IrishWater",
        facebook: "https://www.facebook.com/IrishWater/",
        linkedin: "https://www.linkedin.com/",
        youtube: "https://consent.youtube.com/",
        instagram: "https://www.instagram.com/uisce_eireann/",
        tiktok: "https://www.tiktok.com/@uisce_eireann_official"


    }

};

export const NavBarText = {
    links: {
        logo_en: "https://www.water.ie/",
        help_en: "https://www.water.ie/help",
        business_en: "https://www.water.ie/business",
        connections_en: "https://www.water.ie/connections",
        projects_en: "https://www.water.ie/projects",
        conservation_en: "https://www.water.ie/conservation",
        contact_en: "https://www.water.ie/contact",
        switcher_lang: "https://www.water.ie/ga",
        logo_ga: "https://www.water.ie/ga",
        help_ga: "https://www.water.ie/ga/help",
        business_ga: "https://www.water.ie/ga/business",
        connections_ga: "https://www.water.ie/ga/connections",
        projects_ga: "https://www.water.ie/ga/projects",
        conservation_ga: "https://www.water.ie/ga/conservation",
        contact_ga: "https://www.water.ie/ga/contact",
        in_your_area: "https://www.water.ie/in-your-area"

    }
};
export const FormsText = {
    text: {
        page_title_contact_us: "General enquiries",
        page_title_business: "General enquiries for business customers",
        page_title_LA: "Query your local authority agreement",
        page_title_update_details: "Update your account details",
        page_title_find_WPRN: "Find your WPRN or application number",
        page_title_effluent_licence: "Apply for a Trade Effluent Licence",
        page_title_FOG_licence: "Apply for a fats, oils & grease licence",
        page_title_Haulier: "Haulier tankered wastewater agreement",
        page_title_producer: "Producer tankered wastewater agreement",
        page_title_sludge: "Sludge Letter of Authorisation",
        page_title_reprot_blockage: "Report a blockage in your home",
        page_title_water_service_preferences: "Water Service SMS Preferences",
        page_subtitle_contact_us: "Fill in the form below to contact us with any general enquiries. Please note there is an approximate 3-day response time.",
        page_subtitle_business: "Use the form to contact us with your queries. Please note that there is an approximate 5-day response time.",
        page_subtitle_LA: "Fill in the form below and include proof of your agreement. Note there is an approximate 5-day response time.",
        page_subtitle_find_WPRN: "Check an Uisce Éireann letter for your WPRN or application number. Alternatively, contact us via the form below.",
        page_subtitle_effluent_licence: "Fill in the application form below to apply for a trade effluent licence.",
        page_subtitle_FOG_licence: "A trade effluent discharge to sewer licence (issued under Section 16 of the Local Government (Water Pollution) Act 1977, as amended) is a legal requirement if your business discharges trade effluent to a public sewer.",
        page_subtitle_Haulier: "Haulier tankered wastewater agreement",
        page_subtitle_producer: "Producer tankered wastewater agreement",
        page_subtitle_sludge: "Apply for an Uisce Éireann Sludge Letter of Authorisation.",
        page_subtitle_report_blockage: "Fill in our online form to report a blockage.",
        page_subtitle_water_service_preferences: "If you have already opted into the water service's SMS notifications service and no longer wish to receive service text alerts please enter details of the registered mobile number below",
        page_header_LA: "Alternatively, send your enquiry to Uisce Éireann, P.O. Box 860, South City Delivery Office, Cork City, Cork. Please include proof of your agreement.",
        page_header_Find_WPRN: "Look at an Uisce Éireann bill or letter for your WPRN or application number. If you cannot find what you need, fill in the form to get in touch with a member of our team.",
        page_header_Haulier: "In order to apply for a Tankered Wastewater Agreement for a Haulier, we need to generate a unique application identification number that will help you keep track of your application.",
        page_header_producer: "In order to apply for a Tankered Wastewater Agreement for a Producer, we need to generate a unique application identification number that will help you keep track of your application.",
        page_header_sludge: "In order to apply for an Uisce Éireann Sludge Letter of Authorisation, we need to generate a unique application identification number that will help you keep track of your application.",
        page_header_report_blockage: "To report a wastewater blockage affecting your property, please fill in the form below.If wastewater is currently flooding your property, or you are a registered vulnerable customer, please call us immediately on 1800 278 278.Please note Uisce Éireann are only responsible for the maintenance of the public sewer mains. For more information, please visit our pipe maintenance responsibility page.If your investigation returns as a private side blockage, please contact a reputable drain service company.A reference number for your investigation will be issued to you via the email address provided.Please note fields with an asterisk * are mandatory.",
        form_title: "Applicant Details",
        page_intro_water_service_preferences: "Update your preferencesSMS notifications for supply interruptions and bursts lasting more than 4 hours in your area.If you have already opted into this service and no longer wish to receive notifications, please enter the details of the registered mobile number below.",
        page_feedback_water_service_preferences: "This will opt you out of outage notifications for all Eircodes registered for this service on this mobile number. We will also delete all records of communications sent to date.",
        page_footnote_water_service_preferences:  "Please note: We may need to contact you in order to validate the details providedWe will not share your information with third parties outside of the provision of this serviceFor information on how we store your data, view our Privacy Notice.",
        mandatory_text: "Please note fields with an asterisk*are mandatory.",
        mandatory_text2: "Please note fields with an asterisk * are mandatory.",
        disclaimer: "By clicking the send button you are agreeing to us and/or our agents contacting you regarding this form.",
    },
    validation_messages: {
        mandatory_field: "This field is required",
        captcha_mandatory: "Please verify that you are not a robot.",
        format_email: "Please enter a valid email address",
        only_digits: "Only digits are allowed",
        only_digits2: "Please enter only digits.",
        only_digits3: "Please enter only digits",
        email_dont_match: "The specified email addresses do not match.",
        wrong_WPRN: "Your WPRN is 7 digits in length and does not contain letters or special characters",
        wrong_phone_number: "Please enter a valid phone number.",
    }
};

export const BreadcrumbsText = {
    text: {
        projects: "Projects",
        contact: "Contact"
    },
    links: {
        home: "https://www.water.ie/",
    }
};
export const manage_cookiesText = {
    text: {
        page_title_manage_cookies: "Cookies",
        page_subtitle_manage_cookies: "Learn how to manage cookies on our site with the guidance below.",
        strictly_necessary_cookies_on: "Strictly necessary (On)",
        OAM_cookies_on: "OAM (On)",
        arcGis_cookies_on: "Arcgis (On)",
        google_analytics_cookies_off: "Google Analytics (Off)",
        google_analytics_cookies_on: "Google Analytics (On)",
        third_party_cookies_off: "Third Party Analytics (Off)",
        third_party_cookies_on: "Third Party Analytics (On)",
        add_this_cookies_off: "Add This (Off)",
        add_this_cookies_on: "Add This (On)",
        youtube_cookies_off: "Youtube (Off)",
        youtube_cookies_on: "Youtube (On)",
        siteimprove_cookies_off: "Siteimprove (Off)",
        siteimprove_cookies_on: "Siteimprove (On)",
        qualaroo_cookies_off: "Qualaroo (Off)",
        qualaroo_cookies_on: "Qualaroo (On)",
        hotjar_cookies_off: "Hot Jar (Off)",
        hotjar_cookies_on: "Hot Jar (On)",
        marketing_cookies_off: "Marketing (Off)",
        marketing_cookies_on: "Marketing (On)",
        facebook_cookies_off: "Facebook (Off)",
        facebook_cookies_on: "Facebook (On)",
        twitter_cookies_off: "Twitter (Off)",
        Google_cookies_off: "Google (Off)",
        twitter_cookies_on: "Twitter (On)",
        Google_cookies_on: "Google (On)",

    }
};


export const title: string[] = ['Please select', 'Mr', 'Mrs', 'Ms', 'Miss', 'Dr'];
export const home_breadcrumb: string[] = ['Help', 'Business', 'Connections', 'Projects', 'Conservation', 'Contact', 'About Us'];
export const contact_breadcrumb: string[] = ['Report a leak on public property', 'Business enquiries', 'Report a damaged water lid', 'Report flooding from a public sewer', 'Report flooding from a public watermain', 'General Enquiry', 'Report a blockage in your home', 'Third Party Site Visit Request'];
export const projects_breadcrumb: string[] = ['Local Projects', 'National Projects', 'Strategic Plans'];
export const home_breadcrumb_urls = {
    'Help': 'https://www.water.ie/help',
    'Business': 'https://www.water.ie/business',
    'Connections': 'https://www.water.ie/connections',
    'Projects': 'https://www.water.ie/projects',
    'Conservation': 'https://www.water.ie/conservation',
    'Contact': 'https://www.water.ie/contact',
    'About Us': 'https://www.water.ie/about'
};
export const projects_breadcrumb_urls = {
    'Local Projects': 'https://www.water.ie/projects/local-projects',
    'National Projects': 'https://www.water.ie/projects/national-projects',
    'Strategic Plans': 'https://www.water.ie/projects/strategic-plans'
};

export const contact_breadcrumb_urls = {
    'Report a leak on public property': 'https://www.water.ie/contact/leak-on-public-property',
    'Business enquiries': 'https://www.water.ie/contact/business-customers',
    'Report a damaged water lid': 'https://www.water.ie/contact/damaged-water-lid',
    'Report flooding from a public sewer': 'https://www.water.ie/contact/flooding-from-sewer',
    'Report flooding from a public watermain': 'https://www.water.ie/contact/flooding-from-watermain',
    'General Enquiry': 'https://www.water.ie/contact/general-enquiry',
    'Report a blockage in your home': 'https://www.water.ie/contact/blockage-in-your-home',
    'Third Party Site Visit Request': 'https://www.water.ie/contact/site-visit-request'
};
export const country: string[] = [
    'Please select',
    '+353',
    '+44'
]
export const county: string[] = [
    'Please select',
    'Carlow',
    'Cavan',
    'Clare',
    'Cork',
    'Donegal',
    'Dublin',
    'Galway',
    'Kerry',
    'Kildare',
    'Kilkenny',
    'Laois',
    'Leitrim',
    'Limerick',
    'Longford',
    'Louth',
    'Mayo',
    'Meath',
    'Monaghan',
    'Offaly',
    'Roscommon',
    'Sligo',
    'Tipperary',
    'Waterford',
    'Westmeath',
    'Wexford',
    'Wicklow'
];

export const SearchTestData = {
    keyword: "meter",
    gasKeyword: "gas",
    searchResultsUrl: "https://www.gasnetworks.ie/search?query="
};