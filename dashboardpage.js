const { By } = require('selenium-webdriver');

class DasboardPage{
    constructor (driver){
        this.driver = driver;
        this.addchart_button = By.xpath("//button[@id='add-to-cart-sauce-labs-backpack']");
        this.chart_button = By.xpath("//div[@id='shopping_cart_container']/a[1]");
        
    }

    async addchart(){
       await this.driver.findElement(this.addchart_button).click();
       await this.driver.findElement(this.chart_button).click();
    }

    async isOnDashboard(){
        const title =await this.driver.findElement(By.className('title'));
        return title.getText();
    }

    async getErrorMessages(){
        try{
            const errorElement = await this.driver.findElement(this.getErrorMessage);
            return await errorElement.getText();
                 }
        catch (err){
            return null;
        }
    }
}

module.exports = DasboardPage;