# dept-skeleton-playwright

## NAME

Dept Skeleton Framework

## DESCRIPTION

The Dept Skeleton Framework uses Playwright to assist with regression activities and for performing

1. Functional Tests - to check the functionality of a component on a page. These tests will need to be written by QA
2. Sanity Checks - ensures all pages in a sitemap return 200 response codes
3. A11y Checks - A11y test runs on single pages and sitemaps
4. Visual Regression - to capture baseline images of a site (various widths/screen sizes) and use these in subsequent comparisons
5. Links Checks - Verify that all links attached to a page return 200 reponse codes
6. Performance Checks - Uses Unlighthouse to crawl the site capture page and site scores

## GETTING STARTED

1. Clone the project - https://gitlab.com/dept-ie/qa/dept-skeleton-playwright
2. Once the project is cloned, run pnpm i to initialize the project and install the relevant packages (listed in package.json)
3. Ensure that you can perform a simple test run by running 'pnpm chrome'.
4. Commands to run various tests are configured in 'package.json'

5. Tests use tags to run on different configurations (configured in package,json and playwright.conf
   ig.ts)  
   e.g. Simple DEPT Test POM @chrome @safari @ff

- to run on chrome, run pnpm chrome
- to run on ff, run pnpm firefox

## USING PLAYWRIGHT MCP SERVER FOR AI-ASSISTED TEST GENERATION

The Playwright MCP (Model Context Protocol) server enables AI assistants to interact with web pages and generate tests through natural language prompts. This powerful feature allows you to explore websites, identify elements, and create test automation code without manually inspecting the DOM.

### WHAT IS MCP?

MCP (Model Context Protocol) is a standardized protocol that allows AI assistants like Claude, GitHub Copilot, or ChatGPT to connect to external tools and services. The Playwright MCP server exposes Playwright's browser automation capabilities to AI assistants, enabling them to:

- Navigate to URLs and interact with live websites
- Take screenshots and accessibility snapshots
- Click buttons, fill forms, and interact with page elements
- Generate test code based on observed behavior
- Debug existing tests by exploring the actual site

### SETUP

1. **Install the Playwright MCP package** (if not already installed):

   ```bash
   npm install -D @playwright/mcp
   ```

2. **Configure your AI assistant to use the Playwright MCP server**:

   For GitHub Copilot (VSCode), the MCP server is typically auto-configured when the extension detects the package.

   For Claude Desktop, add to your `claude_desktop_config.json`:

   ```json
   {
     "mcpServers": {
       "playwright": {
         "command": "npx",
         "args": ["@playwright/mcp@latest"]
       }
     }
   }
   ```

3. **Verify the MCP server is available**:
   ```bash
   npx @playwright/mcp@latest --help
   ```

### USING PROMPTS TO GENERATE TESTS

#### Example 1: Exploring a Page and Creating a Test

**Prompt:**

```
Navigate to https://www.deptagency.com/en-uki/ and explore the culture carousel
component (the one with B CORP Certified, Award-winning Agency, etc.).
Generate a Playwright test that verifies all 4 carousel items are clickable
and display the correct content.
```

The AI assistant will:

1. Use `mcp_playwright_browser_navigate` to visit the URL
2. Use `mcp_playwright_browser_snapshot` to analyze the page structure
3. Use `mcp_playwright_browser_click` to interact with carousel buttons
4. Generate a test file with proper locators and assertions
5. Follow project conventions (POM, logging, timeouts, cookie handling)

#### Example 2: Generating Tests with Context

**Prompt:**

```
Look at the homepage.spec.ts file to understand the project structure,
then create a similar test for the navigation menu that verifies all
menu items are visible and clickable.
```

The AI will:

1. Read the existing test file to understand patterns
2. Navigate to the site and identify menu elements
3. Generate a new test following the same structure
4. Use the same Page Object Model approach
5. Include proper error handling and logging

#### Example 3: Debugging Existing Tests

**Prompt:**

```
The carousel test is failing on Firefox. Navigate to the page and check
if the cookie banner is blocking the carousel buttons.
```

The AI can:

1. Navigate to the live site
2. Take screenshots showing the issue
3. Identify the cookie banner element
4. Suggest code fixes (e.g., adding `dismissCookies()` or force clicks)
5. Verify the fix by testing the interaction

### BEST PRACTICES FOR PROMPTS

