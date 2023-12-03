const {test, expect} = require('@playwright/test');
import { allure } from "allure-playwright";
import { Severity } from "allure-js-commons";
import {setTestInformation, setTestSuite} from '../../components/allure-report/allureTestInformation';

test.beforeEach('Открытие страницы', async({page}) => {
    await allure.tags("dynamicContent", "positiv");
    await setTestInformation(allure, Severity, undefined, 
        'Михаил Лемешев', 'При клике у нас меняется текст на другой. Так же при клике, есть 50% вероятность что будет изменяться и иконка');
    await setTestSuite(allure, "Страница: Dynamic Content", 'Динамическое изменение элементов', 'Смена иконки и текста при клике');
    await page.goto('https://the-internet.herokuapp.com/dynamic_content?with_content=static');
})

test('Смена текста и аватарки при клике', async({page}) => {
    const initialText = await page.textContent('#content > div:nth-child(7) > .large-10');
    let initialAvatar = await page.getAttribute('#content > div:nth-child(7) > .large-2 img', 'src');

    let avatarChange = 0;
    const maxCount = 10;

    for(let i=1; i <= maxCount; i++){
        await page.getByRole('link', { name: 'click here' }).click();

        const newText = await page.textContent('#content > div:nth-child(7) > .large-10');
        const newAvatar = await page.getAttribute('#content > div:nth-child(7) > .large-2 img', 'src');

        expect(newText).not.toEqual(initialText);

        if (newAvatar !== initialAvatar) {
            avatarChange++;
            initialAvatar = newAvatar;
        }
    }
    
    // toBeGreaterThanOrEqual - больше или равна числу
    expect(avatarChange).toBeGreaterThanOrEqual(maxCount / 2)
    console.log('СЧЕТЧИК:', avatarChange)
})