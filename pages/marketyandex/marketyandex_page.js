const { By, Key, Builder, Browser } = require("selenium-webdriver");
var BasePage = require("../basepage");
const assert = require("assert");
const { SeleniumServer } = require("selenium-webdriver/remote");
const { Actions } = require('selenium-webdriver');


class MarketyandexPage extends BasePage {
    async goToUrl(url) {
        global.driver = new Builder().forBrowser(Browser.CHROME).build();
        driver.manage().setTimeouts({ implicit: 5000 });
        await driver.get(url);
        await driver.sleep(5000);
    }

    async open() {
        await this.goToUrl("https://market.yandex.ru");
    }
    async clickCatalog() {
        const catalogPath = await driver.findElement(
            By.xpath("//button[@class='_30-fz button-focus-ring Hkr1q _1pHod _2rdh3 _3rbM-']")
        );
        await catalogPath.click();
        await driver.sleep(1000);
    }

    async clickGamingPhone(){
        const actions = driver.actions();
        await driver.sleep(1000);

        const forGamingPath = await driver.findElement(
            By.xpath("//span[contains(text(),'Все для гейминга')]")
        );

        await actions.move({duration:1000,origin:forGamingPath,x:0,y:0}).perform();


        const gamingPhonesPath = await driver.findElement(
            // By.xpath("//span[contains(text(),'Игровые телефоны')]")
            By.xpath(
                `//ul/li/div/a[contains(@href, "/catalog--igrovye-telefony/41813550/list?hid=91491&glfilter=24892510%3A24892650%2C24892590%2C39026134%2C24892630%2C24892692")]`
            )
        );
        await driver.sleep(1000);
        await gamingPhonesPath.click();
        await driver.sleep(1000);
    }

    async firstFive(){
        const actions = driver.actions();
        await driver.sleep(1000);

        const H3Element = await driver.findElement(By.xpath("//h3"));
        await actions.move({duration:1000,origin:H3Element,x:0,y:0}).perform();

        const allH3Elements = await driver.findElements(By.xpath("//h3"));

        const parentSpans = await driver.findElements(By.css('span[data-auto="snippet-price-current"]'));

        let index = 0;
        let resTexts=[];
        let res='';
        // Проходим по каждому найденному родительскому span
        for (let parentSpan of parentSpans) {
            if (index >= 5){
                break;
            }
            index++;
            // Находим все вложенные span в родительском span
            const nestedSpans = await parentSpan.findElements(By.css('span'));

            res = '';
            // Получаем текст из каждого вложенного span
            for (let nestedSpan of nestedSpans) {
                const text = await nestedSpan.getText();
                res += text;
            }
            resTexts[index-1] = res;
        }

        // Выводим текст из первых пяти элементов <h3>
        for (let i = 0; i < Math.min(5, allH3Elements.length); i++) {
            const text = await allH3Elements[i].getText();
            console.log(`${i + 1}: ${text} -- ${resTexts[i]}`);
        }
    }

    async samsung(){
        // Находим чекбокс "Samsung" по тексту
        const samsungCheckbox = await driver.findElement(By.xpath('//span[text()="Samsung"]/preceding-sibling::span'));

        // Проверяем, выбран ли чекбокс, и если нет, то кликаем на него
        const isChecked = await samsungCheckbox.getAttribute('aria-checked');
        if (isChecked !== 'true') {
            await samsungCheckbox.click();
        }

        const actions = driver.actions();
        await driver.sleep(1000);

        const H3Element = await driver.findElement(By.xpath("//h3"));
        await actions.move({duration:1000,origin:H3Element,x:0,y:0}).perform();

        const allH3Elements = await driver.findElements(By.xpath("//h3"));

        const parentSpans = await driver.findElements(By.css('span[data-auto="snippet-price-current"]'));

        let index = 0;
        let resTexts=[];
        let res='';
        // Проходим по каждому найденному родительскому span
        for (let parentSpan of parentSpans) {
            if (index >= 5){
                break;
            }
            index++;
            // Находим все вложенные span в родительском span
            const nestedSpans = await parentSpan.findElements(By.css('span'));

            res = '';
            // Получаем текст из каждого вложенного span
            for (let nestedSpan of nestedSpans) {
                const text = await nestedSpan.getText();
                res += text;
            }
            resTexts[index-1] = res;
        }

        // Выводим текст из первых пяти элементов <h3>
        for (let i = 0; i < Math.min(5, allH3Elements.length); i++) {
            const text = await allH3Elements[i].getText();
            console.log(`${i + 1}: ${text} -- ${resTexts[i]}`);
        }
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
    }


    async closeBrowser() {
        await driver.sleep(1000);
        await driver.quit();
    }
}

module.exports = new MarketyandexPage();
