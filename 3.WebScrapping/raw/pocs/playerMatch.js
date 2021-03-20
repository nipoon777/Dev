let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/match-results";
let baseName = "https://www.espncricinfo.com";
let request = require("request");
let cheerio = require("cheerio");


request(url , callback);

function callback (err, resp, html){
    if(err){
        console.log(err);
    }else{
        extractPOM(html);
    }
}


function extractPOM(html){
    let selectorTool = cheerio.load(html);
    let scoreCards = selectorTool('a[data-hover="Scorecard"]');
    
    console.log(scoreCards.length);
    let allLinks = [];
    for( let i = 0 ; i < scoreCards.length ; i++){
        let scoreCardLink = selectorTool(scoreCards[i]).attr("href");
        let link = baseName + scoreCardLink;
        allLinks.push(link);
         getPlayerOfMonth(link);
    }
    // getPlayerOfMonthSerial(allLinks, 0);

}
// function getPlayerOfMonthSerial(allLinks, n){
//     if(allLinks.length == n ){
//         return;
//     }else{
//         request(allLinks[n], function(err, resp, html){
//             if(err){
//                 console.log(err);
//             }else{
//                 extractPName(html);
//                 getPlayerOfMonthSerial(allLinks, n + 1);
//             }
//         });

//     }
// }


function getPlayerOfMonth(scoreCardLink){
    request(scoreCardLink, callback2);

    function callback2(err, resp, html){
        if(err){
            console.log(err);
        }else{
            extractPName(html);
        }
    }
}

function extractPName(html){
    let selectorTool = cheerio.load(html);
    let playerName = selectorTool(".best-player-name");
    let teamName = selectorTool(".best-player-team-name");
    console.log("Team : " + teamName.text() + "| Player : " + playerName.text());
}