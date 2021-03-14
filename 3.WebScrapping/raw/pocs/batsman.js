let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";
let request = require("request");
let cheerio = require("cheerio");

request(url, cb);

function cb(err, resp, html){
    if(err){
        console.log(err);
    }
    else{
        extract(html);
    }
}

function extract(html){
    let selectorTool = cheerio.load(html);
    // let batTable = selectorTool(".table.batsman");
    // let teamNames = selectorTool(".header-title.label");

    // let firstTeam = selectorTool(teamNames[0]);
    // let nameTeam = firstTeam.text().split(" ");

    // let tName1 = nameTeam[0] + " " + nameTeam[1];

    // for( let i = 0 ; i < batTable.length; i++ ){
    //     let batStats = selectorTool(batTable[i]).find("tbody tr");

        
    //     for( let j = 0 ; j < batStats.length ; j++ ){
    //         let batCol = selectorTool(batStats[j]).find("td");

    //         let name = selectorTool(batCol[0]).text();
    //         console.log("Name : " + name + "of " + tName1 );
    //     }
    // }


    // Get the team Name
    let teamElemArr = selectorTool(".Collapsible h5");
    let teamNameArr =[];

    for(let i = 0 ; i < teamElemArr.length ; i++ ){
        let tempName = selectorTool(teamElemArr[i]).text().split("INNINGS");
        teamNameArr[i] = tempName[0].trim();
    }

    // console.log(teamNameArr);

    //Print Along the table

    let batTbl = selectorTool(".table.batsman");

    for(let i = 0 ; i < batTbl.length ; i++ ){
        let batsName = selectorTool(batTbl[i]).find("tbody tr .batsman-cell");

        for( let j = 0 ; j < batsName.length ; j++ ){
            console.log("Name : " + selectorTool(batsName[j]).text() + " is from " + teamNameArr[i]);
        }

        console.log("```````````````````````````````````````````````````````````````````");
    }




}