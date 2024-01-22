const { test, expect } = require('@playwright/test');

const url =  "https://inventory.zpaisa.com";
const login = "//div[@class=\'login-txt\']";
let signButton="//ion-button[@type='submit']";
let KeepmeSignin="//span[@class='mat-checkbox-inner-container mat-checkbox-inner-container-no-side-margin']";
var bodyText ;

test('loginview', async ({ page }) => {

    // Open Zpaisa
    await (page.goto(url));

    // Verify image
    let PageLOGO = "//img[@alt='zpaisa login']"
    await expect(page.locator(PageLOGO)).toBeVisible

    // // Verify page title
    //await expect(page.title).toBe('ZPAISA Business Management Software');
    
    //Verify text login 
    await expect(page.locator(login)).toHaveText("Login");

    //password field varifications
    let password = "//mat-label[@class='ng-tns-c173-1 ng-star-inserted']";
    await expect(page.locator(password)).toBeEditable;
    await expect(page.locator(password)).toHaveText("Password");

    //mobile number field varification
    let mobilenumber = "//mat-label[@class='ng-tns-c173-0 ng-star-inserted']";
    await expect(page.locator(mobilenumber)).toBeEditable;
    await expect(page.locator(mobilenumber)).toHaveText("Mobile Number");

    // signin button
    await expect (page.locator(signButton)).toBeDisabled;

    // keep me signed in checkbox
    await expect (page.locator(KeepmeSignin)).toBeChecked;
    
    // Body text verifications
    bodyText = await page.textContent('body');
    await expect(bodyText).toContain("© 2022 All Rights Reserved. Squapl Digital Media Technologies");
    await expect(bodyText).toContain("Don't have a ZPAISA account?");
    await expect(bodyText).toContain("Keep Logged In");
    await expect(bodyText).toContain("Sign Up Now");

});

test('errorVerifications', async ({ page }) => {

    // Open Zpaisa
    await (page.goto(url));

    // Error message when no data is entered
    var mobilenumber = "//div[@class='mat-form-field-infix ng-tns-c173-0']";
    await (page.click(mobilenumber));
    var password = "//div[@class='mat-form-field-infix ng-tns-c173-1']";
    await (page.click(password));
    await (page.click(login));
    await expect (page.locator(signButton)).toBeDisabled;
    bodyText = await page.textContent('body');
    expect(bodyText).toContain("Phone # is required");
    expect(bodyText).toContain("Password is required");

    // Incorrect phonenumber format
    var mobilenumber = "//input[@id='mat-input-0']";
    var password = "//input[@id='mat-input-1']";
    await (page.locator(mobilenumber).fill("99999998ABC"));
    await (page.click(password));
    bodyText = await page.textContent('body');
    expect(bodyText).toContain("Wrong phone # format");


    //Error message when incorrect data is entered
    await (page.locator(mobilenumber).fill("9999999888"));
    await (page.locator(password).fill("123456"));
    await expect (page.locator(signButton)).toBeEnabled;
    await page.click(signButton);
    // bodyText = await page.textContent('body');
    // expect(bodyText).toContain("");
    // expect(bodyText).toContain("");

});

test('SuccessfullLogin', async ({ page }) => {

    // Open Zpaisa
    await page.goto(url);

    // successfull login with keep me logged in disabled
    await expect (page.locator(KeepmeSignin)).toBeChecked;
    await page.click(KeepmeSignin);
    await expect (page.locator(KeepmeSignin)).toBeDisabled;

    var mobilenumber = "//input[@id='mat-input-0']";
    var password = "//input[@id='mat-input-1']";
    await (page.locator(mobilenumber).fill("9999999999"));
    await (page.locator(password).fill("tts1234"));
    await page.click(signButton);
    await page.waitForTimeout(5000);
    await page.getByText(" Sri Subalaksmi Motors ");
    bodyText = await page.textContent('body');
    console.log(bodyText);
    await expect(bodyText).toContain(" Sri Subalaksmi Motors ");

    // successfull login with keep me logged in enabled



});
