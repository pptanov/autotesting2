// подключаем модуль для проверок
const assert = require("assert");
// импортируем модули из библиотеки
const { Builder, Browser, By } = require("selenium-webdriver");
// создаем объект веб-драйвера, Google Chrome
let driver = new Builder().forBrowser(Browser.CHROME).build();

// ссылка для теста
const URL = "https://lambdatest.github.io/sample-todo-app/";
// общее количество элементов
const total = 5;
// кол-во оставшихся элементов
let remaining = 5;

async function lambdaTest() {
    try {
        // открываем страницу по URL
        await driver.get(URL);
        // разворачиваем окно и ждем 1 сек
        await driver.manage().window();
        await driver.sleep(1000);

        // проход по всем элементам по странице
        for (let i = 1; i <= total; i++) {
            let remainingElement = await driver.findElement(
                By.xpath("//span[@class='ng-binding']")
            );
            // считываем текст
            let text = await remainingElement.getText();
            // проверяем текст
            let expectedText = `${remaining} of ${total} remaining`;
            assert.equal(text, expectedText);

            // поиск элемента с галочкой
            let item = await driver.findElement(
                By.xpath(`//input[@name='li${i}']/following-sibling::span`)
            );
            // считываем текст из class
            let itemClass = await item.getAttribute("class");
            // проверка начального текста в class
            assert.equal(itemClass, "done-false");
            // нажимаем на галочку
            await driver.findElement(By.name("li" + i)).click();
            // уменьшаем кол-во оставшихся элементов на 1, ждем 1 секундy
            remaining--;
            await driver.sleep(1000);
            // считываем значение class
            itemClass = await item.getAttribute("class");
            // проверка на соответствие
            assert.equal(itemClass, "done-true");
        }
        // поиск поля для ввода текста и заполнение произвольным значением
        await driver.findElement(By.id("sampletodotext")).sendKeys("New item");
        await driver.sleep(1000);

        // нажимаем кнопку добавления нового элемента в список
        await driver.findElement(By.id("addbutton")).click();
        // находим добавленный элемент
        let item = await driver.findElement(
            By.xpath("//input[@name='li6']/following-sibling::span")
        );
        let itemText = await item.getText();
        let itemClass = await item.getAttribute("class");
        // проверяем, что у нового элемента текст равен тому, что мы ввели
        assert.equal(itemText, "New item");
        assert.equal(itemClass, "done-false");
        await driver.sleep(1000);
        await driver.findElement(By.name("li6")).click();
        itemClass = await item.getAttribute("class");
        assert.equal(itemClass, "done-true");

        await driver.sleep(3000);
    } catch (err) {
        //сохраняем скриншот страницы в файл
        driver.takeScreenshot().then(function (image) {
            require("fs").writeFileSync(
                "screenshot_error.png",
                image,
                "base64"
            );
        });
        // вывод ошибки
        console.error("Ошибка в тесте: ", err);
    } finally {
        // закрываем web-driver
        await driver.quit();
    }
}

lambdaTest();
