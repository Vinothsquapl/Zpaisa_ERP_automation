//   Brands 
const { test, expect } = require("@playwright/test");
const { ValidLogin } = require("../src/ValidLogin.spec");
const { Verify } = require("crypto");
const moment = require("moment");

test('Brands', async ({ page }) => {
    test.setTimeout(30000);
    await ValidLogin(page, expect);


    let Masters = "//span[text()='Masters']"
    let Brands = "//a[text()='Brands']"
    let Add = "//span[text()='Add']"
    let BrandName = "//input[@placeholder='Brand Name']"
    let IsActiveCheckbox = "//input[@type='checkbox']"
    let Reset = "//span[text()='Reset']"
    let Save = "//span[contains(text(),'Save')]"
    let CreatedToastMessage = "//div[@class='ant-alert-message']"

    await page.locator(Masters).click();
    await page.locator(Brands).click();


    // const dateToEnter = "1994-12-04";
    // await page.locator(BrandName).fill("input#date-picker-input", dateToEnter);



    const currentDate = moment(); // Current date and time
    const formattedDate = currentDate.format("YYYY-MM-DD HH:mm:ss"); // Format as needed
    console.log(formattedDate)

    // Add brands
    await page.locator(Add).click();
    await expect(page.locator(BrandName)).toBeEditable
    await expect(page.locator(IsActiveCheckbox)).toBeChecked
    await page.locator(BrandName).fill("Test brand name" + formattedDate);
    await page.locator(IsActiveCheckbox).click()
    await (page.locator(IsActiveCheckbox)).uncheck
    await page.locator(Reset).click;
    await page.locator(BrandName).fill("Test brand name")
    await page.locator(Save).click();
    await page.waitForTimeout(3000);

    // expect(bodyText).toContain("Brand added successfully")
    var ToastMessage = await page.$eval(CreatedToastMessage, el => el.textContent);
    if (Verify) {
        ToastMessage == ("Brand added successfully")

    }
    // await ToastMessage == ("Brand added successfully")
    // await page.check(ToastMessage).toBeVisible;
    await page.waitForTimeout(1000);

    // Seaching created record 
    let SearchBox = "//input[@placeholder='Search...']"
    let searchIcon = "//span[@class='anticon anticon-search']//*[name()='svg']"
    let TestBrandName = "//td[text()='Test brand name']"
    let Filter = "//div[@class='ant-select-selector']"
    let FilterAllBrand = "//div[contains(text(),'List All Brands')]"

    await page.click(Filter);
    await page.click(FilterAllBrand)
    await page.locator(SearchBox).fill("Test brand name")
    await page.locator(searchIcon).click();
    await page.waitForTimeout(1000);
    await page.click(TestBrandName);
    await page.waitForTimeout(2000);
    // Update the created 
    await (page.locator(BrandName)).toBeEditable;
    await page.locator(BrandName).fill(" Updated");
    await page.click(Save);
    await page.waitForTimeout(1000);
    // await page.check(ToastMessage).toBeVisible;

})
