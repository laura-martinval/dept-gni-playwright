import { test } from '@playwright/test';

test('Explore search functionality on gasnetworks.ie', async ({ page }) => {
  // Navigate to the website
  console.log('📍 Navigating to https://www.gasnetworks.ie/');
  await page.goto('https://www.gasnetworks.ie/', { waitUntil: 'networkidle' });

  // Wait a moment for the page to fully load
  await page.waitForTimeout(1000);

  // Take a screenshot of the initial page
  await page.screenshot({ path: 'artifacts/search-initial-page.png', fullPage: true });
  console.log('📸 Screenshot taken: search-initial-page.png');

  // Try to find the search toggle button
  const searchButton = page.locator('button.search-toggle--desktop');
  const isVisible = await searchButton.isVisible();
  console.log(`🔍 Search icon visible: ${isVisible}`);

  if (isVisible) {
    const isClickable = await searchButton.isEnabled();
    console.log(`✅ Search icon clickable: ${isClickable}`);

    // Click on the search icon
    console.log('🖱️ Clicking search icon...');
    await searchButton.click();

    // Wait for the modal to appear
    await page.waitForTimeout(500);

    // Check for the search modal
    const searchModal = page.locator('#search-modal');
    const modalVisible = await searchModal.isVisible();
    console.log(`🔲 Search modal visible: ${modalVisible}`);

    if (modalVisible) {
      // Get modal classes
      const modalClasses = await searchModal.getAttribute('class');
      console.log(`📋 Search modal classes: ${modalClasses}`);

      // Check for close button
      const closeButton = page.locator('.close-btn');
      const closeButtonVisible = await closeButton.isVisible();
      console.log(`❌ Close button visible: ${closeButtonVisible}`);

      if (closeButtonVisible) {
        const closeButtonClickable = await closeButton.isEnabled();
        console.log(`✅ Close button clickable: ${closeButtonClickable}`);
      }

      // Check for search input
      const searchInput = page.locator('#edit-search');
      const inputVisible = await searchInput.isVisible();
      console.log(`📝 Search input visible: ${inputVisible}`);

      if (inputVisible) {
        const inputType = await searchInput.getAttribute('type');
        const inputPlaceholder = await searchInput.getAttribute('placeholder');
        console.log(`📝 Search input type: ${inputType}`);
        console.log(`📝 Search input placeholder: ${inputPlaceholder}`);
      }

      // Take a screenshot of the search modal
      await page.screenshot({ path: 'artifacts/search-modal-open.png', fullPage: true });
      console.log('📸 Screenshot taken: search-modal-open.png');

      // Get all elements within the modal to understand its structure
      const modalContent = await searchModal.innerHTML();
      console.log('🔍 Modal structure preview (first 500 chars):');
      console.log(modalContent.substring(0, 500));

      // Try to take a focused screenshot of just the modal if possible
      const modalBox = await searchModal.boundingBox();
      if (modalBox) {
        console.log(`📐 Modal dimensions: ${modalBox.width}x${modalBox.height}, Position: (${modalBox.x}, ${modalBox.y})`);
      }
    } else {
      console.log('⚠️ Search modal did not appear');
      // Let's check if there are any visible elements with "search" in their class or id
      const allElements = await page.locator('[class*="search"], [id*="search"]').all();
      console.log(`Found ${allElements.length} elements with "search" in class or id`);
    }
  } else {
    console.log('⚠️ Search icon not found or not visible');
    // Let's check what buttons are on the page
    const allButtons = await page.locator('button').all();
    console.log(`Found ${allButtons.length} buttons on the page`);

    // Check for any elements with "search" in their selectors
    const searchElements = await page.locator('[class*="search"], [id*="search"]').all();
    console.log(`Found ${searchElements.length} elements with "search" in their selector`);
  }
});
