let request = require("request");
let cheerio = require("cheerio");
let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";

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
    let teamNameArr = selectorTool(".Collapsible h5");
    let teamNames = [];

    for(let i = 0 ; i < teamNameArr.length ; i++ ){
        let tempName = selectorTool(teamNameArr[i]).text().split("INNINGS");
        teamNames[i] = tempName[0].trim();
    }

    let batsTable = selectorTool(".table.batsman");

    for(let i = 0 ; i < batsTable.length ; i++){
        let batsmanNameAnchor = selectorTool(batsTable[i]).find("tbody tr .batsman-cell a");
        
        for(let j = 0 ; j < batsmanNameAnchor.length ; j++ ){
            let batsName = selectorTool(batsmanNameAnchor[j]).text();
            let batsLink = selectorTool(batsmanNameAnchor[j]).attr("href");
            console.log(batsName + " " + batsLink);
            getBirthday(batsLink, batsName, teamNames[i]);
        }
    }
}

function getBirthday(batsLink, batsName, team){
    request(batsLink, cb1);
    function cb1(err, resp, html){
        if(err){
            console.log(err);
        }else{
            extractBirthday(html, batsName, team);
        }
    }
}

function extractBirthday(html, batsName, team){
    let selectorTool = cheerio.load(html);
    let playerDetails = selectorTool(".ciPlayerinformationtxt");
    let dob = selectorTool(playerDetails[1]).text();
    console.log("Player Name :" + batsName + "from " + team + "Born on " + dob);
}