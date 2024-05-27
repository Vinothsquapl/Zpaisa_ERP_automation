
async function ValidLogin(page, expect) {
    const url = "http://localhost:4200/login";
    let EmailAddress = "//input[@placeholder='youremail@gmail.com']";
    let password = "//input[@placeholder='password']";
    let signButton = "//span[normalize-space()='Login']"
    var bodyText
    // Open Zpaisa
    await page.goto(url);

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

    await page.goto(url);
    await page.locator(EmailAddress).fill('9999999999');
    await page.locator(password).fill('tts1234');
    await page.locator(signButton).click();
    await page.waitForTimeout(5000);
    bodyText = await page.textContent('body');
    expect(bodyText).toContain("Welcome to Dashboard")
};


module.exports = { ValidLogin };