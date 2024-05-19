const MospolytechPage = require("../../pages/mospolytech/mospolytech_page.js");
const { before, afterEach } = require("mocha");
const assert = require("assert");
var chai = require("chai");

describe("Mospolytech-test", () => {
    before(async () => {
        await MospolytechPage.open();
    });

    it("открывает расписание", async () => {
        await MospolytechPage.openScheduleTable();
    });

    it("проверяет новую вкладку", async () => {
        const isNewTabOpened = await MospolytechPage.openScheduleInNewWindow();
        // assert.isTrue(isNewTabOpened, "Новая вкладка не открыта");
    });

    it("вводит номер группы", async () => {
        await MospolytechPage.enterGroupNumber();
    });

    it("проверяет число групп в списке", async () => {
        const isSingleGroupFound = await MospolytechPage.getGroups();
        const isMyGroupFound = await MospolytechPage.findGroup();
        console.log(isSingleGroupFound);
        chai.assert.isTrue(isSingleGroupFound, "Более 1 группы не найдено");
        chai.assert.isTrue(isMyGroupFound, "Нет такой группы");
    });

    it("проверяет, подчеркнут ли текущий день", async () => {
        await MospolytechPage.clickGroup();
        chai.assert.isTrue(await MospolytechPage.ColorOfCurrentDay());
    });

    afterEach(async function () {
        if (this.currentTest.state === "failed") {
            await MospolytechPage.saveScreenshot('');
        }
    });

    after(async () => {
        await MospolytechPage.closeBrowser();
    });
});
