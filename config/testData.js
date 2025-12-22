const fs = require('fs');
const path = require('path');
const os = require('os');

// Determine ChromeDriver based on OS
function getChromedriverPath() {
  const platform = os.platform();
  const baseDir = path.join(__dirname, '..', 'drivers');
  
  if (platform === 'win32') {
    return path.join(baseDir, 'chromedriver.exe');
  } else if (platform === 'darwin') {
    return path.join(baseDir, 'chromedriver-mac');
  } else {
    return path.join(baseDir, 'chromedriver-linux');
  }
}


//Using Gmail + Trick method for unlimited use of OTPs
const BASE_EMAIL = 'vritqa.test2025@gmail.com';

//Generate random email using trick for each test run
function generateRandomEmail() {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2,8);
  const [localPart, domain] = BASE_EMAIL.split('@');
  return `${localPart}+${timestamp}.${randomString}@${domain}`;
}

//Generating random phone number by Nepal format 
function generateRandomPhone() {
  const randomDigits = Math.floor(Math.random() * 90000000) + 10000000;
  return `98${randomDigits}`.substring(0,10);
}

// Load secrets automatically from the json file
const secrets = JSON.parse(fs.readFileSync(path.join(__dirname, 'credentials.json'), 'utf8'));

module.exports = {

   // Automatically detect OS and use correct ChromeDriver
  chromedriverPath: getChromedriverPath(),

  
  baseUrl: 'https://authorized-partner.vercel.app',
  

  //Dynamic user credentials - regenerated each test run
  userCredentials: {
    firstName: 'QA',
    lastName: 'Tester',
    email: generateRandomEmail(),
    phoneNumber: generateRandomPhone(),
    password: 'VritQA@2025!Secure'
  },
  
//Email configuration for OTP retrieval
// Yu have to use teh actual Gmail credentials here
  emailConfig: {
    imap: {
      user: BASE_EMAIL,
      password: secrets.GMAIL_PASS,
      host: 'imap.gmail.com',
      port: 993,
      tls: true,
      authTimeout: 3000,
      tlsOptions: {
        rejectUnauthorized: false
      }
    }
  },
  
  //Agency Details
  agencyDetails: {
    name: `Tech Solutions Agency ${Date.now()}`,
    role: 'Director',
    email: `contact.${Date.now()}@techsolutions.com`,
    website: 'techsolutions.com',
    address: '123 Main Street, Kathmandu'
  },
  
  //Professional Experience Details
  professionalExperience: {
    yearsOfExperience: '5',
    studentsRecruited: '250',
    focusArea: 'Undergraduate admissions to Canada.',
    successMetrics: '90',
    services: ['Career Counseling', 'Visa Processing']
  },
  
  //Verification Details
  verificationDetails: {
    businessRegistration: `REG${Date.now()}`,
    certificationDetails: 'ICEF Certified Education Agent',
    documentPath: path.join(__dirname, '..', 'assets', 'shared_image.jpg')
  },

  //Browser settings
  browserConfig: {
    headless: false, //Set it to true for for CI/CD pipelines
    windowSize: { width: 1920, height: 1080 }
  },

  //Timeout settings
  timeouts: {
    pageLoad: 30000,
    elementWait: 15000,
    otpRetry: 12,
    otpRetryInterval: 5000
  }
};