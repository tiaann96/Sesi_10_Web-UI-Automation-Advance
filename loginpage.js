const { By } = require('selenium-webdriver');

class LoginPage{
    constructor (driver){
        this.driver = driver;
        this.user_name_input = By.id('user-name');
        this.password_input = By.id('password');
        this.login_button = By.xpath("//input[@id='login-button']");
        this.error_message = By.css('.error-message-container');
    }

    async navigate(){
        await this.driver.get('https://www.saucedemo.com/');
    }

    async login(username, password){
        await this.driver.findElement(this.user_name_input).sendKeys(username);
        await this.driver.findElement(this.password_input).sendKeys(password);
        await this.driver.findElement(this.login_button).click();
    }

    async getErrorMessage(){
        try{
            const errorElement = await this.driver.findElement(this.getErrorMessage);
            return await errorElement.getText();
                 }
        catch (err){
            return null;
        }
    }
}

module.exports = LoginPage;