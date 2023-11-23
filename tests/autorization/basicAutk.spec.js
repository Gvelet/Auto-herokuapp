const {test, expect} = require('@playwright/test');

import { titlePage, results } from '../../data/expects/dataWaiting';
import {basiсAuth} from '../../components/setBasicAuthCredentials';
import urlChapter from '../../data/URLs/urlСhapter';

test('Проверка Базовой авторизации@regress', async({page}) => {
    await basiсAuth(page);
    await page.goto(urlChapter.basicAuth);

    await expect(page.locator('.example h3')).toHaveText(titlePage.basicAuth);
    await expect(page.locator('.example p')).toHaveText(results.basicAuthTextSuccess);

    await page.waitForTimeout(4000);
})