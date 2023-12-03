const {test, expect} = require('@playwright/test');
import { allure } from "allure-playwright";
import { Severity } from "allure-js-commons";
import {setTestInformation, setTestSuite, setScreenshot} from '../../components/allure-report/allureTestInformation';

test.beforeEach('Открытие страницы', async({page}) => {
    await allure.tags("dynamicContent", "positiv", "loading");
    await setTestInformation(allure, Severity, "CRITICAL", 
        'Михаил Лемешев', 'При клике идет загрузка элементов, после ожидания, делаем различные действия с элементами');
    await setTestSuite(allure, "Страница: Dynamic Controls", 'Динамическое изменение элементов', 'Ожидание загрузки');

    await page.goto('https://the-internet.herokuapp.com/dynamic_controls');
})

test.describe('Dynamic Controls', async() => {
    test('Ожидание разблокировки инпута', async({page}) => {
        const input = '#input-example input';

        await expect(page.locator(input)).toBeDisabled();
        await setScreenshot(allure, page, 'DisabledInput');

        await page.click('#input-example button');
        await page.waitForSelector(`${input}:not([disabled])`);
        await page.fill(input, 'Some text');
        await setScreenshot(allure, page, 'EnabledInput');
    });

    test('Ожидание удаления чекбокса', async({page}) => {
        const checkbox = await page.locator('#checkbox input');

        await checkbox.check();
        expect(checkbox).toBeChecked();

        await page.click('#checkbox-example button');
        await page.waitForSelector('#message')
        await page.locator('#message').textContent("It's 1gone!");

    });
})
