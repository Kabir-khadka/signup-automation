const { Builder } = require('selenium-webdriver');

(async function() {
  console.log('Starting scratch...');
  try {
    let driver = await new Builder().forBrowser('chrome').build();
    console.log('Driver created!');
    await driver.quit();
    console.log('Done.');
  } catch (err) {
    console.error('Error:', err);
  }
})();
