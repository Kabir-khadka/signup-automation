
🤖 Vrit Technologies QA Automation Task
📋 Overview

## 📦 Prerequisites

### Required Software
- **Node.js**: Version 14 or higher ([Download](https://nodejs.org/))
- **Google Chrome**: Version 143+ (Matches the pre-configured driver)

> 💡 **Note on Credentials:** This project comes **pre-configured** with a dedicated test Gmail account (`vritqa.test2025@gmail.com`). You do NOT need to set up an App Password or modify the config file to run the tests.


This project automates the complete signup flow for the Authorized Partner platform using Selenium WebDriver. It handles all 5 registration phases, including automated OTP retrieval from Gmail.

🚀 Quick Start (Run Immediately)
1. Install Dependencies
npm install


2. Run the Test
npm test

3. ✅ What You Should See
```
🚀 Starting automation...
📋 Configuration loaded
📧 Test Email: vritqa.test2025+1234567890.abc123@gmail.com
📱 Test Phone: 9812345678
🌐 Initializing Chrome browser...
✅ Browser initialized successfully

========== PHASE 1: SIGNUP ==========
✓ Page loaded
✓ Basic info filled
✓ Phone number filled
✓ Password filled
✓ Next button clicked

========== PHASE 2: OTP VERIFICATION ==========
⏳ Waiting for OTP page to load...
✓ OTP page loaded successfully
📧 Waiting for OTP email to arrive (this may take 10-15 seconds)...
🔄 Starting OTP retrieval (max 12 attempts, 5s interval)...
   Attempt 1/12...
   Checking INBOX...
   Found 1 unread email(s) in INBOX
✅ OTP retrieved successfully: 123456
⌨️  Entering OTP...
✓ OTP entered successfully
📤 Submitting OTP verification...
✅ OTP verified! Redirected to agency details

========== PHASE 3: AGENCY DETAILS ==========
✓ Agency Details page loaded
✓ All fields filled
⏳ Selecting Region of Operation...
✓ Nepal clicked
✓ Region of Operation selected

========== PHASE 4: PROFESSIONAL EXPERIENCE ==========
✓ Professional Experience page loaded
✓ Years of Experience set to 5 years
✓ Professional Experience submitted

========== PHASE 5: VERIFICATION ==========
✓ Verification page loaded
✓ Business Registration Number filled
✓ Certification Details filled
✓ Document uploaded
✓ Submit button clicked

========================================
✅ COMPLETE AUTOMATION SUCCESSFUL!
========================================

🔚 Closing browser...
✅ Browser closed
```

✨ Key Features
✅ Zero-Configuration: Pre-loaded with dedicated test credentials—no setup required.

✅ Dynamic Data: Generates unique emails (via Gmail sub-addressing) and phone numbers for every run.

✅ OTP Automation: Real-time IMAP integration to fetch and verify registration codes.

✅ Resilience: Automatic screenshots on failure and detailed JSON reporting.

🎯 Test Coverage
Initial Signup: Personal info & dynamic credential generation.

OTP Verification: Automated email login and code extraction.

Agency Details: Company profile and location data.

Professional Experience: Industry experience and services.

Verification: Document upload and final submission.

📁 Project Structure
config/testData.js: Centralized test data and pre-loaded credentials.

pages/: Page Object Model (POM) implementation for each signup phase.

utils/emailHelper.js: IMAP logic for automated OTP retrieval.

assets/: Contains shared_image.jpg used for the document upload phase.

screenshots/: Visual logs automatically captured if a step fails.

🔧 Configuration
If you wish to modify the execution behavior, edit config/testData.js:

Headless Mode: Toggle browserConfig.headless to true for background execution.

Timeouts: Adjust timeouts.otpRetry if your network latency is high.

📊 Test Results
After execution, check the following:

Console: Structured step-by-step progress logs.

test-results/: JSON reports containing timestamps, duration, and final status.

screenshots/: Created automatically if the test encounters an error.

🐛 Troubleshooting
ChromeDriver Error: Ensure your Google Chrome is up to date. The project uses chromedriver (auto-managed).

IMAP/OTP Error: If the script fails to connect to Gmail, it may be due to a one-time Google security block on a new IP. Please notify the author to "Allow" the connection if this occurs.