const { Builder, By, Key, until } = require('selenium-webdriver');

async function rosetkaSearchTest() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        // Перейти на сторінку Розетка
        await driver.get('https://rozetka.com.ua/');
        
        // Очікування видимості попапу та натискання на кнопку "Так"
        // let popup = await driver.wait(until.elementLocated(By.id('rz-banner-yes')), 5000);
        // await popup.click();

        // Шукати товар за ключовими словами
        let searchBox = await driver.findElement(By.xpath("//input[@name='search']"));
        await searchBox.sendKeys('батарейки', Key.RETURN);

        // Очікування результатів пошуку
        await driver.wait(until.elementLocated(By.className('goods-tile')), 5000);

        // Перевірка наявності результатів
        let searchResults = await driver.findElements(By.className('goods-tile'));
        if (searchResults.length > 0) {
            console.log('Результати пошуку успішно відображені');
        } else {
            console.log('Результати пошуку не відображені');
        }

        // Порівняння цін різних товарів
        let products = await driver.findElements(By.className('goods-tile'));
        let firstProduct = await products[0].findElement(By.css('span.goods-tile__price-value'));
        let firstProductPrice = await firstProduct.getText();
        let secondProduct = await products[1].findElement(By.css('span.goods-tile__price-value'));
        let secondProductPrice = await secondProduct.getText();

        console.log('Ціна першого товару:', firstProductPrice);
        console.log('Ціна другого товару:', secondProductPrice);

    } finally {
        // Закриття веб-драйвера
        await driver.quit();
    }
}

// Виклик функції для тестування
rosetkaSearchTest();
