let fs = require("fs");

let p1 = fs.promises.readFile("f1.txt");
let p2 = fs.promises.readFile("f2.txt");
let p3 = fs.promises.readFile("f3.txt");

console.log("Before");

let combinedPromise = Promise.all([p1, p2, p3]);

console.log("CombinedPromise ->",combinedPromise);

combinedPromise.then(
    function (combinedFiles){
        for(let i = 0 ; i < combinedFiles.length ; i++ ){
            console.log("Content -> "+ combinedFiles[i]);
        }
    }
);

console.log("After");