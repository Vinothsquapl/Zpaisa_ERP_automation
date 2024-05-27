const {test, expect} = require ("@playwright/test");
const { login } = require('../src/utilities.spec');

test.beforeEach(async ({ page }) => {

    test.setTimeout(120000);
    await login(page);

  });

test('stockdetails', async ({ page }) => {

    // add stock details
  let stocks = await page.locator("//span[normalize-space()='Stocks']");
  await stocks.click();

  const stockItems = ['SAARTHI Engine Oil 10 L', 'Locking Washer', 'RUBBER BOOT', 'BOOT RUBBER','THRUST BEARING 51207' ]

  

  });
