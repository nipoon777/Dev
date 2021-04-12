const { Console } = require("console");
let fs = require("fs");

console.log("Before");

function fileread( filepath ){
    return new Promise ( function(resolve, reject) {
        fs.readFile(filepath, cb);
        function cb(err, data){
            if(err){
                reject(err);
            }else{
                resolve(data);
            }
        }

    })
}

let filereadPromise = fileread("f1.txt");
// Before Promise is executed

console.log(filereadPromise);
function scb(data){
    console.log("File has been read successfully");
    console.log("Data -> "+ data);
    console.log(filereadPromise);
}
function fcb(err){
    console.log("File is rejected");
    console.log("Err0r -> "+ err);
    console.log(filereadPromise);
}

filereadPromise.then(scb);
filereadPromise.catch(fcb);

console.log("After");