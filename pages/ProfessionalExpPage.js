const { By, until } = require('selenium-webdriver');

class ProfessionalExpPage {
  constructor(driver, config) {
    this.driver = driver;
    this.config = config;
  }

  async fillAndSubmit() {
    let currentUrl = await this.driver.getCurrentUrl();
    
    if(currentUrl.includes('register?step=professional-experience')) {
      console.log('✓ Professional Experience page loaded');
      const form = await this.driver.wait(until.elementLocated(By.css('form')), 15000);
      await this.driver.wait(until.elementIsVisible(form), 15000);

      // Open "Years of Experience" dropdown (simulate direct selection on the hidden <select>)
      await this.driver.executeScript(() => {
        const select = document.querySelector('select');
        if (select) {
          select.value = '5';
          select.dispatchEvent(new Event('change', { bubbles: true }));
        }
      });
      console.log('✓ Years of Experience set to 5 years');
      await this.driver.sleep(1000);

      // Fill other Professional Experience fields
      await this.driver.findElement(By.name('number_of_students_recruited_annually')).sendKeys(this.config.professionalExperience.studentsRecruited);
      await this.driver.findElement(By.name('focus_area')).sendKeys(this.config.professionalExperience.focusArea);
      await this.driver.findElement(By.name('success_metrics')).sendKeys(this.config.professionalExperience.successMetrics);

      // Select relevant services
      const servicesLabelsToSelect = this.config.professionalExperience.services;
      for (const label of servicesLabelsToSelect) {
        try {
          const labelElement = await this.driver.wait(until.elementLocated(By.xpath(`//label[contains(text(),'${label}')]`)), 10000);
          const checkboxButton = await labelElement.findElement(By.xpath('preceding-sibling::button[@role="checkbox"]'));
          await checkboxButton.click();
          await this.driver.sleep(300);
        } catch (checkboxErr) { }
      }

      // Click Next
      const profNextButton = await this.driver.wait(until.elementLocated(By.xpath("//button[@type='submit' and contains(text(),'Next')]")), 10000);
      await this.driver.executeScript("arguments[0].scrollIntoView(true);", profNextButton);
      await this.driver.sleep(500);
      await profNextButton.click();
      console.log('✓ Professional Experience submitted');

      await this.driver.sleep(4000);
      currentUrl = await this.driver.getCurrentUrl();
      console.log('After Professional Experience submission, now at:', currentUrl);
    }
    
    return currentUrl;
  }
}

module.exports = ProfessionalExpPage;