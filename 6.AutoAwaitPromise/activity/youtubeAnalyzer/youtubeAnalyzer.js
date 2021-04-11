let puppeteer = require("puppeteer");

let link = "https://www.youtube.com/playlist?list=PLzkuLC6Yvumv_Rd5apfPRWEcjf9b1JRnq";

(async function () {
    try {
        let browerInstance = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ["--start-maximized"]
        });

        let newPage = await browerInstance.newPage();
        await newPage.goto(link);
        await newPage.waitForSelector("#stats  .style-scope.ytd-playlist-sidebar-primary-info-renderer", { visible: true });


        let newArr = await newPage.evaluate(consoleFn, "#stats  .style-scope.ytd-playlist-sidebar-primary-info-renderer");
        let videoCount = newArr[0].split(" ")[0];
        videoCount = Number(videoCount);

        console.log(newArr[0]);
        console.log(newArr[1]);

        let pCurrentVideoCount = await scrollToBottom(newPage, "#video-title");
        
        while ( videoCount - 50 > pCurrentVideoCount ){
            pCurrentVideoCount = await scrollToBottom(newPage, "#video-title");
        }
        //later

        await newPage.evaluate(getStats, 
            "",
            "")
    
    
    
    } catch (err) {
        console.log(err);
    }
})();

function consoleFn(lengthAndViewsSelector) {
    let arr = document.querySelectorAll(lengthAndViewsSelector)
    let newarr = []
    newarr.push(arr[0].innerText, arr[1].innerText);
    return newarr;

}
//to scroll
async function scrollToBottom(page, title ){
    function getLengthConsoleFn(title){
        window.scrollBy(0, window.innerHeight);
        let titleElemArr = document.querySelectorAll(title);
        return titleElemArr.length;
    }
    return page.evaluate(getLengthConsoleFn, title);
}

// get Stats i.e name and duration of Videos

function getStats( durationSelect, titleSelect){
    let durArr = document.querySelectorAll(durationSelect);
    let titleArr = document.querySelectorAll(titleSelect);
    let newVelem = [];
    
    for( let i = 0 ; i < durArr.length ; i++ ){
        let duration = durArr[i].innerText;
        let title = titleArr[i].innerText;

        newVelem.push({
            duration, title
        });
    }
    return newVelem;
}