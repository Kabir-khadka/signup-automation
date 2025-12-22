const { By, until } = require('selenium-webdriver');
const { fetchOtpFromEmail } = require('../utils/emailHelper');

class OTPPage {
  constructor(driver, config) {
    this.driver = driver;
    this.config = config;
  }

  async verifyOTP() {
    console.log('⏳ Waiting for OTP page to load...');
    
    await this.driver.wait(
      until.elementLocated(By.css('input[data-input-otp="true"]')),
      this.config.timeouts.elementWait
    );
    
    console.log('✓ OTP page loaded successfully');
    const otpInput = await this.driver.findElement(By.css('input[data-input-otp="true"]'));

    // Wait for email to arrive
    console.log('📧 Waiting for OTP email to arrive (this may take 10-15 seconds)...');
    await this.driver.sleep(10000);
    
    let otpCode = null;
    const maxRetries = this.config.timeouts.otpRetry;
    const retryInterval = this.config.timeouts.otpRetryInterval;
    
    console.log(`🔄 Starting OTP retrieval (max ${maxRetries} attempts, ${retryInterval/1000}s interval)...`);
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      console.log(`   Attempt ${attempt}/${maxRetries}...`);
      
      otpCode = await fetchOtpFromEmail(this.config.emailConfig);
      
      if (otpCode) {
        console.log(`✅ OTP retrieved successfully: ${otpCode}`);
        break;
      }
      
      if (attempt < maxRetries) {
        console.log(`   No OTP yet, waiting ${retryInterval/1000}s before retry...`);
        await new Promise(resolve => setTimeout(resolve, retryInterval));
      }
    }
    
    if (!otpCode) {
      throw new Error(
        `OTP not found after ${maxRetries} attempts. ` +
        'Please check:\n' +
        '  1. Email credentials in config/testData.js\n' +
        '  2. Email from no-reply@theauthorizedpartner.com is not in spam\n' +
        '  3. Gmail App Password is correct\n' +
        '  4. Internet connection is stable'
      );
    }

    // Enter OTP
    console.log('⌨️  Entering OTP...');
    await otpInput.click();
    await otpInput.clear();
    await otpInput.sendKeys(otpCode);
    console.log('✓ OTP entered successfully');

    // Wait a moment before submitting
    await this.driver.sleep(2000);
    
    // Submit OTP
    console.log('📤 Submitting OTP verification...');
    const submitBtn = await this.driver.findElement(By.css('button[type="submit"]'));
    await submitBtn.click();
    console.log('✓ Verify button clicked');

    // Wait for automatic redirect to details page
    console.log('⏳ Waiting for redirect...');
    await this.driver.wait(until.urlContains('details'), 20000);
    
    const finalUrl = await this.driver.getCurrentUrl();
    console.log(`✅ OTP verified! Redirected to: ${finalUrl}`);
    
    // Short pause to ensure page is stable
    await this.driver.sleep(3000);
  }
}

module.exports = OTPPage;