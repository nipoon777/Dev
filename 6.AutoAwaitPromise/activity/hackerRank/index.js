let puppeteer = require("puppeteer");

const {email, password} = require("../../secrets");

let { code } = require("./codes");

let { questionSolver } = require("./questionSolver");

let { waitAndClick } = require("./waitAndClick");

const link = "https://www.hackerrank.com/auth/login?h_l=body_middle_left_button&h_r=login";
let page;

try{
    /* 
    This is to initialise the Browser and set to deafault
    conditions
     */
    async function hackerRank(){
        let browserInstance = await puppeteer.launch({
            headless : false,
            defaultViewport : null,
            args :["--start-maximized"]
        });

        // First Step to Login:

        let newPage = await browserInstance.newPage();
        page = newPage;
        await newPage.goto(link);
        await newPage.type("#input-1", email, {delay : 200});
        await newPage.type("#input-2", password, {delay : 200});
        await newPage.click("button[data-analytics='LoginPassword']");
    
        //Reach to warm Up challenges
        await waitAndClick(".card-content h3[title='Interview Preparation Kit']", page);
        await waitAndClick("a[data-attr1='warmup']", page);
        
        //Collect the page Details and Serially solve the questions

        let url = page.url();
        
        code.forEach(element => {
            (async function(){
                await questionSolver(url, element.qName, element.soln, page);
            })();
        });
        
    }

    hackerRank();

}catch(err){
    console.log(err);
}