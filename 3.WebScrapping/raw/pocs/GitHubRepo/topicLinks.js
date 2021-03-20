let request = require("request");
let cheerio = require("cheerio");

let url = "https://github.com/topics";
let baseName = "https://github.com/";


request(url, cb);
function cb ( err, resp, html ){
    if( err ){
        console.log(err);
    }else {
        extractHtml(html);
    }
}


function extractHtml(html){
    let selectorTool = cheerio.load(html);

    let topicNames = selectorTool(".col-12.col-sm-6.col-md-4.mb-4 a");
    for(let i = 0 ; i < topicNames.length ; i++ ){
        let link = selectorTool(topicNames[i]).attr("href");
        let compLink = baseName + link;
        // console.log(compLink);
        getTopicNamesAndRepo(compLink);
    }

}

function getTopicNamesAndRepo(compLink){
    request(compLink, function (err, resp, html ){
        if(err){
            console.log(err);
        }else{
            extractNameURL(html);
        }
    })
}

function extractNameURL(html){
    let selectorTool = cheerio.load(html);

    let topicName = selectorTool(".h1-mktg");
    console.log(topicName.text());

    let reposLink = selectorTool("a.text-bold");

    for( let i = 0 ; i < 8; i++ ){
        let link = selectorTool(reposLink[i]).attr("href");
        let compLink = baseName + link;
        console.log(compLink);

    }
    console.log("```````````````````````````````````````````");

}