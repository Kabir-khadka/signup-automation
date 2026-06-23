# TEST PLAN
## Authorized Partner Platform — Complete Signup Automation

---

| Field | Details |
|-------|---------|
| **Project Name** | Authorized Partner Website Testing |
| **Module/Feature** | Complete User Signup Automation |
| **Version** | 1.0 |
| **Date** | 06/23/2026 |
| **Prepared By** | Kabir Khadka |
| **Reviewed By** | Vrit Technologies QA Team |

---

## 1. Introduction

### 1.1 Purpose
This document describes the test plan for automating and testing the complete signup functionality of the Authorized Partner website. The purpose is to ensure the entire registration flow works correctly from initial navigation through final verification without manual intervention.

### 1.2 Project Overview
Authorized Partner is a platform connecting recruitment agents with global education opportunities. The signup process is critical for onboarding new agency partners and requires comprehensive automated testing to ensure reliability and user experience.

---

## 2. Test Objectives

- Automate complete end-to-end signup flow without manual intervention
- Verify each signup phase completes successfully
- Ensure proper form validation across all pages
- Validate navigation flow between signup stages
- Test error handling for invalid inputs
- Verify OTP verification mechanism works correctly
- Validate agency details and professional experience forms
- Ensure final verification completes successfully
- Generate comprehensive test reports

---

## 3. Scope

### 3.1 In Scope
- ✅ Homepage navigation (Login button click)
- ✅ Login page to signup transition
- ✅ Terms & Conditions acceptance
- ✅ Signup form submission (all fields)
- ✅ Email field validation
- ✅ Phone number validation
- ✅ Password validation and confirmation
- ✅ Country code selection (+977)
- ✅ OTP verification process (automated via IMAP)
- ✅ Agency details form completion
- ✅ Professional experience form submission
- ✅ Final verification process & document upload
- ✅ Navigation flow between pages
- ✅ Automated screenshot capture on failures
- ✅ Test execution reporting

### 3.2 Out of Scope
- ❌ Backend API testing
- ❌ Database validation
- ❌ Email delivery testing
- ❌ Performance and load testing
- ❌ Security penetration testing
- ❌ Cross-browser testing (Chrome only for automation)
- ❌ Mobile app testing

---

## 4. Test Strategy

| Attribute | Details |
|-----------|---------|
| **Test Approach** | Automated Testing using Selenium WebDriver |
| **Test Type** | Black Box Testing |
| **Design Pattern** | Page Object Model (POM) |
| **Test Levels** | Functional, Integration, End-to-End, UI, Validation |
| **Test Techniques** | Boundary Value Analysis, Equivalence Partitioning, State Transition, Error Guessing, Positive/Negative Testing |

### 4.1 Automation Framework
- **Language:** JavaScript (Node.js)
- **Test Framework:** Mocha with Mochawesome Reporter
- **Automation Tool:** Selenium WebDriver 4.39.0
- **Driver Management:** Selenium Manager (auto-manages ChromeDriver — no manual setup needed)
- **Design Pattern:** Page Object Model (POM)

---

## 5. Test Environment

| Component | Details |
|-----------|---------|
| **Operating System** | Windows 11 |
| **Browser** | Google Chrome 149.x |
| **Node.js** | v18+ (LTS) |
| **ChromeDriver** | Auto-managed by Selenium Manager |
| **Selenium WebDriver** | 4.39.0 |
| **Mocha** | 11.7.5 |

### 5.1 Test URLs
- **Production:** `https://authorized-partner.vercel.app`
- **Signup Flow:** `https://authorized-partner.vercel.app/register`

### 5.2 Test Data
| Field | Strategy | Sample |
|-------|----------|--------|
| Email | Dynamic (plus-addressing) | `vritqa.test2025+[timestamp]@gmail.com` |
| Phone | Randomly generated | `98XXXXXXXX` |
| Country Code | Fixed | +977 (Nepal) |
| Password | Static | `SecurePass123!` |
| Document | Static asset | `assets/shared_image.jpg` |

---

## 6. Test Deliverables

### Before Testing
- Test Plan (this document)
- Test Scenarios & Test Cases (Excel)
- POM classes for each signup page

### During Testing
- Execution console logs
- Bug reports with screenshots (stored in `bug-reports/`)

### After Testing
- Mochawesome HTML Report (`test-reports/index.html`)
- PDF Test Report (`test-reports/TEST_REPORT.pdf`)
- Bug Report (`bug-reports/Bug_Reports_Signup_Authorized_Partner.xlsx`)
- GitHub Repository with full source code
- Demo Video (`video/Demo_Video.mp4`)

