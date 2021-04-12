let { waitAndClick } = require("./waitAndClick");

async function questionSolver(mainPageUrl,questionName, code, page){
    await page.goto(mainPageUrl);
    /* console.log(code);
    console.log(questionName); */
    function browserconsolerunFn(questionName) {
        console.log(questionName);
        let allH4Elem = document.querySelectorAll("h4");
        let textArr = [];
        for (let i = 0; i < allH4Elem.length; i++) {
            let myQuestion = allH4Elem[i]
                .innerText.split("\n")[0];
            textArr.push(myQuestion);
        }
        let idx = textArr.indexOf(questionName);
        allH4Elem[idx].click();
    }
    await page.evaluate(browserconsolerunFn, questionName);
    await waitAndClick(".custom-checkbox.inline", page);
    await page.type(".custominput",code, {delay : 200});
    await page.keyboard.down("Control");
    await page.keyboard.press("a");
    await page.keyboard.press("x");
    await page.keyboard.click(".monaco-editor.no-user-select.vs");
    await page.keyboard.press("a");
    await page.keyboard.press("v");
    await page.click(".pull-right.btn.btn-primary.hr-monaco-submit");
    return page.keyboard.up("Control");
}


module.exports ={
    questionSolver : questionSolver
};