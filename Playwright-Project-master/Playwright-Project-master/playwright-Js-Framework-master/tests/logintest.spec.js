const { test, expect, firefox } = require('@playwright/test');
import { LoginPage } from '../pages/LoginPage';

test('Login Test standard_user', async ({ page }) => {

    const login=new LoginPage(page)
    await login.gotoLoginPage("https://www.saucedemo.com/")
    await login.login('standard_user','secret_sauce')
    await page.waitForTimeout(3000)
    //await login.verifylogin()

    await page.close();
})

test('Login Test with locked_out_user', async ({ page }) => {

    const login=new LoginPage(page)
    await login.gotoLoginPage("https://www.saucedemo.com/")
    await login.login('locked_out_user','secret_sauce')
    await page.waitForTimeout(3000)
    //await login.verifylogin()

    await page.close();
})