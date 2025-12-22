const { By, until, Key } = require('selenium-webdriver');

class AgencyDetailsPage {
  constructor(driver, config) {
    this.driver = driver;
    this.config = config;
  }

  async fillAndSubmit() {
    let currentUrl = await this.driver.getCurrentUrl();
    
    if(currentUrl.includes('register?step=details')) {
      console.log('✓ Agency Details page loaded');

      await this.driver.wait(until.elementLocated(By.name('agency_name')), 10000);
      await this.driver.findElement(By.name('agency_name')).sendKeys(this.config.agencyDetails.name);
      await this.driver.findElement(By.name('role_in_agency')).sendKeys(this.config.agencyDetails.role);
      await this.driver.findElement(By.name('agency_email')).sendKeys(this.config.agencyDetails.email);
      await this.driver.findElement(By.name('agency_website')).sendKeys(this.config.agencyDetails.website);
      await this.driver.findElement(By.name('agency_address')).sendKeys(this.config.agencyDetails.address);
      console.log('✓ All fields filled');

      // Open dropdown
      const regionButton = await this.driver.findElement(By.css('button[role="combobox"]'));
      await regionButton.click();
      await this.driver.sleep(1000);
      const searchInput = await this.driver.findElement(By.css('input[placeholder="Search..."]'));
      await searchInput.sendKeys('Australia');
      await this.driver.sleep(1000);
      const allElements = await this.driver.findElements(By.xpath("//*[contains(text(), 'Australia')]"));
      for (let i = 0; i < allElements.length; i++) {
        try {
          const text = await allElements[i].getText();
          if (text.trim() === 'Australia') {
            await this.driver.executeScript("arguments[0].click();", allElements[i]);
            break;
          }
        } catch (e) { continue; }
      }
      try {
        await searchInput.sendKeys(Key.ESCAPE);
      } catch (e1) {
        await this.driver.executeScript("document.body.click();");
      }

      // Click Next
      const nextButton = await this.driver.findElement(By.xpath("//button[@type='submit' and contains(text(), 'Next')]"));
      await this.driver.executeScript("arguments[0].scrollIntoView(true);", nextButton);
      await this.driver.sleep(500);
      await nextButton.click();

      // Wait for redirect to next step
      await this.driver.sleep(5000);
      currentUrl = await this.driver.getCurrentUrl();
      console.log('After Agency Details submission, now at:', currentUrl);
    }
    
    return currentUrl;
  }
}

module.exports = AgencyDetailsPage;