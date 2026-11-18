import AxeBuilder from '@axe-core/playwright';
import { injectAxe, checkA11y } from 'axe-playwright';
import { createHtmlReport } from 'axe-html-reporter';
import type { Page } from '@playwright/test';
import { Parser } from 'json2csv';
import * as fs from 'fs';
import { getCachedSitemap, traverseSitemaps } from '../common/common-page';

let testResult = 0;

export async function completeA11yScanOnPage(pageURL: string, page: Page): Promise<any[]> {
  try 
  {
    await page.goto(pageURL);

    const results = await new AxeBuilder({ page }).analyze();

    const violations = results.violations.flatMap((violation) => 
    violation.nodes.flatMap((node) => {
      const violationDetails = 
      {
        url: pageURL,
        ruleId: violation.id,
        wcag: violation.tags.filter((tag) => tag.startsWith('wcag') || tag === 'best-practice'),
        impact: violation.impact,
        description: violation.description,
        failureSummary: node.failureSummary || "", 
        selector: node.target || [], 
        html: node.html || "",
      };
      return violationDetails;
    })); 
    return violations;
  }
  catch (error) 
  {
    console.log('Failed to run completeA11yScanOnPage Correctly', error);
    return [];
  }
}

export async function completeA11yScanOnPage_HTMLReport(pageURL: string, page: Page): Promise<void> {
  try 
  {
    await page.goto(pageURL);

    const fileName = pageURL.replace(/^https:\/\//, '').replace(/\//g, '_');
    console.log(fileName);
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    createHtmlReport({
      results: accessibilityScanResults,
      options: { reportFileName: `${fileName}.html` },
    });

    if (accessibilityScanResults.violations.length > 0) {
      console.log(`Accessibility Issues found on page: ${pageURL}`);
    }
  } 
  catch (error) 
  {
    console.error('Failed to run completeA11yScanOnPage_HTMLReport Correctly', error);
    throw Error
  }
}

export async function completeA11yScanOnPage_ConsoleReport(pageURL: string,page: Page,): Promise<void> {
  try 
  {
    await page.goto(pageURL);
    await injectAxe(page);

    const options = {
      runOnly: {type: 'tag',values: ['wcag2a','wcag2aa','wcag2aaa','wcag21a','wcag21aa','wcag22aa','best-practice']},
      detailedReport: true,
      detailedReportOptions: { html: true },
    };

    await checkA11y(page, options);
  } 
  catch (error) 
  {
    console.error('Accessibility violations found:', error);
  }
}

// >>> SITEMAP SCANS <<<

export async function completeA11yScanOnSitemap_HTMLPageReports(page: Page,url: string): Promise<void> {

  const urls = getCachedSitemap();
  // Uncomment below & populate array if you want to run on a few pages in the sitemap only
  // const urls = JSON.parse(process.env.SITEMAP_ARRAY || '[]');

    for (const pageURL of urls) {
      console.log(`Checking Accessibility on ${pageURL}`);
      await completeA11yScanOnPage_HTMLReport(pageURL, page);
    }
  }

export async function completeA11yScanOnSitemap_CSVReport(page: Page,url: string): Promise<void> {

  const urls = getCachedSitemap();
  // Uncomment below & populate array if you want to run on a few pages in the sitemap only
  //const urls = ["","",""]
  
  const allResults = [];

  for (const pageURL of urls) 
  {
    console.log(`>>> Checking Accessibility on ${pageURL} <<<`);
    const pageResults = await completeA11yScanOnPage(pageURL, page);
    allResults.push(...pageResults);
    
    if (allResults.length > 0) 
    {
      testResult = 1
    }
  }

  // Generate CSV file
  const fields = ['url', 'ruleId', 'wcag', 'impact', 'description','failureSummary','selector', 'html'];
  const parser = new Parser({ fields });
  const csv = parser.parse(allResults);

  // Save CSV to file
  const fileName = 'csv-reports/a11y_scan_results.csv';
  fs.writeFileSync(fileName, csv);
  console.log(`Accessibility scan results saved to ${fileName}`);

  if (testResult == 1) throw new Error("\u274C There was a failure in the TEST RUN. Please check the logs"); 
}  
