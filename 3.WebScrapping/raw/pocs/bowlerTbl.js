let request = require("request");
let cheerio = require("cheerio");

let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";

request(url, cb);

function cb (err, response, html ){
    if(err){
        console.log(err);
    }else{
        extractHtml(html);
    }
}

function extractHtml(html){
    let selectorTool = cheerio.load(html);

    let bowTbl = selectorTool(".table.bowler");

    console.log(bowTbl.length);
    
    let highWkt = 0;
    let highName = "";
    for( let i = 0 ; i < bowTbl.length; i++ ){
        let bowlerStats = selectorTool(bowTbl[i]).find("tbody tr");

        
        for( let j = 0 ; j < bowlerStats.length ; j++ ){
            let bowlcol = selectorTool(bowlerStats[j]).find("td");

            let name = selectorTool(bowlcol[0]).text();
            let wickets = selectorTool(bowlcol[4]).text();

            console.log("Name -> ", name, "Wickets -> ", wickets);
            if(highWkt < Number.parseInt(wickets)){
                highWkt = wickets;
                highName = name;
            }
        }
        console.log("````````````````````````````````````````````````````````````````");

    }
    console.log("Name : ", highName, " Wickets : ", highWkt);
}