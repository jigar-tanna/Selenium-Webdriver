const { test, expect, firefox } = require('@playwright/test');

let page;

test.beforeAll('Setup', async ({browser}) => {
    page=await browser.newPage();
    console.log('Before tests');
  });
 
  test('URL Redirection', async () => {

    const redirectedURLs = [];
    await page.goto("https://sys.hsiplatformval.com/en/threadrippertestingval/sms-legacy-platform/na")

    await page.waitForURL('**/users/sign_in');
    console.log('PAGE URL:', page.url());
    const testurl = page.url();

    await expect(page).toHaveURL('https://threadrippertestingval.na.hsiplatformval.com/users/sign_in');
}) 

test('Login', async () => {
    await page.goto("https://threadrippertestingval.na.hsiplatformval.com/users/sign_in")
    //await page.locator('#user-name').fill('qa@hsi.com');
    await page.getByPlaceholder('test@example.com').fill('qa@hsi.com');
    await page.getByPlaceholder('Password').fill('Password123!@#');
    //await page.locator('#password').fill('Password123!@#');
    //await page.locator('#login-button').click();
    await page.getByRole('button', { name: 'Sign in with email' }).click();

  const redirectedURLs = [];
  page.on('request', request => console.log('>>', request.method(), request.url()));
  page.on('response', response => console.log('<<', response.status(), response.url()));

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

