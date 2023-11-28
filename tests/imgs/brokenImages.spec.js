const {test, expect} = require('@playwright/test');
import {setTestInformation, setTaskLinks, setTestSuite, setScreenshot, setTestEpic} from '../../components/allure-report/allureTestInformation';
import { allure } from "allure-playwright";
import { Severity } from "allure-js-commons";

import urlСhapter from '../../data/URLs/urlСhapter';
import {checkingImages} from '../../components/checkingImagesIntegrity';

test.describe('Проверка изображений', async() => {

    test('Страница Broken Images@regress', async({page}, testInfo) => {
        await allure.tags("img", "Страница Broken");

        await setTestInformation(allure, Severity, 'CRITICAL', 'Флаг', 
        'Проверка отображения изображений на сайте. При сломанной картинке, будет ошибка'
        );
        await setTaskLinks(allure, "AUTH-223", "TMS-426");
        await setTestSuite(allure, "Проверка изображений", 'Наличие сломанных изображений', 'Страница Broken');

        await page.goto(urlСhapter.brokenImages);
        await setScreenshot(allure, page, 'BrokenImg');

        await checkingImages(page, expect, '.example img');
    });

    test('Страница Hovers', async({page}, testInfo) => {
        await allure.tags("img", "Страница Hovers");

        await setTestInformation(allure, Severity, 'NORMAL', 'Флаг', 
        'Проверка отображения изображений на сайте. При сломанной картинке, будет ошибка'
        );
        await setTaskLinks(allure, "AUTH-233", "TMS-421");
        await setTestSuite(allure, "Проверка изображений", 'Наличие сломанных изображений', 'Страница Hovers');

        await page.goto(urlСhapter.hovers);
        await checkingImages(page, expect, '.example div img');

        await setScreenshot(allure, page, 'HoversImg');
    })
})