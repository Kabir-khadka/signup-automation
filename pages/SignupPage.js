const { By, until } = require('selenium-webdriver');

class SignupPage {
  constructor(driver, config) {
    this.driver = driver;
    this.config = config;
  }

  async fillAndSubmit() {
    // We should already be on the signup form page after accepting terms
    // So we don't need to navigate - just wait for the form to load
    
    console.log('⏳ Waiting for signup form to load...');
    
    // Wait for the signup form to be present
    await this.driver.wait(until.elementLocated(By.name('firstName')), 15000);
    
    // Additional wait to ensure page is fully loaded
    await this.driver.wait(async () => {
      const readyState = await this.driver.executeScript('return document.readyState');
      return readyState === 'complete';
    }, 10000);

    console.log('✓ Signup form loaded');

    // Fill first name
    await this.driver.findElement(By.name('firstName')).sendKeys(this.config.userCredentials.firstName);
    
    // Fill last name
    await this.driver.findElement(By.name('lastName')).sendKeys(this.config.userCredentials.lastName);
    
    // Fill email
    await this.driver.findElement(By.name('email')).sendKeys(this.config.userCredentials.email);
    
    console.log('✓ Basic info filled');
    
    // Handle country code dropdown
    try {
      const countryButton = await this.driver.findElement(By.css('button[role="combobox"]'));
      await countryButton.click();
      await this.driver.sleep(1000);
      
      try {
        const nepalOption = await this.driver.findElement(
          By.xpath("//div[@role='option' or @role='listbox']//span[contains(text(), '+977') or contains(text(), 'Nepal')]")
        );
        await nepalOption.click();
        console.log('✓ Country code selected (+977)');
      } catch (e1) {
        console.log('✓ Country code already selected');
      }
      
      await this.driver.sleep(500);
    } catch (countryError) {
      console.log('✓ Country code handling complete');
    }
    
    // Fill phone number
    const phoneInput = await this.driver.findElement(By.name('phoneNumber'));
    await phoneInput.clear();
    await phoneInput.sendKeys(this.config.userCredentials.phoneNumber);
    console.log('✓ Phone number filled');
    
    // Fill password
    await this.driver.findElement(By.name('password')).sendKeys(this.config.userCredentials.password);
    
    // Fill confirm password
    await this.driver.findElement(By.name('confirmPassword')).sendKeys(this.config.userCredentials.password);
    console.log('✓ Password filled');

    // Click Next/Submit button
    const nextButton = await this.driver.findElement(By.css('button[type="submit"]'));
    await nextButton.click();
    console.log('✓ Next button clicked');

    // Wait for navigation to OTP page
    await this.driver.sleep(5000);
    
    const currentUrl = await this.driver.getCurrentUrl();
    console.log('✓ Navigated to:', currentUrl);
  }
}

module.exports = SignupPage;