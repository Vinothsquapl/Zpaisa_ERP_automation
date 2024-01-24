const { test, expect } = require("@playwright/test");
const {login} = require("../src/utilities.spec");

test("generateBill", async ({ page }) => {

    //login
    test.setTimeout(120000);
    await login(page);

    //navaigate to stocks
    let stocks = await page.locator("//span[normalize-space()='Stocks']");
    await stocks.click();

    //search for a stock
    let stockSearch = await page.locator("//input[@placeholder='Search stocks...']");
    await stockSearch.fill("SAARTHI Engine Oil 8.5 L");

    //store the value
    let availableStock = "div[class='listItem ng-star-inserted'] div:nth-child(6)";
    try {
        var stockValue = await page.$eval(availableStock, el => el.textContent);
    } catch (error) {
        console.log('Element not found');
    }

    //make a sale
    let sale = await page.locator("//span[normalize-space()='Sales']");
    let addSale = await page.locator("//span[normalize-space()='Add Sale']");
    let searchCustomer = await page.getByRole('combobox', { name: 'Select Customer' });
    let selectCustomer = await page.locator("//mat-option[@class='mat-option mat-focus-indicator ng-star-inserted mat-active']");
    // search and select a customer
    await sale.click();
    await addSale.click();
    await searchCustomer.fill("SINDHU AUTO PARTS");
    await selectCustomer.click();

    //Add Items
    let requiredQuantity = "2";
    let searchandAddItem = await page.getByRole('combobox', { name: 'Select Item Code' });
    let selectItem = await page.getByRole('option', { name: '10039928AA MRP ₹3,060.00' });
    let quantity = await page.getByLabel('Qty *');
    let newRow = await page.locator("//button[@class='mat-focus-indicator mat-stroked-button mat-button-base mat-primary']");
    let generateInvoice = page.locator("//button[@class='mat-focus-indicator cursor mat-raised-button mat-button-base mat-primary ng-star-inserted']");
    let closePrintTab = await page.locator("//img[@src='/assets/images/svg/close.svg']");

    await searchandAddItem.fill("SAARTHI Engine Oil 8.5 L");
    await selectItem.click();
    await quantity.clear();
    await quantity.fill(requiredQuantity);
    await newRow.click();
    await generateInvoice.click();
    await closePrintTab.click();

    // Verify stock after a sale
    let expectedCurrentStock = (stockValue - (Number(requiredQuantity)));

    //navaigate to stocks
    await stocks.click();
    await page.waitForTimeout(5000);

    //search for a stock
    await stockSearch.fill("SAARTHI Engine Oil 8.5 L");
    await page.waitForTimeout(5000);

    var actualStockAvailable = await page.$eval(availableStock, el => el.textContent);

    console.log(stockValue);
    console.log(expectedCurrentStock);
    console.log(actualStockAvailable);

    let stockUpdate = actualStockAvailable == expectedCurrentStock;
    console.log(stockUpdate);
});