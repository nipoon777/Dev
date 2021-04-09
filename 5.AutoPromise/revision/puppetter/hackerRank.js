let puppeteer = require("puppeteer");
// Hume ye page variable hamesha lagega 
let page ;
//Next hume email aur password mangavna padega jo object mai stored hai
let { code } = require("./codes.js"); 
let { email, password } = require("../../secrets.js");
// These are used for initial browser settings
// 1. headless = false -> Isse hum jo operation ho rahe hai vo dekh pate hai
let browerLaunchPromise = puppeteer.launch({
    headless : false,
    defaultViewport : null,
    args : [ "--start-maximized"]
});
//Abhi browser open ho jayega phir 
browerLaunchPromise.then ( function(browerInstance){
    let newTab = browerInstance.newPage();
    return newTab;
}).then (function (newTab){
    let pageOpenPromise = newTab.goto("https://www.hackerrank.com/auth/login?h_l=body_middle_left_button&h_r=login");
    page = newTab;
    return pageOpenPromise;
    // Humne login Page tak ka process complete kar liya hai
}).then ( function(){
    let emailEnteredPromise = page.type("#input-1", email, {delay : 200});
    return emailEnteredPromise;
}).then( function(){
    let passwordEnteredPromise = page.type("#input-2", password, {delay :200});
    return passwordEnteredPromise;
}).then( function (){
    let loginClickPromise = page.click('button[data-analytics="LoginPassword"]');
    return loginClickPromise;
}).then (function (){
    let interviewClickPromise = waitAndClick('#base-card-1')
    return interviewClickPromise;
}).then (function() {
    let warmUpClickPromise = waitAndClick('a[data-attr1="warmup"]');
    return warmUpClickPromise;
}).then (function() {
    let url = page.url();
    // console.log( url );
    let questionObj = code[0];
    // console.log( "-------------------------");
    // console.log(questionObj);
    console.log(questionObj.qname);
    let val = questionSolver(url, questionObj.solution, questionObj.qname);
    return val;

}).then( function (data) {
    console.log(data);
}).catch( function(err) {
    console.log(err);
})


// waitAnd Click ek promise function hai usmai hum ek promise return
// karte jab andhar ke sare promises execute hote hai successfully
// i.e selector ke liye wait kara phir 
// jaise hi selector execute hua phir clickPromise ke liye Wait kara
// uske then mai resolve aur catch mai reject
function waitAndClick( selector ){
    return new Promise( function(resolve, reject){
        let selectorWait = page.waitForSelector(selector);
        selectorWait.then( function(){
            let clickPromise = page.click(selector);
            return clickPromise;
        }).then( function () {
             resolve();
        }).catch( function () {
            reject();
        })

    });
}

//Most important function Jo tumhare questions solve karke de

function questionSolver(modulepageUrl, code, questionName ){
    return new Promise (function (resolve, reject){
        // Humlog Warm up page pe chale gaye abhi
        let pageReachedUrl = page.goto(modulepageUrl);
        pageReachedUrl.then( function (){
            function browerConsoleFn( questionName ){
                // Sare questions ke name nikal rahe hai
                let allH4Elem = document.querySelectorAll("h4");
                let quesArr = [];

                for(let i = 0 ; i < allH4Elem.length ; i++ ){
                    let myQuestion = allH4Elem[i].innerText.split("\n")[0];
                    quesArr.push(myQuestion);
                }

                let idx = quesArr.indexOf(questionName);
                console.log("ISS location mai hame index mila " + idx);
                allH4Elem[idx].click();
            }

            let pageClickPromise = page.evaluate(browerConsoleFn, questionName );
            return pageClickPromise;
        }).then(function(){
            //checkBox CLick
            let inputWillBeClickedPromise = waitAndClick('.custom-checkbox.inline');
            return inputWillBeClickedPromise;

        }).then( function() {
            //Type code
            let codeWillBeTypedPromise = page.type(".custominput", code);
            return codeWillBeTypedPromise;
        }).then( function(){
            let controlIsHoldPromise = page.keyboard.down("Control");
            return controlIsHoldPromise;
        }).then( function(){
            //ctrl a
            let aisPressedpromise = page.keyboard.press("A");
            return aisPressedpromise;
        }).then( function(){
            let cutPromise = page.keyboard.press("x");
            return cutPromise;
        }).then( function(){
            let editorWillBeClickedPromise = page.click(".monaco-editor.no-user-select.vs");
            return editorWillBeClickedPromise;
        }).then( function(){
            let aisPressedpromise = page.keyboard.press("A");
            return aisPressedpromise;
        }).then( function(){
            let pastePromise = page.keyboard.press("v");
            return pastePromise;
        }).then( function(){
            let submitIsClickedPromise = page.click(".pull-right.btn.btn-primary.hr-monaco-submit");
            return submitIsClickedPromise;
        })
        //Sare kaam hone ke baad abhi Submit

        .then(function(){
            resolve("Code Submitted Successfully");
        })
        .catch( function(){
            reject("Some process wrong in submitting");
        });

    });
}