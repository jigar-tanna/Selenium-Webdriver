const { test, expect } = require('@playwright/test');
import { HSILoginPage } from '../pages/HSILoginPage';

test('Scenario 3: Login Test standard_user', async ({ page }) => {

    const login = new HSILoginPage(page)
    const redirectedURLs = [];
    page.on('request', request => console.log('>>', request.method(), request.url()));
    page.on('response', response => console.log('<<', response.status(), response.url()));

    await login.gotoLoginPage("https://threadrippertestingval.na.hsiplatformval.com/users/sign_in")

    await login.login('qa@hsi.com', 'Password123!@#')

    const ele = page.locator('button').filter({ hasText: 'flag' });
    await ele.waitFor({ state: "visible" })

    await page.waitForURL('**/sms-legacy-platform/na/sms/legacy/');
    page.on('requestfinished', (request) => {
        const redirectedURL = request.url();
        redirectedURLs.push(redirectedURL);
    });
    console.log('Redirected URLs:', redirectedURLs);
    console.log('PAGE URL:', page.url());
    const testurl = page.url();

    await expect(page).toHaveURL('https://sys.hsiplatformval.com/en/threadrippertestingval/sms-legacy-platform/na/sms/legacy/');

})

test('Scenario 1: URL Redirection', async ({ page }) => {

    const login = new HSILoginPage(page)
    const redirectedURLs = [];

    await login.gotoLoginPage("https://sys.hsiplatformval.com/en/threadrippertestingval/sms-legacy-platform/na")

    await page.waitForURL('**/users/sign_in');
    console.log('PAGE URL:', page.url());
    const testurl = page.url();

    await expect(page).toHaveURL('https://threadrippertestingval.na.hsiplatformval.com/users/sign_in');

})
