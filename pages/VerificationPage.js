const { By, until, Key } = require('selenium-webdriver');
const fs = require('fs');

class VerificationPage {
  constructor(driver, config) {
    this.driver = driver;
    this.config = config;
  }

  async fillAndSubmit() {
    let currentUrl = await this.driver.getCurrentUrl();
    
    if (currentUrl.includes('register?step=verification')) {
      console.log('✓ Verification and Preferences page loaded');
      await this.driver.wait(until.elementLocated(By.css('form')), 12000);

      // Business Registration Number
      console.log('📝 Filling business registration number...');
      await this.driver.findElement(By.name('business_registration_number'))
        .sendKeys(this.config.verificationDetails.businessRegistration);
      console.log('✓ Business Registration Number filled');

      // Preferred Countries dropdown
      console.log('🌍 Selecting preferred country...');
      const countryButton = await this.driver.wait(
        until.elementLocated(By.css('button[role="combobox"]')), 
        10000
      );
      await countryButton.click();
      await this.driver.sleep(1000);
      
      const countrySearch = await this.driver.findElement(By.css('input[placeholder="Search..."]'));
      await countrySearch.sendKeys('Canada');
      await this.driver.sleep(1000);
      
      const countryResults = await this.driver.findElements(By.xpath("//*[contains(text(), 'Canada')]"));
      for (let i = 0; i < countryResults.length; i++) {
        try {
          const labelText = await countryResults[i].getText();
          if (labelText.trim() === 'Canada') {
            await this.driver.executeScript("arguments[0].click();", countryResults[i]);
            console.log('✓ Country selected: Canada');
            break;
          }
        } catch (_) {}
      }
      
      try { 
        await countrySearch.sendKeys(Key.ESCAPE); 
      } catch { 
        await this.driver.executeScript("document.body.click();"); 
      }

      // Institution Types: Select Universities, Colleges
      console.log('🏫 Selecting institution types...');
      const instTypes = ['Universities', 'Colleges'];
      for (let label of instTypes) {
        try {
          const labelElement = await this.driver.wait(
            until.elementLocated(By.xpath(`//label[contains(text(),'${label}')]`)), 
            7000
          );
          const checkboxBtn = await labelElement.findElement(
            By.xpath('preceding-sibling::button[@role="checkbox"]')
          );
          await checkboxBtn.click();
          console.log(`✓ Selected: ${label}`);
          await this.driver.sleep(200);
        } catch (_) {
          console.log(`⚠️  Could not select: ${label}`);
        }
      }

      // Certification Details (optional)
      console.log('📜 Filling certification details...');
      await this.driver.findElement(By.name('certification_details'))
        .sendKeys(this.config.verificationDetails.certificationDetails);
      console.log('✓ Certification details filled');

      // Upload Business Document
      console.log('📎 Uploading business document...');
      const filePath = this.config.verificationDetails.documentPath;
      
      // Verify file exists
      if (!fs.existsSync(filePath)) {
        throw new Error(
          `Document file not found: ${filePath}\n` +
          'Please add a sample image (JPG/PNG) to the test-data folder:\n' +
          '  mkdir test-data\n' +
          '  # Then add sample-document.jpg to this folder'
        );
      }
      
      const fileInput = await this.driver.findElement(By.css('input[type="file"]'));
      await fileInput.sendKeys(filePath);
      console.log(`✓ Business document uploaded: ${filePath.split(/[\\/]/).pop()}`);

      // Wait for file to be processed
      await this.driver.sleep(2000);

      // Click Submit
      console.log('📤 Submitting verification form...');
      const submitBtn = await this.driver.findElement(
        By.xpath("//button[@type='submit' and contains(text(), 'Submit')]")
      );
      await this.driver.executeScript("arguments[0].scrollIntoView(true);", submitBtn);
      await this.driver.sleep(400);
      await submitBtn.click();
      console.log('✓ Verification form submitted');
      
      // Wait for processing
      await this.driver.sleep(4000);
      
      let finalUrl = await this.driver.getCurrentUrl();
      console.log(`✅ Registration complete! Current URL: ${finalUrl}`);
      currentUrl = finalUrl;

    } else if(currentUrl.includes('dashboard') || currentUrl.includes('home')) {
      console.log('✔ Registration already complete – at dashboard!');
    } else {
      console.log('⚠️ Unexpected registration step. Current URL:', currentUrl);
    }
    
    return currentUrl;
  }
}

module.exports = VerificationPage;