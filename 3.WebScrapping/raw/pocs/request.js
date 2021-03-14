let request = require("request");

console.log("Before");

request("https://www.google.com",cb);

function cb(err, response, html ){
    if(err){
        console.log(error);
    }else{
        console.log(html);
    }
}

console.log("After");