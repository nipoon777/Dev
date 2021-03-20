let request = require("request");
let cheerio = require("cheerio");

let url = "https://www.google.com";

request(url, callBack);

function callBack(err, resp, html){
    if(err){
        console.log(err);
    }else{
        extractHTML(html);
    }
}

function extractHTML(html){
    let selectorTool = cheerio.load(html);

    let val = selectorTool("#SIvCob");

    console.log(val.text());
}