---

## 7. Entry Criteria

- ✅ Signup flow is accessible on production URL
- ✅ All signup pages are functional
- ✅ Test environment is stable and test data is prepared
- ✅ Automation framework and Page Object classes are created
- ✅ Selenium Manager is configured (no manual driver installation needed)

---

## 8. Exit Criteria

- ✅ All planned test scenarios executed with 100% automation coverage
- ✅ No Critical or High severity bugs are blocking the flow
- ✅ HTML test report, Demo video, and Documentation are complete
- ✅ Code is pushed to the public GitHub repository

---

## 9. Test Schedule

| Phase | Duration | Target Date |
|-------|----------|-------------|
| Test Planning & Scenario Creation | 2 days | Day 1–2 |
| Framework Setup & Page Object Creation | 3 days | Day 2–4 |
| Test Case Design | 1 day | Day 4 |
| Automation Script Development | 2 days | Day 4–5 |
| Test Execution, Debugging & Bug Reporting | 1 day | Day 5 |
| Report Generation & Demo Recording | 1 day | Day 5 |
| Documentation & Submission | 1 day | Day 5 |
| **TOTAL** | **~5 days** | **Within Deadline** |

---

## 10. Resource Allocation

| Role | Name | Responsibility |
|------|------|----------------|
| QA Intern | Kabir Khadka | Automation Development & Execution |
| QA Reviewer | Vrit Technologies QA Team | Review & Guidance |
| Stakeholder | Vrit HR Team | Evaluation & Assessment |

---

## 11. Risks & Mitigation

| Risk | Mitigation Plan |
|------|-----------------|
| Website UI changes | Implement flexible locator strategies (multiple fallback selectors) |
| OTP verification delays | Add sufficient wait times; automated IMAP retrieval with 12 retry attempts |
| Network connectivity issues | Test in a stable network environment |
| ChromeDriver version mismatch | Selenium Manager auto-detects and downloads the correct version |
| Flaky tests due to timing | Use explicit waits; avoid hard-coded `sleep` calls where possible |

---

## 12. Assumptions

- Website will remain accessible and the signup flow will not have major UI changes.
- Gmail plus-addressing will work for unique email generation on each run.
- No rate limiting on signup attempts will be enforced during testing.

---

## 13. Dependencies

- Availability and stability of the production website.
- Internet connectivity for automated OTP retrieval via IMAP (Gmail).

---

## 14. Defect Management

### 14.1 Severity Levels
| Severity | Description |
|----------|-------------|
| **Critical** | System crash / complete feature failure |
| **High** | Major function is broken, blocks workflow |
| **Medium** | Validation or partial functionality issue |
| **Low** | UI / Cosmetic issue |

### 14.2 Defect Reporting
- **Tool:** Excel Spreadsheet (`bug-reports/Bug_Reports_Signup_Authorized_Partner.xlsx`)
- **Format:** Structured template with steps to reproduce, expected vs. actual results, screenshots, and severity.

---

## 15. Test Metrics

| Metric | Target |
|--------|--------|
| Total Test Scenarios | 15+ |
| Total Test Cases | 30+ |
| Automation Coverage | 100% |
| Pass Rate Target | 100% |
| Avg. Execution Time | ~3–5 minutes per full run |

---

## 16. Project Folder Structure

```
signup-automation/
├── pages/              # Page Object Model classes
│   ├── HomePage.js
│   ├── LoginPage.js
│   ├── TermsPage.js
│   ├── SignupPage.js
│   ├── OTPPage.js
│   ├── AgencyDetailsPage.js
│   ├── ProfessionalExpPage.js
│   └── VerificationPage.js
├── tests/              # Automation test scripts
│   ├── completeSignup.test.js
│   └── completeSignup.mocha.test.js
├── config/             # Test data & configuration
│   └── testData.js
├── utils/              # Helper utilities (OTP retrieval)
│   └── emailHelper.js
├── assets/             # Test data files (document upload)
├── test-plans/         # This document & test cases/scenarios
├── test-reports/       # HTML & PDF test execution reports
├── bug-reports/        # Bug report spreadsheet & failure screenshots
├── video/              # Demo video of automation run
└── package.json
```

---

## 17. Approvals

| Role | Name | Date |
|------|------|------|
| Prepared By | Kabir Khadka (QA Intern Candidate) | 06/23/2026 |
| Reviewed By | Vrit Technologies QA Team | — |

---

*This test plan is subject to change based on project requirements and feedback from the reviewing team.*
