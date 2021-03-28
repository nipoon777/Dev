let puppeteer = require("puppeteer");

let browerInstancePromise = puppeteer.launch({
    headless : false
    }
);
//CallBack Hell
// //Browser is open

// browerInstancePromise.then (
//     function (browerInstance ){
//         //New tab is Opened
//         // each function returns a promise
//         let newPagePromise = browerInstance.newPage();
//         newPagePromise.then ( function (newPage ) {
//             console.log("New Tab is Opened");

//             let pageWillBeOpenedPromise = newPage.goto("https://www.google.com");
//             pageWillBeOpenedPromise.then (function (){
//                 console.log("Page is Opened");
//             });
//         });
//     }
// );


browerInstancePromise.then (
    function (browerInstance ){
        //New tab is Opened
        // each function returns a promise
        let newPagePromise = browerInstance.newPage();
        return newPagePromise;
    }
).then ( function (newPage ) {
    console.log("New Tab is Opened");
    let pageWillBeOpenedPromise = newPage.goto("https://www.google.com");
    return pageWillBeOpenedPromise;
}).then (function (){
    console.log("Page is Opened");
});