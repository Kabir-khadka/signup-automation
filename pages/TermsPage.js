const { By, until } = require('selenium-webdriver');

class TermsPage {
  constructor(driver, config) {
    this.driver = driver;
    this.config = config;
  }

async acceptTermsAndContinue() {
    console.log('⏳ Waiting for Terms & Conditions page to load...');
    
    // 1. Wait for the checkbox itself to be present
    const checkbox = await this.driver.wait(
        until.elementLocated(By.id('remember')), 
        10000
    );
    
    console.log('✓ Terms page loaded');
    await this.driver.sleep(1000);

    // 2. Check the state using 'aria-checked' since it's a custom button-checkbox
    const isChecked = await checkbox.getAttribute('aria-checked');
    
    if (isChecked !== 'true') {
        console.log('⏳ Clicking Terms checkbox...');
        // Using JavaScript click is safer for custom UI components like this
        await this.driver.executeScript("arguments[0].click();", checkbox);
        console.log('✓ Terms checkbox checked');
    } else {
        console.log('✓ Terms checkbox was already checked');
    }

    // 3. Find and click the Continue button
    console.log('⏳ Looking for Continue button...');
    try {
        // Updated XPath to be more specific to the "Continue" button
        const continueButton = await this.driver.wait(
            until.elementEnabled(this.driver.findElement(By.xpath("//button[contains(., 'Continue')]"))),
            5000
        );

        await this.driver.executeScript("arguments[0].scrollIntoView({block: 'center'});", continueButton);
        await this.driver.sleep(500);
        await continueButton.click();
        
        console.log('✓ Continue button clicked');
    } catch (e) {
        // Fallback: If standard click fails, use JS click
        const btn = await this.driver.findElement(By.xpath("//button[contains(., 'Continue')]"));
        await this.driver.executeScript("arguments[0].click();", btn);
        console.log('✓ Continue button clicked (via JS)');
    }

    await this.driver.sleep(2000);
}
}

module.exports = TermsPage;