const { expect } = require("@playwright/test");

exports.LoginPage = 
class LoginPage {
   
    constructor(page) {
      this.page = page;
      this.usernameInput = '#user-name';
      this.passwordInput = '#password';
      this.loginButton = '#login-button';
    }
  
    async gotoLoginPage(url){
        await this.page.goto(url);
    }
  
    async login(username, password) {
     await this.page.locator(this.usernameInput).fill(username);
     await this.page.locator(this.passwordInput).fill(password);
     await this.page.locator(this.loginButton).click();
     
    }
}