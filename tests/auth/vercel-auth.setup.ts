import { test as setup } from '@playwright/test';

setup('authenticate to Vercel staging', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  
  try {
    // Navigate to the protected URL - this will redirect to Okta login
    await page.goto('https://uki-stripe-yste-git-staging-dties-projects.vercel.app/', {
      waitUntil: 'domcontentloaded'
    });
    
    // Check if we're redirected to Okta login
    const currentUrl = page.url();
    console.log(`Current URL: ${currentUrl}`);
    
    // If we're at the login page, enter credentials
    if (currentUrl.includes('login.deptagency.com') || currentUrl.includes('okta')) {
      // Fill in username
      const usernameField = page.locator('input[name="username"]');
      await usernameField.waitFor({ state: 'visible', timeout: 10000 });
      await usernameField.fill(process.env.OKTA_USERNAME || '');
      
      // Click Next button
      const nextButton = page.locator('button:has-text("Next")');
      await nextButton.click();
      
      // Wait for password field
      const passwordField = page.locator('input[name="password"]');
      await passwordField.waitFor({ state: 'visible', timeout: 10000 });
      await passwordField.fill(process.env.OKTA_PASSWORD || '');
      
      // Click Sign In button
      const signInButton = page.locator('button:has-text("Sign In")');
      await signInButton.click();
      
      // Wait for navigation to the staging site
      await page.waitForURL('**/uki-stripe-yste-git-staging-dties-projects.vercel.app/**', {
        timeout: 30000
      });
      
      console.log(`✅ Successfully authenticated and redirected to: ${page.url()}`);
    } else {
      console.log(`✅ Already authenticated or at target URL: ${currentUrl}`);
    }
    
    // Save the authenticated state
    await context.storageState({ path: 'auth/vercel-auth.json' });
    console.log('✅ Authentication state saved to auth/vercel-auth.json');
  } catch (error) {
    console.error('❌ Authentication failed:', error);
    throw error;
  } finally {
    await context.close();
  }
});