1. **Be specific about the component or feature:**

   - ✅ "Test the carousel on the homepage that has 4 items"
   - ❌ "Test the carousel"

2. **Reference existing code patterns:**

   - ✅ "Use the same pattern as homepage.spec.ts with DeptHomePage POM"
   - ❌ "Make a test"

3. **Specify test requirements clearly:**

   - ✅ "Verify each carousel item displays unique content and only one is active at a time"
   - ❌ "Check if it works"

4. **Mention cross-browser concerns:**

   - ✅ "Ensure the test works on Firefox, Safari, and Chromium"
   - ❌ "Make it work everywhere"

5. **Include project conventions:**
   - ✅ "Add proper logging with logInfo(), set timeout to 180000, and dismiss cookies"
   - ❌ "Add some logging"

### COMMON MCP COMMANDS THE AI USES

- `mcp_playwright_browser_navigate` - Navigate to a URL
- `mcp_playwright_browser_snapshot` - Get accessible page structure
- `mcp_playwright_browser_click` - Click elements
- `mcp_playwright_browser_type` - Type into input fields
- `mcp_playwright_browser_take_screenshot` - Capture visual evidence
- `mcp_playwright_browser_fill_form` - Fill multiple form fields
- `mcp_playwright_browser_wait_for` - Wait for text or conditions

### TIPS FOR EFFECTIVE TEST GENERATION

1. **Start with exploration:** Ask the AI to navigate and take screenshots first to understand the page structure
2. **Iterate incrementally:** Generate basic tests first, then refine with additional requirements
3. **Use screenshots for debugging:** If tests fail, ask the AI to screenshot the page at the failure point
4. **Reference project files:** Point the AI to existing tests, POMs, or helpers to maintain consistency
5. **Validate cross-browser:** Ask the AI to consider browser-specific issues (e.g., cookie banners, timing)

### EXAMPLE WORKFLOW

```
Step 1: "Navigate to https://example.com and take a screenshot of the homepage"
Step 2: "Identify all interactive elements in the hero section"
Step 3: "Generate a test that clicks each button and verifies the modal appears"
Step 4: "Update the test to use the CommonPage POM for dismissing cookies"
Step 5: "Run the test on all browsers and fix any failures"
```

### LIMITATIONS

- MCP server requires an active internet connection to access live sites
- Some sites with complex authentication may require manual session handling
- Dynamic content loaded via AJAX may need explicit waits
- Rate limiting may apply when making many requests to the same domain

### TROUBLESHOOTING

**Issue:** AI says "MCP tools not available"
**Solution:** Restart your IDE/editor and ensure `@playwright/mcp` is installed

**Issue:** Browser automation fails with "Target closed"
**Solution:** Check if the site blocks automation or requires specific headers

**Issue:** Generated tests don't follow project patterns
**Solution:** Explicitly reference `.github/copilot-instructions.md` in your prompt

For more details on MCP, see: https://modelcontextprotocol.io/

### SANITY TESTS

Command to run: pnpm sanity

1. The code uses Axios (a popular JS library for making HTTP requests) to crawl through the sitemap sequentially and check that each page returns a 200 response code
2. It reads the URLs from `sitemap.json` (generated by `pnpm sitemap`); if that is empty/missing it fetches fresh from `SITEMAP_URL` in `.env`
3. Results are written to `csv-reports/sanity-report.csv` as a single summary row using the QA columns: `TEST, RESULT, STATUS, COMMENTS`
   - STATUS is auto-computed (Fail if any URL is non-200); every failing URL is listed in COMMENTS
   - Hand-edit STATUS / COMMENTS afterwards for known-acceptable exceptions (e.g. a 404 that also 404s on real prod)
4. To run the test, simply run `pnpm sanity` (set `SITEMAP_URL` in `.env` first)

### FUNCTIONAL TESTS

Command to run: pnpm (browser) e.g. pnpm chrome

1. Please check 'Simple DEPT Test POM @chrome @safari @ff' as an example of a functional test
2. The following Cheat Sheet can be used to become familiar with common Playwright commands

- https://ray.run/blog/mastering-playwright-test-automation-your-comprehensive-cheat-sheet

3. Tests use the Page Object Model methodology
4. Common action and verification methods can be called in the test.spec.ts file (common-page.ts)

### A11Y TESTS

Command to run: pnpm a11y

1. The code uses the AXE library (compact JS Library for a11y) to run a11y checks on each page in the sitemap
2. 4 methods have been developed namely

