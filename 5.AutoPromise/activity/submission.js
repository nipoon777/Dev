let puppeteer = require("puppeteer");
let {email,password} = require("../secrets.js");

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
    let combinedPromise = Promise.all([
        loginClickedPromise,
        page.waitForNavigation({
            waitUntil : 'networkidle0'
        })
    ]);
    return combinedPromise;
}).then ( function (){
    let interviewClickPromise = page.click('.base-card');
    let warmUpElement = page.waitForSelector("a[data-attr1='warmup']", { visible : true});
    let combinedPromise = Promise.all([
        interviewClickPromise,
        page.waitForNavigation({
            waitUntil : 'networkidle0'
        }),
        warmUpElement
    ]);
    return combinedPromise;
}).then ( function(){
    let warmUpPromise = page.click("a[data-attr1='warmup']");
    let stockMarketElement = page.waitForSelector('a[data-attr1="sock-merchant"]', { visible : true});
    let combinedPromise = Promise.all([
        warmUpPromise,
        page.waitForNavigation({
            waitUntil : 'networkidle0'
        }),
        stockMarketElement
    ]);
    return combinedPromise;
}).then ( function(){
    let solveChallengePromise = page.click('a[data-attr1="sock-merchant"]');
    let combinedPromise = Promise.all([
        solveChallengePromise,
        page.waitForNavigation({
            waitUntil : 'networkidle0'
        })
    ]);
    return combinedPromise;
}).then(function(){
    console.log("Login Successful Reached till submission");
}).catch(function(err){
    console.log(err);
});