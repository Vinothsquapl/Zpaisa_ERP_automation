const { test, expect } = require("@playwright/test");
// const {SuccessfullLogin} = require("./Login.spec");
const url = "http://localhost:4200/login";
let EmailAddress = "//input[@placeholder='youremail@gmail.com']";
let password = "//input[@placeholder='password']";
let signButton = "//span[normalize-space()='Login']"
var bodyText

test('Verfication', async ({ page }) => {
  test.setTimeout(120000);     // Open Zpaisa
  await (page.goto(url, { timeout: 0 }));

  // Verify image
  let PageLOGO = "//img[@src='/src/assets/svgs/Logo.svg']"
  await expect(page.locator(PageLOGO)).toBeVisible

  //Email field verification
  let Box = "//body/div[@id='root']/main[@class='_container_15ldl_1']/div[@class='_form-container_15ldl_7']/form[@class='ant-form ant-form-vertical ant-form-large css-dev-only-do-not-override-1xg9z9n _form-box_15ldl_16']/div[@class='_form-items_15ldl_23']"

  await expect(page.locator(EmailAddress)).toBeEditable;
  await expect(page.locator(Box)).toContainText("Email");

  //password field verifications
  await expect(page.locator(password)).toBeEditable;
  await expect(page.locator(Box)).toContainText("Password");

  // signin button
  await expect(page.locator(signButton)).toBeDisabled;

  //signin
  let Signin = "//span[normalize-space()='Login']"
  await expect(page.locator(Signin)).toBeChecked;

  // // verification fro body 
  // let bodytext ="body"
  // await expect (bodytext).toContain("© 2024 Zpaisa, Inc. All rights reserved. ")

})
// login with invalid creds
test('Invalid username & password', async ({ page }) => {
  await page.goto(url);
  await page.locator(EmailAddress).fill('ABC');
  await page.locator(password).fill('1234');
  await page.locator(signButton).click();
  bodyText = await page.textContent('body');
  expect(bodyText).toContain("Input must be a valid email or a 10-digit phone number")
  expect(bodyText).toContain("Password must be at least 6 characters long")
});
// valid creds
test.only('Valid username & password', async ({ page }) => {
  await page.goto(url);
  await page.locator(EmailAddress).fill('9999999999');
  await page.locator(password).fill('tts1234');
  await page.locator(signButton).click();
  await page.waitForTimeout(5000);
  bodyText = await page.textContent('body');
  expect(bodyText).toContain("Welcome to Dashboard")
  //   });
  // //  Brands 
  //   test.only('Brands', async ({ page }) => {
  //     await page.goto(url);
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
  // Add brands
  await page.locator(Add).click();
  await expect(page.locator(BrandName)).toBeEditable
  await expect(page.locator(IsActiveCheckbox)).toBeChecked
  await page.locator(BrandName).fill("Test brand name")
  await page.locator(IsActiveCheckbox).click()
  await (page.locator(IsActiveCheckbox)).uncheck
  await page.locator(Reset).click;
  await page.locator(BrandName).fill("Test brand name")
  await page.locator(Save).click();
  await page.waitForTimeout(3000);

  // expect(bodyText).toContain("Brand added successfully")
  var ToastMessage = await page.$eval(CreatedToastMessage, el => el.textContent);
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
// Update the created 


})