const { By, Key, Builder, Browser } = require("selenium-webdriver");
var BasePage = require("../basepage");
const assert = require("assert");

class MospolytechPage extends BasePage {
    async open() {
        await this.goToUrl("https://mospolytech.ru");
    }

    async openScheduleTable() {
        let link = await driver.findElement(
            By.xpath(
                "//li[@class='user-nav__item']/a[@href='/obuchauschimsya/raspisaniya/']"
            )
        );
        await link.click();
        await driver.sleep(1500);
    }

    async openScheduleInNewWindow() {
        this.mainWindow = await driver.getWindowHandle();
        const link = await driver.findElement(
            By.xpath(
                `//div[@class='button-group__item']/a[@href='https://rasp.dmami.ru/']`
            )
        );
        await link.sendKeys(Key.CONTROL + Key.ENTER);
        const allWindows = await this.getAllWindows();
        for (const window of allWindows) {
            if (window !== this.mainWindow) {
                await driver.switchTo().window(window);
                await driver.sleep(1000);
                return this.mainWindow != window;
            }
        }
    }

    async enterGroupNumber() {
        const input = await driver.findElement(
            By.xpath(`//input[@class='groups']`)
        );
        await input.sendKeys(`221-323`);
        await driver.sleep(1000);
    }

    async findGroup() {
        const group = await driver.findElement(
            By.xpath(`//div[@id='221-323']`)
        );
        const groupText = await group.getText();
        return groupText == "221-323";
    }

    async getAllWindows() {
        const allWindows = await driver.getAllWindowHandles();
        return allWindows;
    }

    async clickGroup() {
        const groupElement = await driver.findElement(
            By.xpath(`//div[@id='221-323']`)
        );
        await groupElement.click();
        await driver.sleep(1000);
    }

    async getGroups() {
        const allGroups = await driver.findElements(
            By.xpath('//div[contains(@class, "found-groups")]/div')
        );
        return allGroups.length === 1;
    }

    async ColorOfCurrentDay() {
        const days = await driver.findElements(
            By.xpath(`//div[@class="schedule-week"]/child::div`)
        );
        let thisDay;
        for (const day of days) {
            if (days.indexOf(day) == new Date().getDay() - 1) {
                thisDay = day;
            }
        }
        return (
            (await thisDay.getAttribute("class")) ===
            "schedule-day schedule-day_today"
        );
    }

    async goToUrl(url) {
        global.driver = new Builder().forBrowser(Browser.CHROME).build();
        driver.manage().setTimeouts({ implicit: 5000 });
        await driver.get(url);
    }

    async saveScreenshot(fileName) {
        const date = new Date().toLocaleString();

        driver.takeScreenshot().then(function (image, err) {
            require("fs").writeFile(
                `../testing/pages/screenshots/${fileName}_${date}.png`,
                image,
                "base64",
                function (err) {
                    console.log(err);
                }
            );
        });

        // try {
        //     const image = await this.driver.save_screenshot("image.png");
        //     fs.writeFileSync(
        //         `../pages/screenshots/${fileName}_${date}.png`,
        //         image,
        //         "base64"
        //     );
        // } catch (error) {
        //     console.error("Ошибка при скриншоте:", error);
        // }
    }

    async closeBrowser() {
        await driver.sleep(1000);
        await driver.quit();
    }
}

module.exports = new MospolytechPage();
