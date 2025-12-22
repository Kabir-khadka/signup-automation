const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const path = require('path');
const fs = require('fs');

// Import configuration
const config = require('../config/testData');

// Import page objects
const HomePage = require('../pages/HomePage');
const LoginPage = require('../pages/LoginPage'); // ✅ NOW NEEDED!
const TermsPage = require('../pages/TermsPage');
const SignupPage = require('../pages/SignupPage');
const OTPPage = require('../pages/OTPPage');
const AgencyDetailsPage = require('../pages/AgencyDetailsPage');
const ProfessionalExpPage = require('../pages/ProfessionalExpPage');
const VerificationPage = require('../pages/VerificationPage');

(async function completeSignupAutomation() {
  let driver;
  
  try {
    console.log('🚀 Starting automation...');
    console.log('📋 Configuration loaded');
    console.log('📧 Test Email:', config.userCredentials.email);
    console.log('📱 Test Phone:', config.userCredentials.phoneNumber);
    
    const options = new chrome.Options();
    options.addArguments('--start-maximized');
    options.addArguments('--disable-blink-features=AutomationControlled');
    
    // Use ChromeDriver from drivers folder
    const service = new chrome.ServiceBuilder(config.chromedriverPath);
    
    console.log('🌐 Initializing Chrome browser...');
    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeService(service)
      .setChromeOptions(options)
      .build();
    
    console.log('✅ Browser initialized successfully\n');

    // Phase 0.1: Homepage - Click Login button
    console.log('========== PHASE 0.1: HOMEPAGE NAVIGATION ==========');
    const homePage = new HomePage(driver, config);
    await homePage.navigateAndClickLogin();

    // Phase 0.2: Login Page - Click Sign Up
    console.log('\n========== PHASE 0.2: LOGIN PAGE ==========');
    const loginPage = new LoginPage(driver, config);
    await loginPage.clickSignUp();

    // Phase 0.3: Terms & Conditions - Accept and Continue
    console.log('\n========== PHASE 0.3: TERMS AGREEMENT ==========');
    const termsPage = new TermsPage(driver, config);
    await termsPage.acceptTermsAndContinue();

    // Phase 1: Initial Signup (Setup page)
    console.log('\n========== PHASE 1: SIGNUP FORM ==========');
    const signupPage = new SignupPage(driver, config);
    await signupPage.fillAndSubmit();

    // Phase 2: OTP Verification
    console.log('\n========== PHASE 2: OTP VERIFICATION ==========');
    const otpPage = new OTPPage(driver, config);
    await otpPage.verifyOTP();

    // Phase 3: Agency Details
    console.log('\n========== PHASE 3: AGENCY DETAILS ==========');
    const agencyDetailsPage = new AgencyDetailsPage(driver, config);
    let currentUrl = await agencyDetailsPage.fillAndSubmit();

    // Phase 4: Professional Experience
    console.log('\n========== PHASE 4: PROFESSIONAL EXPERIENCE ==========');
    const professionalExpPage = new ProfessionalExpPage(driver, config);
    currentUrl = await professionalExpPage.fillAndSubmit();

    // Phase 5: Verification
    console.log('\n========== PHASE 5: VERIFICATION ==========');
    const verificationPage = new VerificationPage(driver, config);
    currentUrl = await verificationPage.fillAndSubmit();

    console.log('\n========================================');
    console.log('✅ COMPLETE AUTOMATION SUCCESSFUL!');
    console.log('========================================');
    console.log('Final URL:', currentUrl);

    // Keep open for manual inspection
    console.log('\n⏳ Keeping browser open for 10 seconds...');
    await driver.sleep(10000);

  } catch (error) {
    console.error('\n❌ ====== ERROR OCCURRED ======');
    console.error('Error Name:', error.name);
    console.error('Error Message:', error.message);
    console.error('Full Error:', error);
    console.error('Stack Trace:', error.stack);
    
    if (driver) {
      try {
        const screenshotsDir = path.join(__dirname, '../screenshots');
        if (!fs.existsSync(screenshotsDir)) {
          fs.mkdirSync(screenshotsDir, { recursive: true });
        }
        
        const screenshot = await driver.takeScreenshot();
        const screenshotPath = path.join(screenshotsDir, `error_${Date.now()}.png`);
        fs.writeFileSync(screenshotPath, screenshot, 'base64');
        console.log(`📸 Screenshot saved: ${screenshotPath}`);
        
        const currentUrl = await driver.getCurrentUrl();
        console.log('🔗 Current URL:', currentUrl);
      } catch (screenshotError) {
        console.error('Could not take screenshot:', screenshotError.message);
      }
      
      await driver.sleep(3000);
    }
    
    process.exit(1);
    
  } finally {
    if (driver) {
      console.log('\n🔚 Closing browser...');
      await driver.quit();
      console.log('✅ Browser closed');
    }
  }
})().catch(err => {
  console.error('\n❌ UNHANDLED ERROR IN MAIN FUNCTION:');
  console.error(err);
  process.exit(1);
});