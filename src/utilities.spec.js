async function login(page) {
    
    const url = "https://inventory.zpaisa.com";
    const mobilenumber = "//input[@id='mat-input-0']";
    const password = "//input[@id='mat-input-1']";
    const signButton = "//ion-button[@type='submit']";
    const loginNumber = "9999999999";
    const accPassword = "tts1234";


    // Open Zpaisa
    await (page.goto(url, { timeout: 0 }));

    //login
    await (page.locator(mobilenumber).fill(loginNumber));
    await (page.locator(password).fill(accPassword));
    await page.click(signButton);
    await page.waitForTimeout(5000);
    await page.getByText(" Sri Subalaksmi Motors ");
    
  }

  module.exports = { login };
  