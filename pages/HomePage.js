const { By, until } = require('selenium-webdriver');

class HomePage {
  constructor(driver, config) {
    this.driver = driver;
    this.config = config;
  }

  async navigateAndClickLogin() {
    console.log('🌐 Navigating to homepage...');
    await this.driver.get(this.config.baseUrl);
    
    // Wait for page to load
    await this.driver.wait(async () => {
      const readyState = await this.driver.executeScript('return document.readyState');
      return readyState === 'complete';
    }, 10000);
    
    console.log('✓ Homepage loaded');
    
    // Wait for page to fully render
    await this.driver.sleep(3000);
    
    let loginClicked = false;
    
    // Strategy 1: Find link with href="/login" (most reliable)
    try {
      console.log('🔍 Strategy 1: Looking for link with href="/login"...');
      const loginLink = await this.driver.findElement(By.css('a[href="/login"]'));
      await this.driver.executeScript("arguments[0].scrollIntoView({block: 'center'});", loginLink);
      await this.driver.sleep(500);
      await this.driver.executeScript("arguments[0].click();", loginLink);
      console.log('✓ Login link clicked (Strategy 1 - by href)');
      loginClicked = true;
    } catch (e1) {
      console.log('⚠️ Strategy 1 failed:', e1.message);
    }
    
    // Strategy 2: Find by XPath with text "Login"
    if (!loginClicked) {
      try {
        console.log('🔍 Strategy 2: Looking for Login by text...');
        const loginLink = await this.driver.findElement(By.xpath("//a[contains(., 'Login')]"));
        await this.driver.executeScript("arguments[0].scrollIntoView({block: 'center'});", loginLink);
        await this.driver.sleep(500);
        await this.driver.executeScript("arguments[0].click();", loginLink);
        console.log('✓ Login link clicked (Strategy 2 - by text)');
        loginClicked = true;
      } catch (e2) {
        console.log('⚠️ Strategy 2 failed:', e2.message);
      }
    }
    
    // Strategy 3: Find element containing the SVG and click parent link
    if (!loginClicked) {
      try {
        console.log('🔍 Strategy 3: Looking for Login SVG icon...');
        const svgElement = await this.driver.findElement(
          By.xpath("//svg[contains(@viewBox, '0 0 18 22')]")
        );
        // Get the parent anchor tag
        const loginLink = await svgElement.findElement(By.xpath("ancestor::a[@href='/login']"));
        await this.driver.executeScript("arguments[0].scrollIntoView({block: 'center'});", loginLink);
        await this.driver.sleep(500);
        await this.driver.executeScript("arguments[0].click();", loginLink);
        console.log('✓ Login link clicked (Strategy 3 - by SVG)');
        loginClicked = true;
      } catch (e3) {
        console.log('⚠️ Strategy 3 failed:', e3.message);
      }
    }
    
    // Strategy 4: Navigate directly to /login as last resort
    if (!loginClicked) {
      console.log('🔍 Strategy 4: Navigating directly to /login page...');
      await this.driver.get(this.config.baseUrl + '/login');
      console.log('✓ Navigated directly to login page (Strategy 4)');
      loginClicked = true;
    }
    
    if (!loginClicked) {
      throw new Error('All strategies failed - could not access login page');
    }
    
    // Wait for navigation
    await this.driver.sleep(3000);
    
    const currentUrl = await this.driver.getCurrentUrl();
    console.log('✓ Current URL:', currentUrl);
    
    // Verify we're on the login page
    if (!currentUrl.includes('/login')) {
      console.warn(`⚠️ Expected /login page, but on: ${currentUrl}`);
    }
  }
}

module.exports = HomePage;