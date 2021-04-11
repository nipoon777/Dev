// const { argv } = require("node:process");
let puppeteer = require("puppeteer");

let links = ["https://www.amazon.in", "https://www.flipkart.com", "https://paytmmall.com/"];

// let productName = process.argv[2];
let productName = "iphone 11";
(async function(){
    try{
        let browserInstance = await puppeteer.launch({
            headless :false,
            defaultViewport : null,
            args : ["--start-maximized"]
        });
    
        let amznArr = await getListingFromAmazon(links[0], browserInstance, productName);
        console.table(amznArr);
        let flpkrtArr = await getListingFromflipKart(links[1], browserInstance, productName);
        console.table(flpkrtArr);
        let payTmArr = await getListingFromPayTm(links[2], browserInstance, productName);
        console.table(payTmArr);

    } catch (err){
        console.log(err);
    }
})();

async function getListingFromPayTm(link, browserInstance, productName){
    let newPage = await browserInstance.newPage();
    await newPage.goto(link);
    await newPage.waitForSelector("#searchInput", {visible : true});
    await newPage.click("#searchInput");
    await newPage.type("#searchInput",productName);
    await newPage.keyboard.press("Enter", { delay : 200});
    await newPage.keyboard.press("Enter");
    //Price selector ->  div._1kMS
    //Name Selector -> div.UGUy
    await newPage.waitForSelector("div.UGUy",{visible : true});

    function consoleFn(itemName, itemPrice){
        let listOfItems = document.querySelectorAll(itemName);
        let priceList = document.querySelectorAll(itemPrice);
        let details = [];
        for(let i = 0 ; i < 5 ; i++){
            let name = listOfItems[i].innerText;
            let price = priceList[i].innerText;

            details.push({
                name, price
            })
        }
        return details;
    }

    let details = await newPage.evaluate(consoleFn, "div.UGUy", "div._1kMS");

    return details;

}




async function getListingFromflipKart(link, browserInstance, productName){
    let newPage = await browserInstance.newPage();
    await newPage.goto(link);
    await newPage.waitForSelector("._2KpZ6l._2doB4z");
    await newPage.click("._2KpZ6l._2doB4z");
    await newPage.waitForSelector("._3704LK");
    await newPage.type("._3704LK", productName);
    await newPage.waitForSelector(".L0Z3Pu");
    await newPage.click(".L0Z3Pu");

    await newPage.waitForSelector("._1fQZEK ._4rR01T", { visible : true });

    function consoleFn(itemName, itemPrice){
        let listOfItems = document.querySelectorAll(itemName);
        let priceList = document.querySelectorAll(itemPrice);
        let details = [];
        for(let i = 0 ; i < 5 ; i++){
            let name = listOfItems[i].innerText;
            let price = priceList[i].innerText;

            details.push({
                name, price
            })
        }
        return details;
    }

    let details = await newPage.evaluate(consoleFn, "._1fQZEK ._4rR01T", "._30jeq3._1_WHN1");
    return details
}

// product Name, url of Amazon home Page
// output -> top 5 matching product -> Price Name Print

async function getListingFromAmazon(link, browserInstance, productName){
    let newPage = await browserInstance.newPage();
    await newPage.goto(link);
    await newPage.type("#twotabsearchtextbox",productName);
    await newPage.click("#nav-search-submit-button");

    await newPage.waitForSelector(".a-price-whole", { visible : true});

    function consoleFn(itemName, itemPrice){
        let listOfItems = document.querySelectorAll(itemName);
        let priceList = document.querySelectorAll(itemPrice);
        let details = [];
        for(let i = 0 ; i < 5 ; i++){
            let name = listOfItems[i].innerText;
            let price = priceList[i].innerText;

            details.push({
                name, price
            })
        }
        return details;
    }

    let details = await newPage.evaluate(consoleFn,".a-size-medium.a-color-base.a-text-normal", ".a-price-whole");

    return details;


}