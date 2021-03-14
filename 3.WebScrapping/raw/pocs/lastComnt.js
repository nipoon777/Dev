let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/ball-by-ball-commentary";

let request = require("request");
let cheerio = require("cheerio");

console.log("before");

request(url, cb);

function cb (err, resp, html ){
    if(err){
        console.log(err);
    }
    else{
        extractHtml(html);
    }
}

function extractHtml(html){
    let selectorTool = cheerio.load(html);
    let allcommentries = selectorTool(".match-comment-wrapper .match-comment-long-text");
    console.log(allcommentries.length);

    let lastComment = selectorTool(allcommentries[0]).text();
    console.log(lastComment);
}

console.log("after");