# 🚀 Quick Start Guide

Get the automation running in 5 minutes!

## ⚡ Fast Setup

### 1. Install Node.js
Download and install from: https://nodejs.org/ (LTS version recommended)

### 2. Install Dependencies
```bash
cd vrit-qa-automation
npm install
```
```

### 5. Run the Test! 🎉
```bash
npm test
```

## ✅ Expected Output

```

🚀 Initializing Chrome WebDriver...
✓ WebDriver initialized successfully

📋 Test Configuration:
   Base URL: https://authorized-partner.vercel.app
   Test Email: vritqa.test.1234567890.abc123@gmail.com
   ...

┌─────────────────────────────────────────────────────┐
│ PHASE 1: INITIAL SIGNUP                             │
└─────────────────────────────────────────────────────┘
🌐 Navigating to signup page...
✓ Page loaded successfully
✓ Basic info filled (Email: vritqa.test....)
...
✅ Phase 1 Complete

[... continues through all 5 phases ...]

╔════════════════════════════════════════════════════════╗
║          ✅ AUTOMATION SUCCESSFUL! ✅                  ║
╚════════════════════════════════════════════════════════╝

📊 Test Summary:
   Total Duration: 45.23s
   Status: PASSED ✓
```

## 🐛 Common First-Time Issues

### "OTP not found"
**Fix**: Double-check Gmail credentials in `config/testData.js`
- Make sure it's the **App Password**, not your regular Gmail password
- Check if the email arrived in your Gmail inbox

### "File not found"
**Fix**: Add a sample image to `test-data/sample-document.jpg`
```bash
mkdir test-data
cp /path/to/any/image.jpg test-data/sample-document.jpg
```

### "ChromeDriver version mismatch"
**Fix**: Update ChromeDriver
```bash
npm install chromedriver@latest --save
```

### "Module not found"
**Fix**: Reinstall dependencies
```bash
rm -rf node_modules
npm install
```

## 📁 What Gets Created

After running, you'll see:
```
vrit-qa-automation/
├── screenshots/          # Error screenshots (if any)
├── test-results/         # JSON test reports
└── test-data/           # Your test documents
```

## 🎯 Next Steps

1. ✅ Verify test passed and reached dashboard
2. 📄 Check `test-results/` for JSON report
3. 🔍 Review console output for any warnings
4. 📸 If errors occurred, check `screenshots/` folder

## 💡 Pro Tips

- **First run takes longer**: OTP email may take 15-30 seconds
- **Keep Chrome visible**: Set `headless: false` to watch the automation
- **Clean slate every time**: Each run creates a brand new account
- **Save results**: Test reports are timestamped for comparison

## 🆘 Need Help?

1. Check `screenshots/` for visual debugging
2. Review `test-results/error-log-*.json` for details
3. Ensure Chrome browser is up to date
4. Verify internet connection is stable

---

**Ready to submit?**
1. Push code to GitHub
2. Make repo public or set to "Anyone with link"
3. Submit the GitHub link via the task form

Good luck! 🍀