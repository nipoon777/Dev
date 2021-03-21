let request = require("request");
let cheerio = require("cheerio");
let baseLink = "https://www.espncricinfo.com";

let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/match-results";

request( url, function (err, resp, html ){
    if(err){
        console.log(err);
    }else{
        extractScoreCard(html);
    }
});


function extractScoreCard(html){
    let selectorTool = cheerio.load(html);

    let scoreCardLinks = selectorTool("a[data-hover='Scorecard']");

    for(let i = 0 ; i < scoreCardLinks.length; i++ ){
        let scoreCardLink = baseLink + selectorTool(scoreCardLinks[i]).attr("href");
        extractPlayerOfMatch(scoreCardLink);
    }
}

function extractPlayerOfMatch(url){
    request( url, function(err, resp, html){
        if(err){
            console.log(err);
        }else{
            getPlayerOfMatch(html);
        }
    })
}

function getPlayerOfMatch(html){
    let selectorTool = cheerio.load(html);
    let playerName = selectorTool(".best-player-name").text();
    
    let teamName = selectorTool(".best-player-team-name").text();

    console.log("Team : " + teamName + " | Player Name :" + playerName);

}