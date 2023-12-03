const {test, expect} = require('@playwright/test');

import { allure } from "allure-playwright";
import { Severity } from "allure-js-commons";
import {setTestInformation, setTestSuite} from '../components/allure-report/allureTestInformation';

test.describe('Проверка статус кодов', async() => {

    test('Статус код 200', async({page, request}) => {
        await setTestInformation(allure, Severity, "NORMAL", 
        'Михаил Лемешев', 'Проверка статус кода на 200');
        await setTestSuite(allure, "Страница: Status Codes", 'Ожидания статуса', 'Ожидание 200 статуса');

        await page.goto('https://the-internet.herokuapp.com/status_codes');
        await page.click("a[href='status_codes/200']");

        const response = await request.get('https://the-internet.herokuapp.com/status_codes/200')
        console.log(response.status());
        expect(response.status()).toBe(200);
    })

    test('Статус код 301', async({page, request}) => {
        await setTestInformation(allure, Severity, "NORMAL", 
        'Михаил Лемешев', 'Проверка статус кода на 301');
        await setTestSuite(allure, "Страница: Status Codes", 'Ожидания статуса', 'Ожидание 301 статуса');

        await page.goto('https://the-internet.herokuapp.com/status_codes');
        await page.click("a[href='status_codes/301']");

        const response = await request.get('https://the-internet.herokuapp.com/status_codes/301')
        console.log(response.status());
        expect(response.status()).toBe(301);
    })

    test('Статус код 404', async({page, request}) => {
        await setTestInformation(allure, Severity, "NORMAL", 
        'Михаил Лемешев', 'Проверка статус кода на 404');
        await setTestSuite(allure, "Страница: Status Codes", 'Ожидания статуса', 'Ожидание 404 статуса');

        await page.goto('https://the-internet.herokuapp.com/status_codes');
        await page.click("a[href='status_codes/404']");

        const response = await request.get('https://the-internet.herokuapp.com/status_codes/404')
        console.log(response.status());
        expect(response.status()).toBe(404);
    })

    test('Статус код 500', async({page, request}) => {
        await setTestInformation(allure, Severity, "CRITICAL", 
        'Михаил Лемешев', 'Проверка статус кода на 500');
        await setTestSuite(allure, "Страница: Status Codes", 'Ожидания статуса', 'Ожидание 500 статуса');

        await page.goto('https://the-internet.herokuapp.com/status_codes');
        await page.click("a[href='status_codes/500']");

        const response = await request.get('https://the-internet.herokuapp.com/status_codes/500')
        console.log(response.status());
        expect(response.status()).toBe(500);
    })
})