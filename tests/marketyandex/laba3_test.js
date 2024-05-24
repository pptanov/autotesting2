const MarketyandexPage = require("../../pages/marketyandex/marketyandex_page.js");
const { before, afterEach } = require("mocha");
const assert = require("assert");
var chai = require("chai");

describe("Marketyandex-test", () => {
    before(async () => {
        await MarketyandexPage.open();
    });

    it("открывается каталог и страница игровые телефоны", async () => {
        await MarketyandexPage.clickCatalog();
        await MarketyandexPage.clickGamingPhone();
    });

    it("выводит первые 5 телефонов", async () => {
        await MarketyandexPage.firstFive();
    });

    it("выбирает самсунг и выводит", async () => {
        await MarketyandexPage.samsung();
    });

    afterEach(async function () {
        if (this.currentTest.state === "failed") {
            await MarketyandexPage.saveScreenshot('');
        }
    });

    after(async () => {
        await MarketyandexPage.closeBrowser();
    });
});
