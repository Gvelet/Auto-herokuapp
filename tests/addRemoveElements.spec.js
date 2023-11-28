const {test, expect} = require('@playwright/test');
import { allure } from "allure-playwright";
import { Severity } from "allure-js-commons";
import {setScreenshot, setTestSuite, setTaskLinks, setTestInformation} from '../components/allure-report/allureTestInformation';

test.beforeEach('Открытие страницы', async ({page}) => {
    await page.goto('https://the-internet.herokuapp.com/add_remove_elements/');
    await allure.tags("Add/Remove Elements", "Regress");
});


test.describe('Добавление/Удаление Элементов', async() => {

    test('проверка заголовка старницы', async({page}) => {
        await setTestInformation(allure, Severity, 'TRIVIAL', 'Михаил Лемешев', 
        'Добавление и удаление элементов на старнице Add/Remove Elements'
        );
        await setTaskLinks(allure, "AUTH-2323", "TMS-4211");
        await setTestSuite(allure, "Страница Add/Remove Elements", 'Добавление/Удаление элементов', 'Заголвоок старницы');

        await expect(page.locator('#content h3')).toHaveText('Add/Remove Elements');
    });

    test('Добавление/Удаление 1 элемента @regress', async({page}) => {
        await setTestInformation(allure, Severity, 'NORMAL', 'Михаил Лемешев', 
        'Добавление и удаление элементов на старнице Add/Remove Elements'
        );
        await setTaskLinks(allure, "AUTH-2323", "TMS-4211");
        await setTestSuite(allure, "Страница Add/Remove Elements", 'Добавление/Удаление элементов', 'Добавление/Удаление 1 элемента');

        await page.locator('.example button').click();
        await setScreenshot(allure, page, 'Элемент-Добавлен');

        await page.locator('#elements button').click();
        await setScreenshot(allure, page, 'Элемент-Удален');
    });

    test('Добавление/Удаление 10 элементов @regress', async({page}) => {
        await setTestInformation(allure, Severity, 'NORMAL', 'Михаил Лемешев', 
        'Добавление и удаление элементов на старнице Add/Remove Elements'
        );
        await setTaskLinks(allure, "AUTH-2323", "TMS-4211");
        await setTestSuite(allure, "Страница Add/Remove Elements", 'Добавление/Удаление элементов', 'Добавление/Удаление 10 элементов');


        const btnsAdd = page.getByRole('button', { name: 'Add Element' });

        for(let i = 0; i < 10; i++) {
            await btnsAdd.click();
        };

        await setScreenshot(allure, page, '10ЭлементовДобавлено');

        const btnsDelete = await page.$$('#elements button');
        expect(btnsDelete.length).toBe(10);

        for(let i = 0; i < btnsDelete.length; i++) {
            await btnsDelete[i].click();
        };

        const remainingDeleteButtons = await page.$$('#elements button');
        expect(remainingDeleteButtons.length).toBe(0);
        await setScreenshot(allure, page, '0ЭлементовDelete');
    });

    test('Добавление/Удаление 100 элементов', async({page}) => {
        await setTestInformation(allure, Severity, 'MINOR', 'Михаил Лемешев', 
        'Добавление и удаление элементов на старнице Add/Remove Elements'
        );
        await setTaskLinks(allure, "AUTH-2323", "TMS-4211");
        await setTestSuite(allure, "Страница Add/Remove Elements", 'Добавление/Удаление элементов', 'Добавление/Удаление 100 элемента');

        const btnsAdd = page.getByRole('button', { name: 'Add Element' });

        for(let i = 0; i < 100; i++) {
            await btnsAdd.click();
        };

        await setScreenshot(allure, page, '100ЭлементовДобавлено');

        const btnsDelete = await page.$$('#elements button');
        expect(btnsDelete.length).toBe(100);

        for(let i = 0; i < btnsDelete.length; i++) {
            await btnsDelete[i].click();
        };

        const remainingDeleteButtons = await page.$$('#elements button');
        expect(remainingDeleteButtons.length).toBe(0);
        await setScreenshot(allure, page, '0ЭлементовDelete');
    });
})