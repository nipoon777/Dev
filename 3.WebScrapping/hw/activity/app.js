// 1. Dependency Modules
let request = require("request");
let cheerio = require("cheerio");
let fs = require("fs");
let path = require("path");

// 2. Url Path

let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595";
let baseURL = "https://www.espncricinfo.com";

let mainFolder = "IPL2020";

if(fs.existsSync(mainFolder) == false){
    fs.mkdirSync(path.join(__dirname, mainFolder));
}

//3. First Task is to make Team Folders

request(url, function (err, resp, html ) {
    if(err){
        console.log(err);
    }else{
        extractTeamTableHtml(html);
    }
})

function extractTeamTableHtml(html){
    let selectorTool = cheerio.load(html);
    // let tableLink = baseURL + selectorTool('a[data-hover="Table"]').attr("href");
    let fixturesLink = selectorTool('a[data-hover="Fixtures and Results"]').attr("href");
    fixturesLink = baseURL + fixturesLink;

    request(fixturesLink, (err, resp, html) =>{
        if(err){
            console.log(err);
        }else{
            //extarctTeamNamesHtml(html);
            extractMatchDetailsHTML(html);
        }
    });
}

// function extarctTeamNamesHtml(html){
//     let selectorTool = cheerio.load(html);
//     let teamNames = selectorTool("table a .header-title.label");

//     for(let i = 0 ; i < teamNames.length ; i++ ){
//         let teamName = selectorTool(teamNames[i]).text();
//         console.log(teamName);
//         makeTeamFolder(teamName);
//     }
//     let fixturesLink = selectorTool('a[data-hover="Fixtures and Results"]').attr("href");
//     fixturesLink = baseURL + fixturesLink;

//     request(fixturesLink, (err, resp, html) => {
//         if(err){
//             console.log(err);
//         }else{
//             extractMatchDetailsHTML(html);
//         }
//     });
// }

function extractMatchDetailsHTML(html){
    let selectorTool = cheerio.load(html);
    let scoreCards = selectorTool('a[data-hover="Scorecard"]');
    for( let i = 0 ; i < scoreCards.length ; i++ ){
        let scoreCardLink = selectorTool(scoreCards[i]).attr("href");
        scoreCardLink = baseURL + scoreCardLink;
        request(scoreCardLink, (err, resp, html) => {
            if(err){
                console.log(err);
            }else{
                extractStats(html);
            }
        });
    }
}

function extractStats(html){
    let selectorTool = cheerio.load(html);

    let teamNames = selectorTool(".event .name");

    for(let i = 0 ; i < teamNames.length ; i++ ){
        let teamName = selectorTool(teamNames[i]).text();
        makeTeamFolder(teamName);
    }

    let venueDetails = selectorTool(".match-info.match-info-MATCH .description").text();
    let venueName = venueDetails.split(",")[1];
    let date = venueDetails.split(",")[2];
    let result = selectorTool(".match-info.match-info-MATCH .status-text").text();

    // console.log(venueName + " " + date);

    let batsmanTable = selectorTool(".table.batsman");

    for(let i = 0 ; i < batsmanTable.length ; i++ ){
        let batsmanStats = selectorTool(batsmanTable[i]).find("tbody tr");

        // console.table(batsmanStats);

        for(let j = 0 ; j < batsmanStats.length - 1 ; j = j + 2){
            let batsCol = selectorTool(batsmanStats[j]).find("td");

            let name = selectorTool(batsCol[0]).text();
            name = name.trim();
            name = name.split(" ").join("");
            makeJsonFolders(selectorTool(teamNames[i]).text(),name);
            let runs = selectorTool(batsCol[2]).text();
            let balls = selectorTool(batsCol[3]).text();
            let fours = selectorTool(batsCol[5]).text();
            let sixes = selectorTool(batsCol[6]).text();
            let strikeRate = selectorTool(batsCol[7]).text();

            let playerDetails = {
                runs : runs,
                ball : balls,
                fours :fours,
                sixes : sixes,
                sr : strikeRate,
                date : date,
                venue : venueName,
                result : result,
                opponentName : selectorTool(teamNames[(i + 1) % 2]).text()

            };
            console.log(playerDetails);
            addPlayerData(selectorTool(teamNames[i]).text(),name, playerDetails);

        //  console.log(name + " - " + runs + " - " + balls +"-" + fours + "-" + sixes + "-" + strikeRate) ;
        }
        // console.log(`------------------------------------------------------------`);
    }
}

function addPlayerData(teamName, playerName, playerArr){
    let filePath = path.join(__dirname, mainFolder, teamName, playerName + ".json");
    let oldFile = fs.readFileSync(filePath);
    oldFile = JSON.parse(oldFile);
    // console.log(prevArr);
    oldFile.push(playerArr);
    fs.writeFileSync(filePath, JSON.stringify(oldFile));
}

function makeTeamFolder(teamName){
    if(fs.existsSync(path.join(__dirname, mainFolder,teamName)) == false ){   
        fs.mkdirSync(path.join(__dirname, mainFolder,teamName));
    }
}

function makeJsonFolders(teamName, batsmanName){
    let filePath = path.join(__dirname,mainFolder,teamName, batsmanName + ".json");
    if (fs.existsSync(filePath) == false ){
        let createStream = fs.createWriteStream(filePath);
        createStream.end();
        let arr = [];
        fs.writeFileSync(filePath, JSON.stringify(arr));
    }
}