const { test, expect } = require('@playwright/test');

test('Zpaisalogin', async ({ page }) => {

    // Open Zpaisa 
    await (page.goto("https://inventory.zpaisa.com"));
    // Verify image
    let PageLOGO = "//img[@alt='zpaisa login']"
    await expect(page.locator(PageLOGO)).toBeVisible
    // // Verify page title
    const element = await this.page.getByText(/Zpaisa/);
    const isVisible = await element.isVisible();
    console.log(isVisible);


    //Verify text login 
    let login = "//div[@class='login-txt']"
    await expect(page.locator(login)).toHaveText("Login");
    //Verify mobile number box is clickable
    let mobilenumber = "//input[@id='mat-input-0']"
    await expect(page.locator(mobilenumber)).toBeEditable;

    // verify error message
    await (page.click(mobilenumber));
    await (page.click(login));
    let bodyText = await page.textContent('body');
    expect(bodyText).toContain("Phone # is required");
    //verify password is clickable
    let password = "//input[@id='mat-input-1']"
    await expect(page.locator(password)).toBeEditable;

    // verify error message
    await (page.click(password));
    await (page.click(login));
    expect(bodyText).toContain("Password");
    // verify checkbox
    let KeepmeSignin = "//span[@class='mat-checkbox-inner-container mat-checkbox-inner-container-no-side-margin']"
    await expect(page.locator(KeepmeSignin)).toBeChecked;
    // verify signin button is not disabled
    let siginButton = "//form[@class='inputs-list ng-pristine ng-invalid ng-touched']"
    await expect(page.locator(siginButton)).toBeDisabled;
    // Verify Wrong phone number format
    expect(page.locator(mobilenumber).fill("ABC"));
    await (page.click(login));
    let pageText = await page.textContent('body')
    expect(pageText).toContain("Wrong phone ");



});