let request = require("request");
let cheerio = require("cheerio");
let path = require("path");
let fs = require("fs");
let PDFDocument = require("pdfkit");

const { fstat } = require("fs");


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
            if(resp.statusCode == 404 ){
                console.log("Issue Page is not found");
            }else{
                console.log(err);
            }
        }else{
            extractNameURL(html);
        }
    })
}

function extractNameURL(html){
    let selectorTool = cheerio.load(html);
    

    let topicName = selectorTool(".h1-mktg").text();
    topicName = topicName.trim();
    
    createDirectory(topicName);
    // console.log(topicName.text());

    let reposLink = selectorTool("a.text-bold");

    for( let i = 0 ; i < 8; i++ ){
        let link = selectorTool(reposLink[i]).attr("href");
        let compLink = baseName + link;
        let fileName = compLink.substring(compLink.lastIndexOf('/') + 1);
        fileName = fileName.trim();
        let issueLink = compLink +"/issues";
        //console.log(issueLink);
        //console.log(fileName);
        //createFile(fileName,topicName);
        makePDF(issueLink,topicName, fileName);

    }
    // console.log("```````````````````````````````````````````");
}

function createDirectory(topicName){
    let folderPath = path.join(__dirname, topicName);
    
    if (fs.existsSync(folderPath) == false ){
        fs.mkdirSync(folderPath);
    }
}

function createFile(fileName, topicName){
    let filePath = path.join(__dirname,topicName, fileName + ".json");

    if (fs.existsSync(filePath) == false ){
        let createStream = fs.createWriteStream(filePath);
        createStream.end();
    }
}

function makePDF(issueLink, topicName, fileName){
    request(issueLink , (err,resp,html) => {
        if(err){
            if(resp.statusCode == 404 ){
                console.log("Issue Page Not Found");
            }else{
                console.log(err);
            }
        }else{
            extractIssues(html, topicName, fileName);
        }
    })
}

function extractIssues(html, topicName, fileName ){
    let selectorTool = cheerio.load(html);

    let issues = selectorTool('a[data-hovercard-type="issue"]');

    let issueArr = [];
    for(let i = 0 ; i < issues.length ; i++ ){
        let name = selectorTool(issues[i]).text();
        let link = selectorTool(issues[i]).attr("href");
        link = baseName + link;
        issueArr.push({
            name : name,
            link : link
        });
    }
    createPdf(issueArr, topicName, fileName);
}

function createPdf( issueArr, topicName, fileName){

    let filePath = path.join(__dirname, topicName, fileName + ".pdf");

    let pdfDoc = new PDFDocument();
    pdfDoc.pipe(fs.createWriteStream(filePath));
    pdfDoc.text(JSON.stringify(issueArr));
    pdfDoc.end();
}