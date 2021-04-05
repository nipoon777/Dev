let puppeteer = require("puppeteer");
let {email,password} = require("../secrets.js");
let { code } = require("./codes");

let page;

let browerLaunchPromise = puppeteer.launch({
    headless :false,
    defaultViewport : null,
    args : ["--start-maximized"]
});

browerLaunchPromise.then ( function(browerInstance){
    let newTabPromise = browerInstance.newPage();
    return newTabPromise;
}).then(function (newTab){
    let loginPagePromise = newTab.goto("https://www.hackerrank.com/auth/login?h_l=body_middle_left_button&h_r=login");
    page = newTab;
    return loginPagePromise;
}).then (function (){
    let emailEnteredPromise = page.type("#input-1", email, {delay : 200});
    return emailEnteredPromise;
}).then (function (){
    let passwordEnteredPromise = page.type("#input-2", password, {delay :200});
    return passwordEnteredPromise;
}).then (function (){
    let loginClickedPromise = page.click('button[data-analytics="LoginPassword"]');
    return loginClickedPromise;
}).then ( function (){
    let interviewClickPromise = waitAndClick('.base-card');
    return interviewClickPromise;
}).then ( function(){
    let warmUpPromise = waitAndClick("a[data-attr1='warmup']");
    return warmUpPromise;
}).then ( function(){
    return page.url();
}).then ( function (url){
    console.log(url);
    let questionObj = code[0];

    questionSolver(url, questionObj.qname, questionObj.solution);
    
})
.then(function(){
    console.log("Login Successful Reached till submission");
}).catch(function(err){
    console.log(err);
});

function waitAndClick ( selector ){
    return new Promise ( function (resolve, reject) {
        let selectorWait = page.waitForSelector(selector, { visible : true});
        selectorWait.then(function (){
            let clickPromise = page.click(selector);
            return clickPromise;

        }).then( function (){
            resolve();
        }).catch( function (){
            reject(err);
        })       
    });
}


function questionSolver(moduleUrl, questionName, code){
    return new Promise ( function (resolve, reject ){
        let quesClicked = page.goto(moduleUrl);

        quesClicked.then( function () {
            function browerConsole(questionName){
                let allH4Element = document.querySelector("h4");
                let textArr =[];

                for(let i = 0  ; i < allH4Element.length ; i++ ){
                    let myQuestion = allH4Element[i].innerText.split("\n")[0];
                    textArr.push(myQuestion);
                }
                let idx = textArr.indexOf(questionName);
                allH4Element[idx].click();

            }
            let pageClickPromise = page.evaluate(browerConsole, moduleUrl );
            return pageClickPromise;
        }).then( function(){
            resolve();
        })
    });
}