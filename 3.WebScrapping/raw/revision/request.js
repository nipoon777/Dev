// This function takes url as the input and returns html as output

let url = "https://google.com";

let request = require("request");


request(url, cb);

function cb( err, resp, html){
    if(err){
        console.log(err);
    }else{
        console.log(resp.statusCode);
        //console.log(html);
    }
}