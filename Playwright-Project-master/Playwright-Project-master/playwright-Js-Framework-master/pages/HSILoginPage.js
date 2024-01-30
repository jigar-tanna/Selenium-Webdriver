const { expect } = require("@playwright/test");

exports.HSILoginPage = 
class HSILoginPage {
    constructor(page) {
      this.page = page;
      this.usernameInput = page.getByPlaceholder('test@example.com');
      this.passwordInput = page.getByPlaceholder('Password');
      this.loginButton = page.getByRole('button', { name: 'Sign in with email' });
      }
      async gotoLoginPage(url){
        await this.page.goto(url);
    }
  
    async login(username, password) {
     await this.usernameInput.fill(username);
     await this.passwordInput.fill(password);
     await this.loginButton.click();
     
    }

}