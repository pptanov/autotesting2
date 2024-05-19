const { By, Key } = require("selenium-webdriver");
var BasePage = require("../basepage");

const assert = require("assert");
const { Builder, Browser } = require("selenium-webdriver");

class LambdaPage extends BasePage {
    async open() {
        const URL = "https://lambdatest.github.io/sample-todo-app/";
        await this.goToUrl(URL);
    }

    async getRemainingText() {
        let remainingElement = await this.driver.findElement(
            By.xpath("//span[@class='ng-binding']")
        );
        return await remainingElement.getText();
    }

    async getOptionText(index) {
        let item = await this.driver.findElement(
            By.xpath(`//input[@name='li${index}']/following-sibling::span`)
        );
        return await item.getText();
    }

    async addNewItem(itemText) {
        await driver.findElement(By.id("sampletodotext")).sendKeys(itemText);
        await driver.findElement(By.id("addbutton")).click();
    }

    async getItemText(index) {
        let item = await driver.findElement(
            By.xpath(`//input[@name='li${index}']/following-sibling::span`)
        );
        return item.getText();
    }

    async toggleItem(index) {
        await driver.findElement(By.name(`li${index}`)).click();
    }

    async getItemClass(index) {
        let item = await driver.findElement(
            By.xpath(`//input[@name='li${index}']/following-sibling::span`)
        );
        return item.getAttribute("class");
    }
}

module.exports = new LambdaPage();
