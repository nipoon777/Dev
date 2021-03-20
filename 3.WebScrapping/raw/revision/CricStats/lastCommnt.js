let request = require("request");
let cheerio = require("cheerio");

let url = "https://www.espncricinfo.com/series/england-tour-of-india-2020-21-1243364/india-vs-england-4th-t20i-1243391/ball-by-ball-commentary";

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

    let lastCommtArr = selectorTool(".match-comment-wrapper .match-comment-long-text");

    let lastComment = selectorTool(lastCommtArr[0]);

    console.log(lastComment.text());
}