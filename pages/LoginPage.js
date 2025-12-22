const { By, until } = require('selenium-webdriver');

class LoginPage {
  constructor(driver, config) {
    this.driver = driver;
    this.config = config;
  }

  async clickSignUp() {
    console.log('⏳ Waiting for Login page to load...');
    
    // Wait for page to load completely
    await this.driver.wait(async () => {
      const readyState = await this.driver.executeScript('return document.readyState');
      return readyState === 'complete';
    }, 10000);
    
    // Wait for the "Log in to Authorized Partner" heading
    await this.driver.wait(
      until.elementLocated(By.xpath("//h1[contains(text(), 'Log in')] | //h2[contains(text(), 'Log in')]")),
      10000
    );
    
    console.log('✓ Login page loaded');
    
    await this.driver.sleep(2000);
    
    // Find and click "Sign Up" link at the bottom
    console.log('⏳ Looking for Sign Up link...');
    
    try {
      // The Sign Up link is part of the text "Don't Have An Account? Sign Up"
      const signUpLink = await this.driver.wait(
        until.elementLocated(
          By.xpath("//a[contains(text(), 'Sign Up')]")
        ),
        10000
      );
      
      // Scroll to the Sign Up link
      await this.driver.executeScript("arguments[0].scrollIntoView({block: 'center'});", signUpLink);
      await this.driver.sleep(500);
      
      // Try to click
      try {
        await signUpLink.click();
        console.log('✓ Sign Up link clicked');
      } catch (clickError) {
        // Fallback to JavaScript click
        await this.driver.executeScript("arguments[0].click();", signUpLink);
        console.log('✓ Sign Up link clicked (via JS)');
      }
      
    } catch (e) {
      console.error('❌ Could not find Sign Up link:', e.message);
      throw new Error('Could not find Sign Up link on Login page');
    }
    
    // Wait for navigation to register/terms page
    await this.driver.sleep(3000);
    
    const currentUrl = await this.driver.getCurrentUrl();
    console.log('✓ Navigated to:', currentUrl);
    
    // Verify we're on the register page
    if (!currentUrl.includes('/register')) {
      console.warn(`⚠️ Expected /register page, but on: ${currentUrl}`);
    }
  }
}

module.exports = LoginPage;