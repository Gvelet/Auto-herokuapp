async function setTestInformation(allure, Severity, severity='NORMAL', owner='user', description = 'Без описания'){
    await allure.description(description);
    await allure.owner(owner);
    await allure.severity(Severity[severity]);
};

async function setTaskLinks(allure, issue="#", tms='#', link='#'){
    await allure.issue(issue, `https://example.com/issues/${issue}`);
    await allure.link(link, "Дока");
    await allure.tms(tms, `https://example.com/tms/${tms}`);
}

async function setTestSuite(allure, parentSuite, suite, subSuite){
    await allure.parentSuite(parentSuite);
    await allure.suite(suite);
    await allure.subSuite(subSuite);
}

async function setTestEpic(allure, epic, feature, story){
    await allure.epic(epic);
    await allure.feature(feature);
    await allure.story(story);
}

async function setScreenshot(allure, page, nameScreen, formatScreen='png'){
    await allure.attachment(`${nameScreen}.${formatScreen}`, await page.screenshot(), {
        contentType: "image/png",
    });
}

export{setTestInformation, setTaskLinks, setTestSuite, setScreenshot, setTestEpic}