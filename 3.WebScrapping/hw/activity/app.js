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
}

function makeTeamFolder(teamName){
    if(fs.existsSync(path.join(__dirname, mainFolder,teamName)) == false ){
        fs.mkdirSync(path.join(__dirname, mainFolder,teamName));
    }
}
