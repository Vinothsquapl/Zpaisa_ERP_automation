const {test, expect} = require ("@playwright/test");
const { login } = require('../src/utilities.spec');

test.beforeEach(async ({ page }) => {

    test.setTimeout(120000);
    await login(page);
    console.log('Executing common setup for all tests.');

  });

test('Login Test', async ({ page }) => {

   
    let stocks = await page.locator("//span[normalize-space()='Stocks']");
    await stocks.click();


  });