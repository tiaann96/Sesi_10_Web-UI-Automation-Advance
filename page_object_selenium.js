const { Builder } = require('selenium-webdriver');
const LoginPage = require('./loginpage');
const DashboardPage = require('./dashboardpage');
const assert = require('assert');
const fs = require('fs');
const screenshotdir = './screenshots/';

if(!fs.existsSync(screenshotdir)){
    fs.mkdirSync(screenshotdir,{recursive:true});
}

describe('Saucedemo Test', function () {
    this.timeout(30000);
    let driver;

    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
    });

    beforeEach(async function () {
        const loginpage = new LoginPage(driver);
        const dashboardpage = new DashboardPage(driver);
        await loginpage.navigate();
        await loginpage.login('standard_user','secret_sauce');
        await dashboardpage.addchart();
    });

    it('Validate item ke cart', async function () {
        const dashboardpage = new DashboardPage(driver);
        const error_message = await dashboardpage.getErrorMessages();
        assert.strictEqual(error_message, 'Pesanan Sudah dimasukan di keranjang','Ecpected title is error message');
    });

    afterEach(async function () {
        const screenshot = await driver.takeScreenshot();
        const filepath = `${screenshotdir}/${this.currentTest.title.replace(/\s+/g, '_')}_${Date.now()}.png`;
        fs.writeFileSync(filepath, screenshot, 'base64');
    });

    after(async function () {
        await driver.quit();
    });
});