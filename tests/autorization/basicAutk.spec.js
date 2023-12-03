const {test, expect} = require('@playwright/test');
import { allure } from "allure-playwright";
import { Severity } from "allure-js-commons";

import { titlePage, results } from '../../data/expects/dataWaiting';
import {basiсAuth} from '../../components/setBasicAuthCredentials';
import urlChapter from '../../data/URLs/urlСhapter';
import {setTestInformation, setTaskLinks, setTestSuite, setScreenshot, setTestEpic} from '../../components/allure-report/allureTestInformation';


test('Проверка Базовой авторизации@regress @smoke', async({page}, testInfo) => {
    await allure.tags("basicAuth", "Smoke", "Authentication");

    await setTestInformation(allure, Severity, 'CRITICAL', 'Флаг', 'Проверка Базовой авторизации');
    await setTaskLinks(allure, "AUTH-123", "TMS-456");
    await setTestSuite(allure, "Проверка базовой авторизации на сайте", 'Smoke тест', 'Аутентификация');
    await setTestEpic(allure, 'Эпик', 'Важно', 'story');

    await basiсAuth(page);
    await page.goto(urlChapter.basicAuth);

    await expect(page.locator('.example h3')).toHaveText(titlePage.basicAuth);
    await expect(page.locator('.example p')).toHaveText(results.basicAuthTextSuccess);

    await setScreenshot(allure, page, 'basicAuth');
})