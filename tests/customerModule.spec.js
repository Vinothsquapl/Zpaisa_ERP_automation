const { test, expect } = require("@playwright/test");
// const {SuccessfullLogin} = require("./Login.spec");
var bodyText;
const url = "https://inventory.zpaisa.com";
const mobilenumber = "//input[@id='mat-input-0']";
const password = "//input[@id='mat-input-1']";
const signButton = "//ion-button[@type='submit']";
const loginNumber = "9999999999";
const accPassword = "tts1234";

test('Login', async ({ page }) => {
    test.setTimeout(120000);     // Open Zpaisa
    await (page.goto(url, { timeout: 0 }));

    //login
    await (page.locator(mobilenumber).fill(loginNumber));
    await (page.locator(password).fill(accPassword));
    await page.click(signButton);
    await page.waitForTimeout(5000);
    await page.getByText(" Sri Subalaksmi Motors ");

    // customer listing
    let customer = "//span[normalize-space()='Customers']"
    let list = "//body[1]/app-root[1]/ion-app[1]/ion-router-outlet[1]/app-home[1]/div[1]/mat-sidenav-container[1]/mat-sidenav[1]/div[1]/app-left-menu[1]/div[1]/div[1]/div[1]/div[4]/div[1]/div[1]/div[1]"
    await page.click(customer);
    await page.click(list, { timeout: 0 });

    // bodyText = await page.textContent('body');
    // await expect(bodyText).toContain("CUSTOMER PROFILES");

    // await expect (page.locator(addcustomer)).toBeEnabled;
    // let searchinventory="//input[@id='mat-input-2']"
    // await expect(page.locator(searchinventory)).toBeEditable;
    // let ellipse="(//img)[23]"
    // await expect(page.locator(ellipse)).toBeVisible;
    // page.click(ellipse);
    // let dropdownEllipse="(//div[@class='mat-menu-content ng-tns-c260-34'])[1]"
    // await expect(page.locator(dropdownEllipse)).toBeVisible;
    // page.click(ellipse);

    // Add customer fill forms 
    let addcustomer = "//span[normalize-space()='Add Customer']"
    page.click(addcustomer);
    await page.getByLabel('Name *').fill('name');
    // await page.getByText('This field is required').click();
    await page.getByLabel('GST # (Optional)').fill('123');

    await page.getByLabel('Address Line 1 *').fill('Test');

    await page.getByLabel('Address Line 2 *').fill('Tamilnadu');

    await page.getByLabel('City / Town *').fill('Tamilnadu');

    await page.getByLabel('District *').fill('TamilnaduTamilnadu');
    await page.getByLabel('State *').locator('span').click();
    await page.getByText('TAMIL NADU').click();

    await page.getByLabel('Pin Code *').fill('123456');

    await page.getByLabel('Primary Mobile *').fill('9999999999');

    await page.getByRole('button', { name: '+ Add Customer' }).click();



});