- completeA11yScanOnPage_HTMLReport : completes a scan on a single page and returns an HTML report with the results
- completeA11yScanOnSitemap_HTMLPageReports : completes a scan on all pages in the sitemap and returns an HTML results report per page scanned
- completeA11yScanOnSitemap_CSVReport : completes a scan on all pages in the sitemap and returns one consolidated CSV report with all results
- completeA11yScanOnPage_ConsoleReport : completes a scan on a single page and returns a report directly in the terminal

### VISUAL REGRESSION

Command to capture baselines (first run): docker exec dept-playwright-tests pnpm visual-(screen-dimension)
Command to run visual check (second run): docker exec dept-playwright-tests pnpm visual-(screen-dimension)

1. The code uses Playwright to capture Baseline images of a site that will be used for future comparisons
2. The first run will capture the baseline images. Subsequent runs will compare against baselines
3. Images will be stored in the folder "tests - baseline-snapshots" (or whatever path you set in the .env file for variable 'SNAPSHOT_DIR')

#### STEPS TO RUN:

STEP 1: CAPTURE BASELINE IMAGES

1. Start the docker containers run the command
   docker compose up -d
   (Build the Image if an error is thrown and retry: docker compose build)

   Why Docker Containers?
   To ensure that there are no OS differences with the snapshots taken using the same docker container for the local screenshot generation as the CI builds

2. Update the .env file SITEMAP_ARRAY with the pages you want to capture i.e. '["url/page1","url/page2"]'

   And capture baseline images with the command:
   docker exec dept-playwright-tests pnpm visual-(screen-dimension)

   Screen dimensions are set in the package.json

   e.g. docker exec dept-playwright-tests pnpm visual-md

STEP 2: PERFORM COMPARISON RUN

3. To do a comparison run, execure the command once again
   docker exec dept-playwright-tests pnpm visual-(screen-dimension)

STEP 3: REPLACE BASELINE

4. IMPORTANT: To replace a baseline image, please run: docker exec dept-playwright-tests pnpm visual-(screen-dimension) --update-snapshots

### LINKS CHECKS

Command to run: pnpm links

1. The code visits each page listed in `mappings/linkCheckUrls.json`, extracts all clickable links, and uses Axios to check each returns a 200 response code
2. Results are written to `csv-reports/links-report.csv` in the QA columns `TEST, RESULT, STATUS, COMMENTS` — one row per page, with STATUS Pass/Fail per page and any broken links listed in COMMENTS
3. `pnpm links-sitemap` does the same across every page in `sitemap.json`, writing `csv-reports/links-sitemap-report.csv`

### COMBINING REPORTS

Command to run: pnpm report

1. Merges `sanity-report.csv`, `links-report.csv` and `links-sitemap-report.csv` (whichever exist) into a single `csv-reports/qa-report.csv`
2. Run it after `pnpm sanity` / `pnpm links` to get one QA sheet ready to paste into the tracker

### PERFORMANCE CHECKS

Command to run: pnpm lh

1. This command launches unlighthouse (https://next.unlighthouse.dev/) to perform a scan of the entire site (set in package.json) and returns a comprehensive and detailed report

### REDIRECTION TESTS

Command to run: pnpm redirections

1. The code reads the JSON file stored in mappings folder
2. Checks that "initial" url redirects to "expected"

Considerations:

1. Update JSON file with the correct format
2. Update the env variable URL_MAPPINGS_FILE to the new path of mapping JSON

### KEEPING UP TO DATE WITH LATEST SKELETON

1. Add the original skeleton repository as a remote with the name upstream - git remote add upstream <URL_OF_SKELETON_REPO>
2. Verify the remote repositories to ensure upstream has been added - git remote -v
3. You should see something like this:

origin <URL_OF_YOUR_FORK> (fetch)
origin <URL_OF_YOUR_FORK> (push)
upstream <URL_OF_SKELETON_REPO> (fetch)
upstream <URL_OF_SKELETON_REPO> (push)

4. Retrieve the latest changes from the original skeleton repository - git fetch upstream
5. Merge or rebase the changes from the upstream branch into your fork’s branch - git merge upstream/main
6. After merging or rebasing, push the changes to your forked repository - git push origin main
7. To keep your fork up to date, repeat Steps 3 to 5 whenever new changes are made in the skeleton repository
