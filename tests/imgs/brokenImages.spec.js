const {test, expect} = require('@playwright/test');

import urlСhapter from '../../data/URLs/urlСhapter';
import {checkingImages} from '../../components/checkingImagesIntegrity';

test.describe('Проверка изображений', async() => {

    test('Страница Broken Images@regress', async({page}) => {
        await page.goto(urlСhapter.brokenImages);

        await checkingImages(page, expect, '.example img');
    });

    test('Страница Hovers', async({page}) => {
        await page.goto(urlСhapter.hovers);

        await checkingImages(page, expect, '.example div img');
    })
})