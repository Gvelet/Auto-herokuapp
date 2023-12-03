const {test, expect} = require('@playwright/test');
import { allure } from "allure-playwright";

import {setTestSuite} from '../components/allure-report/allureTestInformation';


test('Отлов ошибок в JS', async({page}) => {
    await setTestSuite(allure, "Страница: JS Error", 'Отлов ошибок', 'Ошибка в консоли');

    page.on('pageerror', (error) => {
        console.log('JavaScript error:', error);
    });

    await page.goto('https://the-internet.herokuapp.com/javascript_error');

    await page.keyboard.press('F12');
    await page.screenshot({ path: 'screenshots/screenshot.png', fullPage: true });
})