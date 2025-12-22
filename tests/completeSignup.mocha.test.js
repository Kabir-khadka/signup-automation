const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const path = require('path');
const fs = require('fs');
const assert = require('assert');

// Import configuration
const config = require('../config/testData');

// Import page objects
const HomePage = require('../pages/HomePage');
const LoginPage = require('../pages/LoginPage');
const TermsPage = require('../pages/TermsPage');
const SignupPage = require('../pages/SignupPage');
const OTPPage = require('../pages/OTPPage');
const AgencyDetailsPage = require('../pages/AgencyDetailsPage');
const ProfessionalExpPage = require('../pages/ProfessionalExpPage');
const VerificationPage = require('../pages/VerificationPage');

describe('Complete Signup Automation Test Suite', function() {
  // Set timeout for the entire test suite (10 minutes)
  this.timeout(600000);
  
  let driver;
  
  before(async function() {
    console.log('🚀 Starting automation setup...');
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
  });

  after(async function() {
    if (driver) {
      console.log('\n🔚 Closing browser...');
      await driver.sleep(3000); // Keep open briefly to see final result
      await driver.quit();
      console.log('✅ Browser closed');
    }
  });

  afterEach(async function() {
    // Take screenshot on failure
    if (this.currentTest.state === 'failed' && driver) {
      try {
        const screenshotsDir = path.join(__dirname, '../screenshots');
        if (!fs.existsSync(screenshotsDir)) {
          fs.mkdirSync(screenshotsDir, { recursive: true });
        }
        
        const screenshot = await driver.takeScreenshot();
        const testName = this.currentTest.title.replace(/[^a-z0-9]/gi, '_');
        const screenshotPath = path.join(screenshotsDir, `${testName}_${Date.now()}.png`);
        fs.writeFileSync(screenshotPath, screenshot, 'base64');
        console.log(`📸 Screenshot saved: ${screenshotPath}`);
        
        const currentUrl = await driver.getCurrentUrl();
        console.log('🔗 Current URL:', currentUrl);
      } catch (screenshotError) {
        console.error('Could not take screenshot:', screenshotError.message);
      }
    }
  });

  describe('Phase 0: Navigation Flow', function() {
    
    it('Phase 0.1: Should navigate to homepage and click Login', async function() {
      console.log('========== PHASE 0.1: HOMEPAGE NAVIGATION ==========');
      const homePage = new HomePage(driver, config);
      await homePage.navigateAndClickLogin();
      
      const currentUrl = await driver.getCurrentUrl();
      assert(currentUrl.includes('/login'), 'Should navigate to login page');
    });

    it('Phase 0.2: Should click Sign Up on Login page', async function() {
      console.log('\n========== PHASE 0.2: LOGIN PAGE ==========');
      const loginPage = new LoginPage(driver, config);
      await loginPage.clickSignUp();
      
      const currentUrl = await driver.getCurrentUrl();
      assert(currentUrl.includes('/register'), 'Should navigate to register page');
    });

    it('Phase 0.3: Should accept Terms and Conditions', async function() {
      console.log('\n========== PHASE 0.3: TERMS AGREEMENT ==========');
      const termsPage = new TermsPage(driver, config);
      await termsPage.acceptTermsAndContinue();
      
      // Verify we moved past the terms page
      const currentUrl = await driver.getCurrentUrl();
      console.log('✓ Current URL after terms:', currentUrl);
    });
  });

  describe('Phase 1: Signup Form Submission', function() {
    
    it('Phase 1: Should fill and submit signup form', async function() {
      console.log('\n========== PHASE 1: SIGNUP FORM ==========');
      const signupPage = new SignupPage(driver, config);
      await signupPage.fillAndSubmit();
      
      const currentUrl = await driver.getCurrentUrl();
      console.log('✓ Current URL after signup:', currentUrl);
    });
  });

  describe('Phase 2: OTP Verification', function() {
    
    it('Phase 2: Should verify OTP', async function() {
      console.log('\n========== PHASE 2: OTP VERIFICATION ==========');
      const otpPage = new OTPPage(driver, config);
      await otpPage.verifyOTP();
      
      const currentUrl = await driver.getCurrentUrl();
      console.log('✓ Current URL after OTP:', currentUrl);
    });
  });

  describe('Phase 3: Agency Details', function() {
    
    it('Phase 3: Should fill and submit agency details', async function() {
      console.log('\n========== PHASE 3: AGENCY DETAILS ==========');
      const agencyDetailsPage = new AgencyDetailsPage(driver, config);
      const currentUrl = await agencyDetailsPage.fillAndSubmit();
      
      console.log('✓ Current URL after agency details:', currentUrl);
    });
  });

  describe('Phase 4: Professional Experience', function() {
    
    it('Phase 4: Should fill and submit professional experience', async function() {
      console.log('\n========== PHASE 4: PROFESSIONAL EXPERIENCE ==========');
      const professionalExpPage = new ProfessionalExpPage(driver, config);
      const currentUrl = await professionalExpPage.fillAndSubmit();
      
      console.log('✓ Current URL after professional experience:', currentUrl);
    });
  });

  describe('Phase 5: Verification', function() {
    
    it('Phase 5: Should complete verification process', async function() {
      console.log('\n========== PHASE 5: VERIFICATION ==========');
      const verificationPage = new VerificationPage(driver, config);
      const currentUrl = await verificationPage.fillAndSubmit();
      
      console.log('\n========================================');
      console.log('✅ COMPLETE AUTOMATION SUCCESSFUL!');
      console.log('========================================');
      console.log('Final URL:', currentUrl);
      
      // Keep browser open briefly to see the result
      await driver.sleep(5000);
    });
  });
});