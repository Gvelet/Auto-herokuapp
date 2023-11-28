const {test, expect} = require('@playwright/test');
import {setTestInformation, setTaskLinks, setTestSuite, setScreenshot, setTestEpic} from '../../components/allure-report/allureTestInformation';
import { allure } from "allure-playwright";
import { Severity } from "allure-js-commons";

import urlСhapter from '../../data/URLs/urlСhapter';
import { results } from '../../data/expects/dataWaiting';

test.beforeEach('Открытие страницы', async ({page}) => {
   const response =  await page.goto(urlСhapter.uploadFile);
   await allure.tags("img", "uploadFiles",);
   await setTestInformation(allure, Severity, 'NORMAL', 'Флаг', 
   'Проверка загрузки изображений по кнопке "Выбрать файл". Принимаются форматы PNG, SVG, WEBP'
   );
})

test.describe('Загрузка валидных файлов по кнопке "Выбрете файл"@positiv', async() => {

    const pathImgPng = 'playwright-bg.png';
    const pathImgSvg = 'playwright-logo.svg';
    const pathVideoWebm = 'playwrightVideo.webm';

    test('Формат PNG@regress', async({page}) => {
        await allure.tags("regress");
        await setTaskLinks(allure, "AUTH-323", "TMS-326");
        await setTestSuite(allure, "Проверка изображений", 'Загрузка картинок по кнопке "Выберите файл"', 'Формат PNG');

        await uploadFiles(page, pathImgPng);
    });

    test('Формат SVG@regress', async({page}) => {
         await setTaskLinks(allure, "AUTH-323", "TMS-326");
         await setTestSuite(allure, "Проверка изображений", 'Загрузка картинок по кнопке "Выберите файл"', 'Формат SVG');

         await uploadFiles(page, pathImgSvg);
    });

    test('Формат webm', async({page}) => {
         await setTaskLinks(allure, "AUTH-323", "TMS-326");
         await setTestSuite(allure, "Проверка изображений", 'Загрузка картинок по кнопке "Выберите файл"', 'Формат webm');

         await uploadFiles(page, pathVideoWebm);
    });

    test.afterEach('Проверка заголовка успешной загрузки', async({page}) => {
         await expect(page.locator('.example h3')).toHaveText(results.fileUploaded);
    })

});

test.describe('Загрузка невалидных файлов по кнопке "Выбрете файл"@negativ', async() => {

    const pathTxt = 'text.txt';

    test('Формат txt@nevalid', async({page}) => {
        await setTestSuite(allure, "Проверка изображений", 'Загрузка картинок по кнопке "Выберите файл"', 'Формат txt');

        await page.locator('#file-upload').setInputFiles(`uploadFiles/${pathTxt}`);
        await page.locator('#file-submit').click();
        //Файл считается валидным. Делал тест для примера
    });

    test('Без загрузки файла@nevalid', async({page}) => {
        const responsePromise = page.waitForResponse(urlСhapter.uploadFile); //начинаем ждать перед нажатием
        await setTestSuite(allure, "Проверка изображений", 'Загрузка картинок по кнопке "Выберите файл"', 'Без загрузки');
        await page.locator('#file-submit').click(); //Вызовет 500
        const response = await responsePromise; // вызываем ожидание
        const statusCode = response.status() // Получаем статус 500
        
        //Тестовый сайт - сделал такой тест для практики и примера, что 500 это ожидаемый результат 
        if(statusCode === 500){
            expect(statusCode).toBe(500)       
        }else{
            expect('Статус код не 500').toBeFalsy(); 
        }
    });

});

async function uploadFiles(page, img){
    await page.locator('#file-upload').setInputFiles(`uploadFiles/${img}`);
    await page.locator('#file-submit').click();
    await expect(page.locator('#uploaded-files')).toHaveText(`${img}`);
};