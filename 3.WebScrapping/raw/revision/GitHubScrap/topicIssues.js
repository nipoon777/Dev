let request = require("request");
let path = require("path");
let cheerio = require("cheerio");
let fs = require("fs");
let PDFDocument = require('pdfkit');
var json2xls = require('json2xls');

let url = "https://www.github.com/topics";
let baseUrl = "https://www.github.com";

request( url, (err, resp, html ) => {
    if(err){
        console.log(err);
    }else{
        extractHtml(html);
    }
});


function extractHtml(html){
    let selectorTool = cheerio.load(html);
    let topics = selectorTool(".col-12.col-sm-6.col-md-4.mb-4 a");

    let topicArr = [];
    for(let i = 0 ; i < topics.length ; i++ ){
        let topicUrl = selectorTool(topics[i]).attr("href");
        topicUrl = baseUrl + topicUrl;
        topicArr.push(topicUrl);
    }

    getTopicLinksSerial(topicArr, 0);
}

function getTopicLinksSerial(topicArr, n){
    if( n == topicArr.length ){
        return;
    }else{
        request(topicArr[n], (err, resp, html)=> {
            if(err){
                console.log(err);
            }else{
                extractRepoLinks(html);
                getTopicLinksSerial(topicArr, n + 1);
            }
        });        
    }
}


function extractRepoLinks(html){
    let selectorTool = cheerio.load(html);

    let topicName = selectorTool(".h1-mktg").text();
    topicName = topicName.trim();
    console.log(topicName);
    makeDirectory(topicName);
    let repoUrls = selectorTool("a.text-bold");

    for(let i = 0 ; i < 8 ; i++){
        let repoUrl = selectorTool(repoUrls[i]).attr("href");
        repoUrl = baseUrl + repoUrl;
        console.log(repoUrl);
        let fileName = repoUrl.substring(repoUrl.lastIndexOf('/') + 1); 
        console.log(fileName);
        repoUrl = repoUrl + "/issues";
        //makeJsonFiles(topicName, fileName);
        extractIssueLinks(repoUrl,topicName, fileName);
    }
    console.log("--------------------------------------------------------------");
}

function makeDirectory(topicName){
    let dirPath = path.join(__dirname,topicName);
    fs.mkdirSync(dirPath);
}

function makeJsonFiles(topicName, fileName){
    
    let filePath = path.join(__dirname, topicName, fileName + ".json" );
    if(fs.existsSync(filePath) == false){
        let createStream = fs.createWriteStream(filePath);
        createStream.end();
    }
    
}
function extractIssueLinks(repoUrl, topicName,fileName){
    request(repoUrl,(err,resp, html) => {
        if(err){
            if(resp.statusCode == 404 ){
                console.log("Issue table not found");
            }else{
                console.log(err);
            }
        }else{
            getRepoData(html,topicName, fileName);
        }
    });
}

function getRepoData(html, topicName, fileName){
    let selectorTool = cheerio.load(html);
    let issues = selectorTool('a[data-hovercard-type="issue"]');
    console.log(issues.length);
    let dataArr = [];
    for(let i = 0 ; i < issues.length ; i++ ){
        let name = selectorTool(issues[i]).text();
        let link = selectorTool(issues[i]).attr("href");

        dataArr.push(
            {
                name : name,
                link : link
            }
        );
    
    }
    console.table(dataArr);
    createPDF(dataArr, topicName, fileName);
}


function createPDF(dataArr, topicName, fileName){
    // let pdfDoc = new PDFDocument;
    // pdfDoc.pipe(fs.createWriteStream(path.join(__dirname,topicName,fileName + ".pdf")));    
    // pdfDoc.text(JSON.stringify(dataArr));
    // pdfDoc.end();
    var xls = json2xls(JSON.parse(JSON.stringify(dataArr)));

    fs.writeFileSync(path.join(__dirname,topicName,fileName + ".xlsx"), xls, 'binary');
}


