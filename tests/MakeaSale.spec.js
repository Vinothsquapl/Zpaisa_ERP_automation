const {test, expect} = require ("@playwright/test");
const { login } = require('../src/utilities.spec');

test.beforeEach(async ({ page }) => {

    test.setTimeout(120000);
    await login(page);

  });

test('stockdetails', async ({ page }) => {

  // add stock details
  let stocks = await page.locator("//span[normalize-space()='Stocks']");
  let stockSearch = await page.locator("//input[@placeholder='Search stocks...']");
  let availableStock = "div[class='listItem ng-star-inserted'] div:nth-child(6)";

  await stocks.click();
  const stockItems = ['SAARTHI Engine Oil 10 L', 'Locking Washer', 'RUBBER BOOT', 'BOOT RUBBER','THRUST BEARING 51207']
  const initialStocksAvailable = [];

  for (let i = 0;
    i < stockItems.length ;
    i++){
      await stockSearch.fill(stockItems[i]);
      var stockValue = await page.$eval(availableStock, el => el.textContent);
      await initialStocksAvailable.push(stockValue);
    }

    console.log(initialStocksAvailable);


  // generate bill of 5 items
    let sale = await page.locator("//span[normalize-space()='Sales']");
    let addSale = await page.locator("//span[normalize-space()='Add Sale']");
    let searchCustomer = await page.getByRole('combobox', { name: 'Select Customer' });
    let selectCustomer = await page.locator("//mat-option[@class='mat-option mat-focus-indicator ng-star-inserted mat-active']");
  // search and select a customer
    await sale.click();
    await addSale.click();
    await searchCustomer.fill("SINDHU AUTO PARTS");
    await selectCustomer.click();

  // add bill items and generate bill
    let requiredQuantity = "1";
    let searchandAddItem = await page.getByRole('combobox', { name: 'Select Item Code' });//change path
    let selectItem = await page.getByRole('option', { name: '10039928AA MRP ₹3,060.00' });//change path
    let quantity = await page.getByLabel('Qty *');
    let newRow = await page.locator("//button[@class='mat-focus-indicator mat-stroked-button mat-button-base mat-primary']");
    let generateInvoice = page.locator("//button[@class='mat-focus-indicator cursor mat-raised-button mat-button-base mat-primary ng-star-inserted']");
    let closePrintTab = await page.locator("//img[@src='/assets/images/svg/close.svg']");

    for(let i = 0; 
      i < stockItems.length;
      i++){
        await searchandAddItem.fill(stockItems[i]);
        await selectItem.click();
        await quantity.clear();
        await quantity.fill(requiredQuantity);
        await newRow.click();
      }

    await generateInvoice.click();
    await closePrintTab.click();

  //check stock update
  const actualStocksAvailable = [];
  const expectedCurrentStock = [];

  await stocks.click();

  for (let i = 0;
    i < stockItems.length ;
    i++){
      await stockSearch.fill(stockItems[i]);
      var updatedStockValue = await page.$eval(availableStock, el => el.textContent);
      await actualStocksAvailable.push(updatedStockValue);
    }

    console.log(actualStocksAvailable);

  //expected current stocks

  for (let i=0;
    i < initialStocksAvailable.length;
    i++){
      await expectedCurrentStock.push((initialStocksAvailable[i]) - (actualStocksAvailable[i]));
    }

    console.log(expectedCurrentStock);

  function stocksAreEqual (initialStocksAvailable, expectedCurrentStock){

    if (initialStocksAvailable.length !== expectedCurrentStock.length){
      console.log(false);
    }
    for (let i = 0; 
      i < initialStocksAvailable.length;
      i++){
        if ((initialStocksAvailable[i]) !== (expectedCurrentStock[i])){
          console.log(false);
        }
      }
      return(true);
  }

  console.log(stocksAreEqual);

  });
