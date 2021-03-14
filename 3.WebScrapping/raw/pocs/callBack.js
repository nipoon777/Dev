let fs = require("fs");

fs.readFile("f1.txt", cb);
console.log("Before");

function cb(err, content){
    if(err){
        console.log(err);
    }else{
        console.log(content.toString());
    }
}

console.log("after");