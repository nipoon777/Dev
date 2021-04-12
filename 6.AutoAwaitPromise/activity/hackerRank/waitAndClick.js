async function waitAndClick(selector, page){
    await page.waitForSelector(selector);
    let clickPromise = page.click(selector);
    return clickPromise;
}

module.exports = {
    waitAndClick : waitAndClick
};