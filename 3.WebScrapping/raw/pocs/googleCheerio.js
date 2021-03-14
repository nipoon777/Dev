let request = require("request");
let cheerio = require("cheerio");

let url = "https://google.com";

request(url, cb);

function cb(err, resp, html){
    if(err){
        console.log(err);
    }else{
        extractHtml(html);
    }
}

function extractHtml(html){
    let selectorTool = cheerio.load(html);

    let line = selectorTool("#SIvCob");
    console.log(line.text());
}